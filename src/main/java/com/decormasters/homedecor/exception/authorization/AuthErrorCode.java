package com.decormasters.homedecor.exception.authorization;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum AuthErrorCode {

    // 회원가입
    USER_DATA_EXISTS(HttpStatus.BAD_REQUEST, "이미 존재하는 회원 정보입니다"),

    // 로그인
    USER_DOES_NOT_EXIST(HttpStatus.BAD_REQUEST, "존재하지 않는 회원입니다"),
    INCORRECT_PASSWORD(HttpStatus.BAD_REQUEST, "비밀번호가 일치하지 않습니다. (비밀번호 : 영문, 숫자 포함 8자리)"),

    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "알 수 없는 서버 오류입니다. 점검 후 조치하겠습니다.")
    ;

    private final HttpStatus status;
    private final String message;


}
