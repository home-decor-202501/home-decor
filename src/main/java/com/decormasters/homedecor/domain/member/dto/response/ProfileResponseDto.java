package com.decormasters.homedecor.domain.member.dto.response;

import com.decormasters.homedecor.domain.member.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

// 우측상단 사용자 정보 렌더링 JSON
@Getter
@Builder
@Slf4j
public class ProfileResponseDto {

    private String nickname;
    private String profileImageUrl;

    public static ProfileResponseDto from(Member member) {
        if (member == null) {
            return null;  // member가 null이면 ProfileResponseDto도 null 반환
        }

        return ProfileResponseDto.builder()
                .nickname(member.getNickname())
                .profileImageUrl(member.getImgUrl())
                .build();
    }
}