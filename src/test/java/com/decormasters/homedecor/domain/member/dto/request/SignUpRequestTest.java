package com.decormasters.homedecor.domain.member.dto.request;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class SignUpRequestTest {


    private Validator validator;
    private SignUpRequest signUpRequest;

    // validator setup
    @BeforeEach
    void setUp() {
        validator = Validation.buildDefaultValidatorFactory().getValidator();
        signUpRequest = new SignUpRequest();
    }

    // =============== 이메일 검증 =================== //

    @Test
    @DisplayName("이메일 주소 검증")
    public void testEmailValidation() {
        //given
        String email;

        // # 가능 케이스
//        email = "hello-2020@example.com"; // 앞쪽 부분 하이픈
//        email = "hello.2020@example.com"; // 앞쪽 부분 .
//        email = "h@example.com"; // 앞쪽 부분 한글자

        // # 불가 케이스
//        email = ""; // case 1 : 비었을 떄
        email = ".hello@naver.com"; // case  : 앞부분이 '.'로 시작할 때
//        email = "hello.@naver.com"; // case  : 앞부분이 '.'로 끝날 때
//        email = "hello..123@naver.com"; // case  : 앞부분에 '..' 있을 떄
//        email = "hello!+2020@example.com";          // local-part don't allow special characters like !+
//        email = "hello@example.a";                  // domain tld min 2 chars
//        email = "hello@example..com";               // domain doesn't allow dot . appear consecutively
//        email = "hello@.com";                       // domain doesn't start with a dot .
//        email = "hello@.com.";                      // domain doesn't end with a dot .
//        email = "hello@-example.com";               // domain doesn't allow to start with a hyphen -
//        email = "hello@example.com-";               // domain doesn't allow to end with a hyphen
//        email = "hello@example_example.com";        // domain doesn't allow underscore


        signUpRequest.setEmail(email);
        //when
        Set<ConstraintViolation<SignUpRequest>> validate = validator.validateProperty(signUpRequest, "email");
        //assertion : 이메일 유효성 검증에 실패한다.
        assertFalse(validate.isEmpty());
        // assertion 시 validation message 확인
        for (ConstraintViolation<SignUpRequest> violation : validate) {
            System.out.println(violation.getMessage());
        }
    }


    // ============= 비밀번호 검증 ================//
    @Test
    @DisplayName("비밀번호 검증")
    public void testPasswordValidation() {
        // given
//        String password = "ñññññññññññññññ"; // 아랍어 등 불포함
//        String password = "11111111"; // 한글, 영문 포함해야 함
//        String password = "s1"; // 8자 이상
//        String password = "ㅇㅇㅇㅇㅇㅇㅇㅇㅇ"; // 숫자 포함해야 함, 한글 안 됨
//        String password = "1234skdjfskdf"; // 유효한 값
        String password = "dkfd3433434!@#"; //유효한 값:  특수문자는 !, @, #는 허용

        signUpRequest.setPassword(password);

        // when
        Set<ConstraintViolation<SignUpRequest>> passwordValidation = validator.validateProperty(signUpRequest, "password");

        // assertion : 유효성 검증에 실패한다.
        assertFalse(passwordValidation.isEmpty());
        // assertion 시 validation message 확인
        for (ConstraintViolation<SignUpRequest> violation : passwordValidation) {
            System.out.println(violation.getMessage());
        }
    }


    // ============= 닉네임 검증 ================//
    @Test
    @DisplayName("닉네임 검증")
    public void testNickNameValidation() {
        // given
//        String nickname = "s"; // 2~10자
        String nickname = "((*&(*78989";// 닉네임은 한글, 영문자, 숫자 및 언더스코어와 하이픈만 포함해야 합니다")

        signUpRequest.setNickname(nickname);

        // when
        Set<ConstraintViolation<SignUpRequest>> nicknameValidation = validator.validateProperty(signUpRequest, "nickname");

        // assertion : 유효성 검증에 실패한다.
        assertFalse(nicknameValidation.isEmpty());
        // assertion 시 validation message 확인
        for (ConstraintViolation<SignUpRequest> violation : nicknameValidation) {
            System.out.println(violation.getMessage());
        }
    }

}