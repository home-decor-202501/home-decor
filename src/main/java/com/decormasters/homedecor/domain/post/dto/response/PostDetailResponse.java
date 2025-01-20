package com.decormasters.homedecor.domain.post.dto.response;

import com.decormasters.homedecor.domain.like.dto.LikeStatusResponse;
import com.decormasters.homedecor.domain.member.dto.response.MeResponse;
import com.decormasters.homedecor.domain.post.entity.Post;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter @Setter @ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostDetailResponse {

    private Long postId;
    private String content;
    private LocalDateTime createdAt;

    // 회원 사용자이름, 프사
    private MeResponse user;

    // 게시물 이미지 목록
    private List<PostImageResponse> images;

    // 좋아요 상태
    private LikeStatusResponse likeStatus;

    public static PostDetailResponse of(Post post, LikeStatusResponse likeStatus) {

        return PostDetailResponse.builder()
                .postId(post.getId())
                .content(post.getContent())
                .createdAt(post.getCreatedAt())
                .user(MeResponse.from(post.getMember()))
                .images(post.getImages().stream()
                        .map(PostImageResponse::from)
                        .collect(Collectors.toList()))
                .likeStatus(likeStatus)
                .build();
    }
}
