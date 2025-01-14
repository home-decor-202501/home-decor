package com.decormasters.homedecor.controller.routes;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class RouteController {

    @GetMapping("/{id}")
    public String postDetailPage(){
        return "components/detail-page";
    }
}


