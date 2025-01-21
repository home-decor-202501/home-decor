package com.decormasters.homedecor.Util;

import com.decormasters.homedecor.config.FileUploadConfig;
import com.decormasters.homedecor.exception.ErrorCode;
import com.decormasters.homedecor.exception.PostException;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Getter
@Setter
@Slf4j
@RequiredArgsConstructor
@Component
public class FileUploadUtil {


    // 파일 업로드 서비스 코드
    private final FileUploadConfig fileUploadConfig;

    public String saveFile(MultipartFile file) {
        // 파일이 깡통인 경우
        if (file.isEmpty()) {
            throw new PostException(ErrorCode.INVALID_FILE_TYPE, "빈 파일입니다.");
        }

        // 파일이 이미지가 아닌 경우
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image")) {
            throw new PostException(ErrorCode.INVALID_FILE_TYPE, "이미지만 업로드 가능합니다.");
        }

        // 개별 파일 용량 검증
        if (file.getSize() > 10 * 1024 * 1024) { // 10MB 제한
            throw new PostException(ErrorCode.FILE_SIZE_EXCEEDED, "이미지 크기는 10MB를 초과할 수 없습니다.");
        }

        // 원본 파일명 불러오기
        String originalFilename = file.getOriginalFilename();
        // 파일명 랜덤으로 바꾸기
        String newFilename = UUID.randomUUID() + "_" + originalFilename;

        try {
            // 저장할 절대경로
            String uploadPath = fileUploadConfig.getLocation() + newFilename;

            log.debug("Attempting to save file to : {}", uploadPath);

            // 실제 파일 전송
            file.transferTo(new File(uploadPath));

            // 반환값: "/upload/파일명"
            return "/upload/" + newFilename;

        } catch (IOException e) {
            // 파일 저장 중 예외 처리
            log.error("Failed to save file: {}", newFilename, e);
            throw new PostException(ErrorCode.FILE_UPLOAD_ERROR, "파일 저장에 실패했습니다.");
        }
    }
}


