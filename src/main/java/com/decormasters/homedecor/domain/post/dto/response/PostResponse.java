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

    @JsonProperty("feed_id")
    private Long id;
    private String content;
    private String username;
    private String profileImageUrl;
    private List<PostImageResponse> images;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    // 좋아요 상태데이터
    private LikeStatusResponse likeStatus;

    public static PostResponse of(Post feed, LikeStatusResponse likeStatus) {
        return PostResponse.builder()
                .id(feed.getId())
                .content(feed.getContent())
                .username(feed.getMember().getNickname())
                .profileImageUrl(feed.getMember().getImageUrl())
                .likeStatus(likeStatus)
                .images(
                        feed.getImages()
                                .stream()
                                .map(PostImageResponse::from)
                                .collect(Collectors.toList())
                )
                .createdAt(feed.getCreatedAt())
                .updatedAt(feed.getUpdatedAt())
                .build();
    }
}
