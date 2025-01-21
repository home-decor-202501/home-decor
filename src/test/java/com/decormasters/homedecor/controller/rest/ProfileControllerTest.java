package com.decormasters.homedecor.controller.rest;

import com.decormasters.homedecor.domain.member.dto.response.MeResponse;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ProfileControllerTest {

    @Autowired
    ProfileController profileController;

    @Test
    @DisplayName("userId로 게시물 렌더링을 위한 회원 정보를 불러올 수 있다.")
    void getSelectedUser() {
        String userId = "3";
        ResponseEntity<MeResponse> selectedUser = profileController.getSelectedUser(userId);
        Assertions.assertNotNull(selectedUser);
        System.out.println(selectedUser);
    }
}