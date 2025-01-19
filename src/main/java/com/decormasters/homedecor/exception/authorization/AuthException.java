package com.decormasters.homedecor.exception.authorization;

import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.util.ArrayList;
import java.util.List;

@Getter
public class AuthException extends RuntimeException {

    private final AuthErrorCode errorCode;
    private final HttpStatus httpStatus;
    private final List<String> errorField;

    public AuthException(AuthErrorCode errorCode, List<String> errorField) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
        this.httpStatus = HttpStatus.BAD_REQUEST;
        this.errorField = new ArrayList<>(errorField);
    }

    public AuthException(AuthErrorCode errorCode, String message, List<String> errorField) {
        super(message);
        this.errorCode = errorCode;
        this.httpStatus = HttpStatus.BAD_REQUEST;
        this.errorField = new ArrayList<>(errorField);
    }
}
