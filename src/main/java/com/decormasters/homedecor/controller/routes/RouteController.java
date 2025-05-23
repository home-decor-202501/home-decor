package com.decormasters.homedecor.controller.routes;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class RouteController {

    @GetMapping("/sign-up")
    public String signUp() {
        return "auth/signUp";
    }

    @GetMapping("/login")
    public String login() {
        return "auth/login";
    }

    @GetMapping("/post/{postId}")
    public String postDetailPage(@PathVariable Long postId) {
        return "components/detail-page";
    }
}

