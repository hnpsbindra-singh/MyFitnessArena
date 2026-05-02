package com.testing.springpractice.fitmonolyth.controller;

import com.testing.springpractice.fitmonolyth.dto.AcitivityRequest;
import com.testing.springpractice.fitmonolyth.dto.ActivityResponse;
import com.testing.springpractice.fitmonolyth.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
public class ActivityController {

    @Autowired
    ActivityService srv;
@GetMapping("/test")
String get(){
    return "get";
}

    @PostMapping
    public ActivityResponse post(@RequestBody AcitivityRequest req){

        return srv.save(req);

    }

    @GetMapping
    public List<ActivityResponse> get(@RequestHeader(value = "X-User-ID")String userId){
        return srv.get(userId);

    }
}
