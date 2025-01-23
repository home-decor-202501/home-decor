package com.decormasters.homedecor.domain.post.dto.response;

import com.decormasters.homedecor.domain.like.dto.LikeStatusResponse;
import com.decormasters.homedecor.domain.post.entity.Post;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostResponse {

    private Long postId;
    private String content;
    private String nickname;
    private String profileImageUrl;
    private PostImageResponse image; // 단일 이미지 객체
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    // 좋아요 상태데이터
    private LikeStatusResponse likeStatus;

    public static PostResponse of(Post post, LikeStatusResponse likeStatus) {
        return PostResponse.builder()
                .postId(post.getPostId())
                .content(post.getContent())

                .nickname(post.getMember().getNickname())
                .profileImageUrl(post.getMember().getImgUrl())
                .likeStatus(likeStatus)
                .image(PostImageResponse.from(post.getImages().get(0)))
                .createdAt(post.getCreatedAt())
                .updatedAt(post.getUpdatedAt())
                .build();
    }
}
