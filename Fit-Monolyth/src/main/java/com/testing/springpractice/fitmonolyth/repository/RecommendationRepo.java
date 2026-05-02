package com.testing.springpractice.fitmonolyth.repository;

import com.testing.springpractice.fitmonolyth.Model.Recommendation;
import com.testing.springpractice.fitmonolyth.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecommendationRepo extends JpaRepository<Recommendation, String> {
    List<Recommendation> findByUserId(String userId);

    List<Recommendation> findByActivityId(String activityId);
}
