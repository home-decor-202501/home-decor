package com.decormasters.homedecor.domain.post.entity;

import com.decormasters.homedecor.domain.member.entitiy.Member;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter @Setter @ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Post {
    private Long id;
    private String content;
    private Long memberId;
    private int viewCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private List<PostImage> images;
    // 회원 객체 포함
    private Member member;
}
