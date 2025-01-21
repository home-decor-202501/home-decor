package com.decormasters.homedecor.service;

import com.decormasters.homedecor.domain.member.dto.response.MeResponse;
import com.decormasters.homedecor.domain.member.entitiy.Member;
import com.decormasters.homedecor.exception.authorization.AuthErrorCode;
import com.decormasters.homedecor.exception.authorization.AuthException;
import com.decormasters.homedecor.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class ProfileService {

    private final MemberRepository memberRepository;

    private Member getMember(String userEmail) {
        return memberRepository.findUserByEmail(userEmail)
                .orElseThrow(
                        () -> new AuthException(AuthErrorCode.USER_DOES_NOT_EXIST, List.of("userEmail"))
                );
    }

    /**
     * 로그인한 유저 정보를 반환하는 처리
     *
     * @param username - 인증된 사용자 이름 (스프링 시큐리티에 의해 컨트롤러에서 받아옴)
     * @return 인증된 사용자의 프로필정보 (이름, 사용자계정, 프로필사진)
     */
    @Transactional(readOnly = true)   // SELECT만 하고 있을 경우
    public MeResponse getLoggedInUser(String username) {
        Member foundMember = getMember(username);
        return MeResponse.from(foundMember);

    }


}
