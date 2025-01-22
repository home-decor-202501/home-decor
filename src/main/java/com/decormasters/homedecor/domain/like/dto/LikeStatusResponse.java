package com.decormasters.homedecor.domain.like.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LikeStatusResponse {

    private boolean liked;
    private long likeCount;

    public static LikeStatusResponse of(boolean liked, long likeCount) {
        return LikeStatusResponse.builder()
                .liked(liked)
                .likeCount(likeCount)
                .build();
    }
}