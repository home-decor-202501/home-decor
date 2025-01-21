package com.decormasters.homedecor.domain.member.dto.response;

import com.decormasters.homedecor.domain.member.entitiy.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class MeResponse {

        private String nickname;
        private String profileImageUrl;

        public static MeResponse from(Member member) {
            return MeResponse.builder()
                    .nickname(member.getNickname())
                    .profileImageUrl(member.getImgUrl())
                    .build();
        }
}
