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
    public List<Post> getAllPosts() {
        return postRepository.findAllPosts();
    }

    // 게시물 생성 DB에 가기 전 후 중간처리
    @Transactional
    public Long createPost(PostCreate postCreate, String email) {
    // public Long createPost(PostCreate postCreate, String username) {
        // 유저의 이름을 통해 해당 유저의 ID를 구함
        Member foundMember = memberRepository.findUserByEmail(email)
                .orElseThrow(
                        () -> new RuntimeException("Member not found"));

        // entity 변환
        Post post = postCreate.toEntity();

        // 사용자의 ID를 세팅해줘야 함 <- 이걸 어케구함?
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

        Member foundMember = memberRepository.findUserByEmail(email).orElseThrow();

        return PostDetailResponse.of(post, LikeStatusResponse.of(
                postLikeRepository.findByPostIdAndMemberId(postId, foundMember.getId()).isPresent()
                , postLikeRepository.countByPostId(postId)
        ));
    }

    // 유저 게시물 목록조회 중간처리
//    @Transactional(readOnly = true)
//    public List<PostResponse> findPostsByMember(String email) {
//
//        // TODO : Runtime에러 -> 예외처리
//        Member foundMember = memberRepository.findUserByEmail(email)
//                .orElseThrow(() -> new RuntimeException("Member not found"));
//
//        // 전체 피드 조회
//        return postRepository.findPostsByMember()
//                .stream()
//                .map(post -> {
//                    LikeStatusResponse likeStatus = LikeStatusResponse.of(
//                            postLikeRepository.findByPostIdAndMemberId(post.getId(), foundMember.getId()).isPresent()
//                            , postLikeRepository.countByPostId(post.getId())
//                    );
//                    return PostResponse.of(post, likeStatus);
//                })
//                .collect(Collectors.toList());
//    }
}