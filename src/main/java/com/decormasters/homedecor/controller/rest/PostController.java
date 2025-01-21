package com.decormasters.homedecor.controller.rest;

import com.decormasters.homedecor.domain.post.dto.request.PostCreate;
import com.decormasters.homedecor.domain.post.entity.Post;
import com.decormasters.homedecor.exception.ErrorCode;
import com.decormasters.homedecor.exception.PostException;
import com.decormasters.homedecor.service.PostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/posts")
@Slf4j
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;


    // 피드 생성 요청
    @PostMapping
    public ResponseEntity<?> createFeed(
            @RequestPart("feed") @Valid PostCreate postCreate,
            @RequestPart("images") List<MultipartFile> images

    ){
        // 파일 업로드 개수 검증
        if (images.size() > 7) {
            throw new PostException(ErrorCode.TOO_MANY_FILES, "파일의 개수는 7개를 초과할 수 없습니다.");
        }

        images.forEach(image -> {
            log.info("uploaded image file name - {}", image.getOriginalFilename());

        });
    postCreate.setImages(images);
    log.info("feed create request: POST - {}", postCreate);



    //이미지,JSON을 서비스클래스로 전송
        Long postId = postService.createFeed(postCreate);

        //응답 메세지 JSON 생성
        Map<String, Object> response = Map.of(
                "id", postId
                ,"message", "save success"
        );

        return ResponseEntity
            .ok()
            .body(response);

    }
}