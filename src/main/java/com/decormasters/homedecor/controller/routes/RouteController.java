package com.decormasters.homedecor.controller.routes;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

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
}


