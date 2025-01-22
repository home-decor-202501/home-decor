package com.decormasters.homedecor.domain.post.dto.response;

import com.decormasters.homedecor.domain.like.dto.LikeStatusResponse;
import com.decormasters.homedecor.domain.member.dto.response.ProfileResponseDto;
import com.decormasters.homedecor.domain.member.entity.Member;
import com.decormasters.homedecor.domain.post.entity.Post;


import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

// 게시물 상세
@Slf4j
@Getter @Setter @ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostDetailResponse {

    private Long postId;
    private String content;
    private LocalDateTime createdAt;
    private int viewCount;

    // 게시물 작성자
    private ProfileResponseDto author;
    // 로그인 유저
    private ProfileResponseDto loggedInUser;

    // 게시물 이미지 목록
    private List<PostImageResponse> images;

    // 좋아요 상태
    private LikeStatusResponse likeStatus;

    public static PostDetailResponse of(Post post, Member loggedInUser, LikeStatusResponse likeStatus) {

        return PostDetailResponse.builder()
                .postId(post.getPostId())
                .content(post.getContent())
                .createdAt(post.getCreatedAt())
                .viewCount(post.getViewCount())
                .author(ProfileResponseDto.from(post.getMember()))
                .loggedInUser(ProfileResponseDto.from(loggedInUser))
                .images(post.getImages().stream()
                        .map(PostImageResponse::from)
                        .collect(Collectors.toList()))
                .likeStatus(likeStatus)
                .build();
    }
}
