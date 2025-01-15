package com.decormasters.homedecor.exception.authorization;

import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.util.ArrayList;
import java.util.List;

@Getter
public class SignUpException extends RuntimeException {

    private final SignUpErrorCode errorCode;
    private final HttpStatus httpStatus;
    private final List<String> errorField;

    public SignUpException(SignUpErrorCode errorCode, List<String> errorField) {
        this.errorCode = errorCode;
        this.httpStatus = HttpStatus.BAD_REQUEST;
        this.errorField = new ArrayList<>(errorField);
    }

    public SignUpException(SignUpErrorCode errorCode, String message, List<String> errorField) {
        super(message);
        this.errorCode = errorCode;
        this.httpStatus = HttpStatus.BAD_REQUEST;
        this.errorField = new ArrayList<>(errorField);
    }
}
