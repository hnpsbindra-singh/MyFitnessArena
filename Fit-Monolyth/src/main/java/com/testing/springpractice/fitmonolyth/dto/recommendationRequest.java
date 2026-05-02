package com.testing.springpractice.fitmonolyth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.stereotype.Component;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Component
public class recommendationRequest {
    private String userId;
    private String activityId;

    private List<String> suggestions;
    private List<String> improvements;
    private List<String> safety;
}
