package com.decormasters.homedecor.service;

import com.decormasters.homedecor.domain.like.dto.LikeStatusResponse;
import com.decormasters.homedecor.domain.like.entity.PostLike;
import com.decormasters.homedecor.repository.MemberRepository;
import com.decormasters.homedecor.domain.member.entitiy.Member;
import com.decormasters.homedecor.repository.PostLikeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class PostLikeService {

    private final PostLikeRepository postLikeRepository;
    private final MemberRepository memberRepository;

    // 좋아요 토글 기능 - 이미 좋아요를 누른 상태면 취소, 아니면 생성
    public LikeStatusResponse toggleLike(Long postId, String email) {

        Member foundMember = memberRepository.findUserByEmail(email)
                .orElseThrow(() -> new RuntimeException("findUserByEmail error"));

        Long memberId = foundMember.getId();

        boolean isLiked;
        if (isLiked(postId, memberId)) {   // 이미 좋아요를 눌렀다면
            // 좋아요를 삭제
            postLikeRepository.delete(postId, memberId);
            isLiked = false;
        } else {
            // 좋아요를 생성
            postLikeRepository.insert(PostLike.of(postId, memberId));
            isLiked = true;
        }

        return LikeStatusResponse.of(
                isLiked
                , postLikeRepository.countByPostId(postId)
        );
    }

    // 좋아요 상태 확인
    @Transactional(readOnly = true)
    public boolean isLiked(Long postId, Long memberId) {
        Optional<PostLike> result
                = postLikeRepository.findByPostIdAndMemberId(postId, memberId);

        return result.isPresent();
    }
}