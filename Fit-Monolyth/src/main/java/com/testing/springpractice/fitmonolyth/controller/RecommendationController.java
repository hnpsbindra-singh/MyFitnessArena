package com.testing.springpractice.fitmonolyth.controller;

import com.testing.springpractice.fitmonolyth.Model.Recommendation;
import com.testing.springpractice.fitmonolyth.dto.recommendationRequest;
import com.testing.springpractice.fitmonolyth.service.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommendation")
public class RecommendationController {

    @Autowired
    RecommendationService recommendationService;



    @PostMapping("/generate")
    public Recommendation send(@RequestBody recommendationRequest request){
        Recommendation recommendation = recommendationService.generate(request);
        return recommendation;
    }

    @GetMapping("/user/{userId}")
    public List<Recommendation> getusers(@PathVariable String userId){
        return recommendationService.get(userId);
    }

    @GetMapping("/activity/{activityId}")
    public List<Recommendation> getactivity(@PathVariable String activityId){
        return recommendationService.getact(activityId);
    }
}
