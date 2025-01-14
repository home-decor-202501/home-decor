package com.decormasters.homedecor.exception.authorization;

import com.decormasters.homedecor.exception.ErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
@Slf4j
public class SignUpExceptionHandler extends RuntimeException{

    @ExceptionHandler(MethodArgumentNotValidException.class)
    // HttpServletRequest 인자로 받는 이유 request.getReqeusturl() 사용 목적
    public ResponseEntity<ErrorResponse> notValidDataException(MethodArgumentNotValidException exception, HttpServletRequest request) {

        //  BindingResult에서 맵으로 정리
        Map<String, String> errors = new HashMap<>();
        exception.getBindingResult().getFieldErrors().forEach(error -> {
            String field = error.getField();
            String message = error.getDefaultMessage();
            errors.put(field, message);
        });


        // 구체적인 에러 객체 생성
        ErrorResponse errorResponse = ErrorResponse.builder()
                .path(request.getRequestURI()) // path는 클라이언트가 호출 시 자돵 생성되는 HttlRequestServlet에서 가져옴
                .message(errors.toString())
                .timestamp(LocalDateTime.now())
                .status(HttpStatus.BAD_REQUEST.value())
                .error(HttpStatus.BAD_REQUEST.toString())
                .build();

        // 로그
        log.error("input value exception occurred. caused by: {}", errorResponse.getMessage());

        return ResponseEntity.badRequest().body(errorResponse);
    }

    // 닉네임이나 이메일이 이미 존재할 때
    // HttpServletRequest 인자로 받는 이유 request.getReqeusturl() 사용 목적
    @ExceptionHandler(SignUpException.class)
    public ResponseEntity<ErrorResponse> SignUpExceptionHandler(SignUpException exception, HttpServletRequest request) {

        log.error("Sign up Exception Occurred: {}", exception.getMessage());

        ErrorResponse response = ErrorResponse.builder()
                .timestamp(LocalDateTime.now())
                .status(exception.getErrorCode().getStatus().value())
                .error(exception.getErrorCode().name())
                .message(exception.getMessage())
                .path(request.getRequestURI())
                .build();

        return ResponseEntity
                .status(exception.getErrorCode().getStatus())
                .body(response);

    }

}