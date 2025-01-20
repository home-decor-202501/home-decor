package com.decormasters.homedecor.domain.like.entity;

import lombok.*;

@Getter @Setter @ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Like {

    private Long likeId;
    private Long userId;
    private Long postId;
}
