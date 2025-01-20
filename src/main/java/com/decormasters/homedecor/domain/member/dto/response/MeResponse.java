package com.decormasters.homedecor.domain.member.dto.response;

import com.decormasters.homedecor.domain.member.entitiy.Member;
import lombok.Builder;
import lombok.Getter;

// 우측상단 사용자 정보 렌더링 JSON
@Getter
@Builder
public class MeResponse {

    private String nickName;
    private String profileImageUrl;

    public static MeResponse from(Member member) {
        return MeResponse.builder()
                .nickName(member.getNickname())
                .profileImageUrl(member.getImageUrl())
                .build();
    }
}