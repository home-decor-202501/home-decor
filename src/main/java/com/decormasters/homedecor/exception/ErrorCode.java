package com.decormasters.homedecor.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor @Getter

public enum ErrorCode {

    //  File 관련 오류
    FILE_UPLOAD_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다."),

    // 게시물 관련 오류
    POST_NOT_FOUND(HttpStatus.NOT_FOUND, "피드를 찾을 수 없습니다."),
    INVALID_FILE_TYPE(HttpStatus.BAD_REQUEST, "지원하지 않는 파일 형식입니다."),
    FILE_SIZE_EXCEEDED(HttpStatus.BAD_REQUEST, "파일 크기가 제한을 초과했습니다."),
    TOO_MANY_FILES(HttpStatus.BAD_REQUEST, "파일 개수가 제한을 초과했습니다.");

    private final HttpStatus status;
    private final String message;
}
