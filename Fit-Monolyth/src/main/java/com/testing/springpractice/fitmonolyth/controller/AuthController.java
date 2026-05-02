package com.testing.springpractice.fitmonolyth.controller;

import com.testing.springpractice.fitmonolyth.Model.User;
import com.testing.springpractice.fitmonolyth.Security.Jwtutils;
import com.testing.springpractice.fitmonolyth.dto.LoginRequest;
import com.testing.springpractice.fitmonolyth.dto.LoginResponse;
import com.testing.springpractice.fitmonolyth.dto.registerRequest;
import com.testing.springpractice.fitmonolyth.dto.userResponse;
import com.testing.springpractice.fitmonolyth.repository.UserRepository;
import com.testing.springpractice.fitmonolyth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class AuthController {

    @Autowired
    UserService srv;
    @Autowired
    UserRepository repo;
    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    Jwtutils jwtutils;

    @PostMapping("/register")
    public userResponse user(@RequestBody registerRequest user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userResponse usr = new userResponse();

        return srv.register(user);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest loginRequest) {

        User user = repo.findByEmail(loginRequest.getEmail());

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtutils.generateToken(user.getEmail());

        return new LoginResponse(token, srv.maptores(user));
    }
}
