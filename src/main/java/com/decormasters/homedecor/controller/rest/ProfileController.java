package com.decormasters.homedecor.controller.rest;

import com.decormasters.homedecor.domain.member.dto.response.ProfileResponseDto;
import com.decormasters.homedecor.service.ProfileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/profiles")
@Slf4j
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    // 로그인한 유저의 프로필 정보를 갖다주는 API
    @GetMapping("/me")
    public ResponseEntity<ProfileResponseDto> getCurrentUser(
            @AuthenticationPrincipal String email
    ) {

        ProfileResponseDto responseDto = profileService.getLoggedInUser(email);

        return ResponseEntity.ok().body(responseDto);
    }
}
