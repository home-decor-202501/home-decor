package com.decormasters.homedecor.exception;


import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

// API에서 발생한 모든 에러들을 모아서 일괄 처리
@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    // 피드 관련 예외처리
    @ExceptionHandler(PostException.class)
    public ResponseEntity<?> handlePostException(PostException e, HttpServletRequest request) {
        log.error("PostException occurred: {}", e.getMessage(), e);

        ErrorResponse response = ErrorResponse.builder()
                .timestamp(LocalDateTime.now())
                .status(e.getErrorCode().getStatus().value())
                .error(e.getErrorCode().name())
                .message(e.getMessage())
                .path(request.getRequestURI())
                .build();

        return ResponseEntity
                .status(e.getErrorCode().getStatus())
                .body(response);
    }


}