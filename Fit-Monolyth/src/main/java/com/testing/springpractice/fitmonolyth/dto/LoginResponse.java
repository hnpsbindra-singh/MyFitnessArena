package com.testing.springpractice.fitmonolyth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Component
public class LoginResponse {
    private String token;
    private userResponse Response;
}
