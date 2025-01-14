package com.decormasters.homedecor.exception.authorization;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class SignUpException extends RuntimeException {

    private final SignUpErrorCode errorCode;
    private final HttpStatus httpStatus;

    public SignUpException(SignUpErrorCode errorCode) {
        this.errorCode = errorCode;
        this.httpStatus = HttpStatus.BAD_REQUEST;
    }

    public SignUpException(SignUpErrorCode errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
        this.httpStatus = HttpStatus.BAD_REQUEST;
    }
}
