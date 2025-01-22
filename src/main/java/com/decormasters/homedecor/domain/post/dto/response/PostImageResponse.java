package com.decormasters.homedecor.domain.post.dto.response;

import com.decormasters.homedecor.domain.post.entity.PostImage;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostImageResponse {

    @JsonProperty("image_id")
    private Long id;
    private String imageUrl;
    private int imageOrder;

    public static PostImageResponse from(PostImage postImage) {
        return PostImageResponse.builder()
                .id(postImage.getId())
                .imageUrl(postImage.getImageUrl())
                .imageOrder(postImage.getImageOrder())
                .build();
    }
}
