package com.decormasters.homedecor.controller.routes;

import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
@Slf4j
public class RouteController {

    @GetMapping("/sign-up")
    public String signUp() {
        return "auth/signUp";
    }

    @GetMapping("/login")
    public String login() {
        return "auth/login";
    }

    @GetMapping("/{id}")
    public String postDetailPage() {
        return "components/detail-page";
    }
}
