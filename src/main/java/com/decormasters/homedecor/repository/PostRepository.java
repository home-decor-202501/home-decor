package com.decormasters.homedecor.repository;

import com.decormasters.homedecor.domain.post.entity.Post;
import com.decormasters.homedecor.domain.post.entity.PostImage;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;

@Mapper
public interface PostRepository {

    // 피드 게시물 저장
    void saveFeed(Post post);

    // 피드 이미지 저장
    void saveFeedImage(PostImage postImage);

    // 특정 피드에 첨부된 이미지 목록 조회
    List<PostImage> findImagesByPostId(Long postId);

    // 모든 회원의 게시물 조회
    List<Post> findAllPosts();

    // 단일 게시물 상세조회
    Optional<Post> findPostDetailById(Long postId);

    // 조회수 증가
    void incrementViewCount(Long postId);
}

