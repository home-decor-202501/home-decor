package com.decormasters.homedecor.controller.rest;

import com.decormasters.homedecor.domain.member.dto.request.SignUpRequest;
import com.decormasters.homedecor.repository.MemberRepository;
import com.decormasters.homedecor.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@Slf4j
@RequiredArgsConstructor
public class AuthController {

    private final MemberService memberService;

    @PostMapping("/sign-up")
    public ResponseEntity<?> SignUp(
            // front에서 email, nickname, password는 key name을 newUserInfo로, 사진은 profileImage로 보냄
            @RequestPart(value="profileImage", required=false) List<MultipartFile> profileImage,
            @RequestPart("newUserData") @Valid SignUpRequest signUpRequest
    ) throws Exception {
        // 파일. json 제대로 받았는지 log로 확인
        log.info("received new user data: {}", signUpRequest);

        // == 프로필 이미지 받았을 때만 하는 작업들 == //
        if (profileImage != null) {
            profileImage.forEach(image -> log.info("received profile image: {}", image.getOriginalFilename()));
             // 일단 프론트에서 json 과 파일은 다로 보낸 것을, 하나의 파일로 합쳐주기(관리 차원)
             signUpRequest.setProfileImage(profileImage);
        }

        // log
        log.info("new user signup request: {}", signUpRequest);

        // service에 위임
        memberService.saveUser(signUpRequest);

        // 회원가입 여부 확인
        log.info("created new user in db {}", signUpRequest.getEmail());

        // front에 응답
        System.out.println(signUpRequest);
        return ResponseEntity
                .ok()
                .body(Map.of(
                    "message", "Signup Successful",
                    "user-email", signUpRequest.getEmail()
                    )
                );
    }

    // 닉네임이 있는지 확인하는 함수
    @GetMapping("/check-nickname")
    public ResponseEntity<?> checkNicknameExists(@RequestParam("nickname") String nickname) {
        boolean flag = memberService.checkNicknameExists(nickname);
        if (flag) {
            return ResponseEntity.ok().body(Map.of(
                    "user-nickname", nickname,
                    "message", "Nickname already exists",
                    "flag", true
            ));
        } else {
            return ResponseEntity.ok().body(Map.of(
                    "user-nickname", nickname,
                    "message", "Nickname doesn't exist",
                    "flag", false
            ));
        }
    }

    @GetMapping("/check-email")
    public ResponseEntity<?> checkEmailExists(@RequestParam("email") String email) {
        boolean flag = memberService.checkEmailExists(email);
        if (flag) {
            return ResponseEntity.ok().body(Map.of(
                    "user-email", email,
                    "message", "Email already exists",
                    "flag", true
                    ));
        } else {
            return ResponseEntity.ok().body(Map.of(
                    "user-email", email,
                    "message", "Email doesn't exist",
                    "flag", false
            ));
        }
    }
}
