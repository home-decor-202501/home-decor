package com.decormasters.homedecor.service;


import com.decormasters.homedecor.domain.like.dto.LikeStatusResponse;
import com.decormasters.homedecor.domain.member.entity.Member;
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
import com.decormasters.homedecor.utils.FileUploadUtil;
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
    private final MemberService memberService; // 사용자 정보 가져오기
    private final PostLikeService postLikeService; // 좋아요 정보 가져오기

    private final FileUploadUtil fileUploadUtil; // 로컬서버에 이미지 저장

    // 전체 유저의 게시물 조회
    @Transactional(readOnly = true)
    public List<PostResponse> getAllPosts(String email) {
        // MyBatis 결과 로그 추가
        List<Post> posts = postRepository.findAllPosts();
        log.info("Fetched all posts from database: {}", posts);

        // 로그인 여부에 따라 좋아요 상태 처리
        return memberService.getMemberByEmail(email)
                .map(member -> posts.stream()
                        .map(post -> {
                            LikeStatusResponse likeStatus = postLikeService.getLikeStatus(post.getPostId(), member.getId());
                            return PostResponse.of(post, likeStatus);
                        })
                        .collect(Collectors.toList()))
                .orElseGet(() -> posts.stream()
                        .map(post -> PostResponse.of(post, null))
                        .collect(Collectors.toList()));
    }

    // 피드 생성 DB에 가기 전 후 중간처리
    @Transactional
    // 피드 생성 DB에 가기 전 후 중간처리
    public Long createFeed(PostCreate postCreate) {

        // entity 변환
        Post post = postCreate.toEntity();

        // 피드 게시물을 post 테이블에 insert
        postRepository.saveFeed(post);

        // 이미지 관련 처리를 모두 수행


        Long postId = post.getPostId();
        processImages(postCreate.getImages(), postId);

        // 컨트롤러에게 결과 반환
        return postId;

    }

    private void processImages(List<MultipartFile> images, Long postId) {

        // 이미지들을 서버(/upload 폴더)에 저장
        if (images != null && !images.isEmpty()) {
            log.debug("saveprocess Image");

            int order = 1;
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

                postRepository.saveFeedImage(postImage);
            }
        }
    }


    // 게시물 단일 조회 처리
    @Transactional(readOnly = true)
    public PostDetailResponse getPostDetails(Long postId, String email) {
        // MyBatis 결과 로그 추가
        Post post = postRepository.findPostDetailById(postId)
                .orElseThrow(() -> new PostException(ErrorCode.POST_NOT_FOUND));
        log.info("Fetched post details: {}", post);

        // 조회수 증가
        incrementViewCount(postId);  // 이 부분에서 조회수 증가 메서드 호출

        // 로그인 여부 확인
        return memberService.getMemberByEmail(email)
                .map(member -> {
                    log.info("Logged in member: {}", member);

                    LikeStatusResponse likeStatus = postLikeService.getLikeStatus(postId, member.getId());
                    return PostDetailResponse.of(post, member, likeStatus);
                })
                .orElseGet(() -> PostDetailResponse.of(post, null, null));
    }

    // 게시물 조회수 처리
    @Transactional
    public void incrementViewCount(Long postId) {
        postRepository.incrementViewCount(postId);
    }
}
