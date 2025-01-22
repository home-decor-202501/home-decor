package com.decormasters.homedecor.service;


import com.decormasters.homedecor.Util.FileUploadUtil;
import com.decormasters.homedecor.domain.like.dto.LikeStatusResponse;
import com.decormasters.homedecor.domain.member.entitiy.Member;
import com.decormasters.homedecor.domain.post.dto.request.PostCreate;
import com.decormasters.homedecor.domain.post.dto.response.PostDetailResponse;
import com.decormasters.homedecor.domain.post.dto.response.PostResponse;
import com.decormasters.homedecor.domain.post.entity.Post;
import com.decormasters.homedecor.domain.post.entity.PostImage;
import com.decormasters.homedecor.exception.ErrorCode;
import com.decormasters.homedecor.exception.PostException;
import com.decormasters.homedecor.repository.MemberRepository;
import com.decormasters.homedecor.repository.PostLikeRepository;
import com.decormasters.homedecor.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository; // db에 피드내용 저장, 이미지저장
    private final MemberRepository memberRepository; // 사용자 정보 가져오기
    private final PostLikeRepository postLikeRepository; // 좋아요 정보 가져오기

    private final FileUploadUtil fileUploadUtil; // 로컬서버에 이미지 저장

    // 전체 유저의 게시물 조회
    public List<PostResponse> getAllPosts(String email) {
        // 로그인된 사용자 찾기
        Optional<Member> foundMemberOptional = memberRepository.findUserByEmail(email);

        // 로그인한 사용자가 있을 경우
        if (foundMemberOptional.isPresent()) {
            Member foundMember = foundMemberOptional.get(); // 로그인한 사용자 가져오기

            return postRepository.findAllPosts()
                    .stream()
                    .map(post -> {
                        // 로그인한 사용자에 대한 좋아요 상태 계산
                        LikeStatusResponse likeStatus = LikeStatusResponse.of(
                                postLikeRepository.findByPostIdAndMemberId(post.getId(), foundMember.getId()).isPresent(),
                                postLikeRepository.countByPostId(post.getId())
                        );
                        return PostResponse.of(post, likeStatus);
                    })
                    .collect(Collectors.toList());
        } else {
            // 로그인 안한 경우 likeStatus는 null로 설정
            return postRepository.findAllPosts()
                    .stream()
                    .map(post -> {
                        // 로그인하지 않은 경우, likeStatus를 null로 설정
                        return PostResponse.of(post, null);
                    })
                    .collect(Collectors.toList());
        }
    }

    // 게시물 생성 DB에 가기 전 후 중간처리
    @Transactional
    public Long createPost(PostCreate postCreate, String email) {
        // 유저의 이름을 통해 해당 유저의 ID를 구함
        Member foundMember = memberRepository.findUserByEmail(email)
                .orElseThrow(
                        () -> new RuntimeException("Member not found"));

        // entity 변환
        Post post = postCreate.toEntity();

        post.setMemberId(foundMember.getId());

        // 피드게시물을 posts테이블에 insert
        postRepository.savePost(post);

        // 이미지 관련 처리를 모두 수행
        Long postId = post.getId();
        processImages(postCreate.getImages(), postId);

        // 해시태그 관련 처리를 수행
        // processHashtags(post);

        // 컨트롤러에게 결과 반환
        return postId;
    }

    private void processImages(List<MultipartFile> images, Long postId) {

        log.debug("start process Image!!");
        // 이미지들을 서버(/upload 폴더)에 저장
        if (images != null && !images.isEmpty()) {
            log.debug("save process Image!!");

            int order = 1; // 이미지 순서
            for (MultipartFile image : images) {
                // 파일 서버에 저장
                String uploadedUrl = fileUploadUtil.saveFile(image);

                log.debug("success to save file at: {}", uploadedUrl);
                // 이미지들을 데이터베이스 post_images 테이블에 insert
                PostImage postImage = PostImage.builder()
                        .postId(postId)
                        .imageUrl(uploadedUrl)
                        .imageOrder(order++)
                        .build();

                postRepository.savePostImage(postImage);
            }
        }
    }

    // 게시물 단일 조회 처리
    @Transactional(readOnly = true)
    public PostDetailResponse getPostDetails(Long postId, String email) {

        Post post = postRepository.findPostDetailById(postId)
                .orElseThrow(
                        () -> new PostException(ErrorCode.POST_NOT_FOUND)
                );

        // 로그인한 사용자 확인
        Optional<Member> foundMemberOptional = memberRepository.findUserByEmail(email);

        // 로그인한 사용자일 경우
        if (foundMemberOptional.isPresent()) {
            Member loggedInMember = foundMemberOptional.get(); // 로그인한 사용자

            log.info("logged in member: {}", loggedInMember.getId());
            log.info("logged in member: {}", loggedInMember.getNickname());
            log.info("logged in member: {}", loggedInMember.getImageUrl());

            // 좋아요 상태 계산
            LikeStatusResponse likeStatus = LikeStatusResponse.of(
                    postLikeRepository.findByPostIdAndMemberId(postId, loggedInMember.getId()).isPresent(),
                    postLikeRepository.countByPostId(postId)
            );

            return PostDetailResponse.of(post, loggedInMember, likeStatus);
        } else {
            // 비회원일 경우 likeStatus를 null로 설정
            return PostDetailResponse.of(post, null, null);
        }
    }
}