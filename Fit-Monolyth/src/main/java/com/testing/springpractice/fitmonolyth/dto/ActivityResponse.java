package com.testing.springpractice.fitmonolyth.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.testing.springpractice.fitmonolyth.Model.ActiivityType;
import com.testing.springpractice.fitmonolyth.Model.Recommendation;
import com.testing.springpractice.fitmonolyth.Model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
@AllArgsConstructor
@NoArgsConstructor
@Data
@Component
public class ActivityResponse {
    public String id;
    private Integer duration;
    private ActiivityType act;
    private Integer CalorieBurn;
    private LocalDateTime starttime;
    private LocalDateTime createdat;
    private LocalDateTime updatedat;
    private String userId;


}
