package com.decormasters.homedecor.domain.post.dto.response;

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
public class PostDetailResponse {

    @JsonProperty("post_id")
    private Long id;
    private String content;
    private String writer;
    // private List<PostImageResponse> images;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private int likes;
    // private List<Comment> comments;


//    public static PostResponse from(Post feed) {
//        return PostResponse.builder()
//                .id(feed.getId())
//                .content(feed.getContent())
//                .images(
//                        feed.getImages()
//                                .stream()
//                                .map(PostImageResponse::from)
//                                .collect(Collectors.toList())
//                )
//                .createdAt(feed.getCreatedAt())
//                .updatedAt(feed.getUpdatedAt())
//                .build();
//    }
}
