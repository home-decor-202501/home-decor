package com.decormasters.homedecor.domain.post.entity;

import com.decormasters.homedecor.domain.member.entity.Member;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter @Setter @ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Post {
    private Long postId;
    private String content;
    private Long userId;
    private int viewCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private List<PostImage> images;

    private Member member;
}
