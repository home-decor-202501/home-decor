package com.decormasters.homedecor.exception.authorization;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum SignUpErrorCode {

    USER_DATA_EXISTS(HttpStatus.BAD_REQUEST, "이미 존재하는 회원 정보입니다");

    private final HttpStatus status;
    private final String message;


}
