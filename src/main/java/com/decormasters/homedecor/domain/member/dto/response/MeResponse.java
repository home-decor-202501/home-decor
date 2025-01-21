package com.decormasters.homedecor.domain.member.dto.response;

import com.decormasters.homedecor.domain.member.entitiy.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

// 우측상단 사용자 정보 렌더링 JSON
@Getter
@Builder
@Slf4j
public class MeResponse {

    private String nickname;
    private String profileImageUrl;

    public static MeResponse from(Member member) {
        if (member == null) {
            log.error("Member is null in MeResponse.from() method");
            throw new IllegalArgumentException("Member cannot be null");
        }

        return MeResponse.builder()
                .nickname(member.getNickname())
                .profileImageUrl(member.getImageUrl())
                .build();
    }
}