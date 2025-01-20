package com.decormasters.homedecor.repository;

import com.decormasters.homedecor.domain.post.entity.Post;
import com.decormasters.homedecor.domain.post.entity.PostImage;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Optional;

@Mapper
public interface PostRepository {

    // 게시물 저장
    void savePost(Post post);

    // 게시물 이미지 저장
    void savePostImage(PostImage postImage);

    // 특정 게시물에 첨부된 이미지 목록 조회
    List<PostImage> findImagesByPostId(Long postId);

    // 전체 피드 게시물 목록 조회
    List<Post> findAll();

    // 특정 사용자의 피드 개수를 조회
    long countByMemberId(Long memberId);

    // 특정 사용자의 프로필 페이지 전용 피드 목록 조회
    // List<ProfilePostResponse> findProfilePosts(Long memberId);

    // 단일 게시물 상세조회
    Optional<Post> findPostDetailById(Long postId);

}