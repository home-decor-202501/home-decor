package com.decormasters.homedecor.controller.rest;

import com.decormasters.homedecor.domain.member.dto.request.SignUpRequest;
import com.decormasters.homedecor.domain.member.entitiy.Member;
import com.decormasters.homedecor.repository.MemberRepository;
import com.decormasters.homedecor.service.MemberService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
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

    // # 로그인 검증 함수
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody @Valid LoginRequest loginRequest
            , HttpServletResponse httpServletResponse
       ) {

        log.info("request for authentication user : {}", loginRequest.getEmail());

        // 프론트에 token 포함한 결과 전달
        Map<String, String> responseMap = memberService.authenticate(loginRequest);

        // memberService 계층에서 resultMap에 token 정보를 담아서 주긴 했지만,
        // token은 localStorage에 저장하는 방법과 쿠키에 저장하는 두 가지 방법이 있으므로,
        // 이 단계에서 cookie도 구워서 httpResponseServlet에 추가해주기
        Cookie cookie = new Cookie("accessToken", responseMap.get("accessToken"));
        cookie.setHttpOnly(true); // javascript를 통한 cookie 탈취 방지
        cookie.setPath("/"); // main 페이지에 cookie로 저장
        cookie.setMaxAge(60 * 60); // 60 * 60초 동안 cookie 저장
        httpServletResponse.addCookie(cookie);

        return ResponseEntity.ok().body(responseMap);
    }


    // # 로그아웃 처리 함수(쿠키 삭제)
    // 로그아웃 처리 API
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {

        // 쿠키 무효화
        Cookie cookie = new Cookie("accessToken", null);
        // 쿠키의 수명, 사용경로, 보안 등을 설정
        cookie.setMaxAge(0); // 단위: 초
        cookie.setPath("/");
        cookie.setHttpOnly(true); // 보안설정 - 자바스크립트로는 쿠키에 접근 불가

        // 쿠키를 클라이언트에 전송
        response.addCookie(cookie);

        return ResponseEntity.ok().body(Map.of(
                "message", "로그아웃이 처리되었습니다."
        ));
    }




}
