package com.decormasters.homedecor.controller.routes;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// ####   나중에 지울 파일입니다. API 정상 작동 여부 확인용 임시 파일 ##### //
@Controller
public class TestController {

    @GetMapping("/sign-up")
    public String signUp() {
        return "auth/signUp";
    }
}
