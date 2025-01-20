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

    // 모든 회원의 게시물 조회
    List<Post> findAllPosts();

    // 단일 게시물 상세조회
    Optional<Post> findPostDetailById(Long postId);

    // 특정 유저 게시물 목록 조회
    // List<Post> findPostsByMember();

    // 특정 사용자의 게시물 개수를 조회
    // long countByMemberId(Long memberId);
}