package com.testing.springpractice.fitmonolyth.service;

import com.testing.springpractice.fitmonolyth.Model.Activity;
import com.testing.springpractice.fitmonolyth.Model.Recommendation;
import com.testing.springpractice.fitmonolyth.Model.User;
import com.testing.springpractice.fitmonolyth.dto.recommendationRequest;
import com.testing.springpractice.fitmonolyth.repository.ActivityRepo;
import com.testing.springpractice.fitmonolyth.repository.RecommendationRepo;
import com.testing.springpractice.fitmonolyth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RecommendationService {

    @Autowired
    UserRepository urep;

    @Autowired
    ActivityRepo arep;

    @Autowired
    RecommendationRepo rrep;

    public Recommendation generate(recommendationRequest request) {

        User user = urep.findById(request.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        Activity activity = arep.findById(request.getActivityId()).orElseThrow(() -> new RuntimeException("Activity Not Found"));

        Recommendation res = new Recommendation();
        res.setActivity(activity);
        res.setUser(user);
        res.setImprovements(request.getImprovements());
        res.setSafety(request.getSafety());
        res.setSuggestions(request.getSuggestions());
        res.setCreatedat(LocalDateTime.now());
        res.setUpdatedat(LocalDateTime.now());

        Recommendation saved = rrep.save(res);
        return saved;


    }


    public List<Recommendation> get(String userId) {
        return rrep.findByUserId(userId);
    }

    public List<Recommendation> getact(String activityId) {
        return rrep.findByActivityId(activityId);
    }
}
