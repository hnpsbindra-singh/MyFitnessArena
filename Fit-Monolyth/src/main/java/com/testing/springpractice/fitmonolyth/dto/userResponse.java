package com.testing.springpractice.fitmonolyth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Component
public class userResponse {
    private String id;
    private String email;
    private String password;
    private String firstname;
    private String lastname;
    private LocalDateTime createdat;
    private LocalDateTime updatedat;
}
