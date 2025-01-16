package com.decormasters.homedecor.exception.authorization;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum AuthErrorCode {

    USER_DATA_EXISTS(HttpStatus.BAD_REQUEST, "이미 존재하는 회원 정보입니다"),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "알 수 없는 서버 오류입니다. 점검 후 조치하겠습니다.")
    ;

    private final HttpStatus status;
    private final String message;


}
