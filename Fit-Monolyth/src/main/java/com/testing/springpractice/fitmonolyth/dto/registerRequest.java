package com.testing.springpractice.fitmonolyth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Component
public class registerRequest {
    private String email;
    private String password;
    private String firstname;
    private String lastname;
}
