package com.decormasters.homedecor.service;

import com.decormasters.homedecor.controller.rest.LoginRequest;
import com.decormasters.homedecor.domain.member.dto.request.SignUpRequest;
import com.decormasters.homedecor.domain.member.entity.Member;
import com.decormasters.homedecor.exception.authorization.AuthErrorCode;
import com.decormasters.homedecor.exception.authorization.AuthException;
import com.decormasters.homedecor.jwt.JwtProvider;
import com.decormasters.homedecor.repository.MemberRepository;
import com.decormasters.homedecor.utils.FileUploadUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;


@Slf4j
@Transactional
@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final FileUploadUtil fileUploadUtil;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    // 회원 정보 생성
    public void saveUser(SignUpRequest signUpRequest) throws Exception {

        // 일단 있는 회원정보인지 먼저 검증
        boolean nicknameFlag = checkNicknameExists(signUpRequest.getNickname());
        if (nicknameFlag) {
            throw new AuthException(AuthErrorCode.USER_DATA_EXISTS, "존재하는 닉네임입니다.", Arrays.asList("nickname"));
        }
        boolean emailFlag = checkEmailExists(signUpRequest.getEmail());
        if (emailFlag) {
            throw new AuthException(AuthErrorCode.USER_DATA_EXISTS, "존재하는 이메일입니다.", Arrays.asList("email"));
        }

        // 프로필 이미지 URL 초기화(image 없을 떄도 sql 명령어 만들어야 하므로)
         String uploadedImageUrl = null;

         // 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(signUpRequest.getPassword());

        // entity로 변환 (하면서 비밀번호는 암호화된 코드로 바꿔주기)
        Member newUser = signUpRequest.toEntity();
        newUser.setPassword(encodedPassword);

        // 이미지 관련 : 이미지 저장 + db에 저장할 경로 가져오기
        //  - 이미지 프로필 하나만 쓸꺼지만, 차후를 대비하여 List로 받아옴
        if (signUpRequest.getProfileImage() != null) {
            List<String> uploadedImageUrlList = processProfileImage(signUpRequest.getProfileImage());
            uploadedImageUrl = uploadedImageUrlList.get(0);
        }

        // 아이디 생성 : 실패하면 0, 성공하면 1
        int result = memberRepository.insertUser(newUser, uploadedImageUrl);
        if (result > 0) {
            log.info("Inserted user into database successfully {}", signUpRequest.getEmail());
        } else {
            log.error("Failed to insert user into database {}", signUpRequest.getEmail());
        }
    }

    private List<String> processProfileImage(List<MultipartFile> profileImage) {

        List<String> uploadedUrlList = new ArrayList<>();

        profileImage.forEach(imageFile -> {
            // 파일 저장
            String uploadedUrl = fileUploadUtil.saveFile(imageFile);

            //  이미지 저장 성공적 완료 알림
            log.info("success to save file at: {}", uploadedUrl);

            uploadedUrlList.add(uploadedUrl);
        });

        return uploadedUrlList;


    }


    // 닉네임이 있는지 확인하는 함수
    public boolean checkNicknameExists(String nickname) {
        log.info("check if the nickname exists: {}", memberRepository.checkNicknameExists(nickname));
        return memberRepository.checkNicknameExists(nickname);
    }

    public boolean checkEmailExists(String email) {
        log.info("check if the email exists: {}", memberRepository.checkNicknameExists(email));
        return memberRepository.checkEmailExists(email);
    }

    // # 로그인 요청
    @Transactional(readOnly = true)
    public Map<String, String> authenticate(LoginRequest loginRequest) {


        // 1. 있는 아이디 인지 확인하고, 없으면 오류 반환
        String userEmail = loginRequest.getEmail();
        Member foundMember = memberRepository.findUserByEmail(userEmail)
                .orElseThrow(() -> new AuthException(AuthErrorCode.USER_DOES_NOT_EXIST, Arrays.asList("email")));

        // 2. 아이디가 있으면 비밀번호 검사 후, 있으면 accessToken 포함한 resultMap 반환, 없으면 에러 반환
        String userPassword = foundMember.getPassword();
        String inputPassword = loginRequest.getPassword();
        if (passwordEncoder.matches(inputPassword, userPassword)) {
            Map<String, String> result = new HashMap<>();
            result.put("message", "로그인에 성공하였습니다.");
            result.put("email", foundMember.getEmail());
            // access 토큰 전달!
            result.put("accessToken", jwtProvider.generateAccessToken(foundMember.getEmail()));
            return result;
        } else {
            throw new AuthException(AuthErrorCode.INCORRECT_PASSWORD, List.of("password"));
        }
    }

    public Optional<Member> getMemberByEmail(String email) {
        return memberRepository.findUserByEmail(email);
    }
}







