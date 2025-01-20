package com.decormasters.homedecor.controller.rest;

import com.decormasters.homedecor.domain.post.dto.request.PostCreate;
import com.decormasters.homedecor.domain.post.dto.response.PostDetailResponse;
import com.decormasters.homedecor.domain.post.dto.response.PostResponse;
import com.decormasters.homedecor.domain.post.entity.Post;
import com.decormasters.homedecor.service.PostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/posts")
@Slf4j
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    // 모든 게시물 조회 API
    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        List<Post> posts = postService.getAllPosts();
        return ResponseEntity.ok(posts);
    }

    // 게시물 생성 요청
    @PostMapping
    public ResponseEntity<?> createPost(
            // 피드 내용, 작성자 이름 JSON { "writer": "", "content": "" } -> 검증
            @RequestPart("post") @Valid PostCreate postCreate
            // 이미지 파일 목록 multipart-file
            , @RequestPart("images") List<MultipartFile> images
            , @AuthenticationPrincipal String email // 인증된 사용자 이름
    ) {
        images.forEach(image -> {
            log.info("uploaded image file name - {}", image.getOriginalFilename());
        });

        postCreate.setImages(images);
        log.info("feed create request: POST - {}", postCreate);

        // 이미지와 JSON을 서비스클래스로 전송
        Long postId = postService.createPost(postCreate, email);

        // 응답 메시지 JSON 생성 { "id": 23, "message": "save success" }
        Map<String, Object> response = Map.of(
                "id", postId
                , "message", "save success"
        );

        return ResponseEntity
                .ok()
                .body(response);
    }

    // 게시물 상세보기 단일 조회 API -> 좋아요 상태 등 확인 필요하므로 @AuthenticationPrincipal 넣음
    @GetMapping("/{postId}")
    public ResponseEntity<?> getDetail(
            @PathVariable Long postId
            , @AuthenticationPrincipal String nickname
    ) {

        PostDetailResponse postDetails = postService.getPostDetails(postId, nickname);

        return ResponseEntity.ok().body(postDetails);
    }

    // 특정 유저 게시물 목록 조회 요청
//    @GetMapping
//    public ResponseEntity<?> getPostsByMember(
//            @AuthenticationPrincipal String email
//    ) {
//        log.info("게시물에서 인증된 이메일: {}", email);
//
//        List<PostResponse> allFeeds = postService.findPostsByMember(email);
//
//        return ResponseEntity
//                .ok()
//                .body(allFeeds);
//    }
}
