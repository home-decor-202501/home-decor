package com.decormasters.homedecor.controller.rest;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// rest
@Controller
@Slf4j
public class AuthController {

    // 로그인 페이지 jsp 테스트용
    @GetMapping("/login")
    public String index() {
        return "auth/login";
    }

}
