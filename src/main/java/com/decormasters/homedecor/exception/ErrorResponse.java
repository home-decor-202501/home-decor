package com.decormasters.homedecor.exception;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter @Builder
public class ErrorResponse  {

    private final LocalDateTime timestamp; // 에러가 발생한 시간
    private final int status;  // 에러 상태코드
    private final String error; // 에러 이름
    private final List<String> errorField; // 회원 가입 누를 시 에러 뜨는 input 태그 찾는 용으로, errorField 받아옴(원래는 일반적으로 errorResponse 만들 때 따로 필드로 만들지 않음)
    private final String message; // 에러 원인 메시지
    private final String path;   // 에러가 발생한 경로

}


