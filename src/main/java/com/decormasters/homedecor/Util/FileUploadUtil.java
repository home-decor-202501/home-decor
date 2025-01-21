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

//    private final FileUploadConfig fileUploadConfig;
//
//    public String saveFile(MultipartFile file) {
//        if (file.isEmpty()) {
//
//            //에외처리
//        }
//        //원본 파일명 불러오기
//        String originalFilename = file.getOriginalFilename();
//        //파일명 랜덤으로 바꾸기
//        String newFilename = UUID.randomUUID() + "_" + originalFilename;
//
//        try {
//            //저장할 절대경로
//            String uploadPath = fileUploadConfig.getLocation() + newFilename;
//
//            log.debug("Attenpting to save file to : {}", uploadPath);
//
//            // 실제 파일 전송
//            file.transferTo(new File(uploadPath));
//
//            //uploadPath: 로컬의 저장 경로
//            // server url : WebResourceConfig에서 바꿔놓은 URL
//            return "/upload/" + newFilename;
//
//        } catch (IOException e) {
//           // ... 예외처리
//            log.error("Failed to save file: {}", newFilename, e);
//            return null;
//        }
//    }
//}

    private final FileUploadConfig fileUploadConfig;

    // 파일 하나를 로컬 폴더에 저장하고, DB에 저장하기 위해 그 경로를 리턴
    public String saveFile(MultipartFile file) {

        // 1. 파일 저장
        // - 1) 파일을 저장할 때 보안을 위해 파일 이름을 바꿔서 저장할 것이므로, 랜덤 파일명 생성
        String fileName = file.getOriginalFilename();
        String uploadFileName = UUID.randomUUID() + "_" + fileName;

        try {
             // - 2)파일 경로 생성
            String uploadPath = fileUploadConfig.getLocation() + uploadFileName;

             // - 3) 파일 저장 진행
            log.debug("Attempting to save file to : {}", uploadPath);
            file.transferTo(new File(uploadPath));

            // - 4) 파일 저장 경로 반환(db 저장용)
            return "/uploads/" + uploadFileName;

        } catch (IOException e) {
            log.error("Failed to save file: {}", uploadFileName, e);
            throw new PostException(ErrorCode.FILE_UPLOAD_ERROR);
        }


    }

}
