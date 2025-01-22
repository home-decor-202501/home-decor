package com.decormasters.homedecor.service;

import com.decormasters.homedecor.Util.FileUploadUtil;
import com.decormasters.homedecor.domain.member.dto.response.ProfileResponseDto;
import com.decormasters.homedecor.repository.MemberRepository;
import com.decormasters.homedecor.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.decormasters.homedecor.domain.member.entitiy.Member;
import com.decormasters.homedecor.exception.ErrorCode;


// 개인 프로필 처리
@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class ProfileService {

    private final MemberRepository memberRepository;

    /**
     * 로그인한 유저 정보를 반환하는 처리
     * @param email - 인증된 사용자 이메일 (스프링 시큐리티에 의해 컨트롤러에서 받아옴)
     * @return 인증된 사용자의 프로필정보 (이름, 사용자계정, 프로필사진)
     */
    @Transactional(readOnly = true)   // SELECT만 하고 있을 경우
    public ProfileResponseDto getLoggedInUser(String email) {
        Member foundMember = getMember(email);

        return ProfileResponseDto.from(foundMember);
    }

    private Member getMember(String email) {
        return memberRepository.findUserByEmail(email)
                .orElseThrow(
                        () -> new RuntimeException("MEMBER_NOT_FOUND")
                );
    }

}