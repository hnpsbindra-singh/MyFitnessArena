package com.testing.springpractice.fitmonolyth.service;

import com.testing.springpractice.fitmonolyth.Model.User;
import com.testing.springpractice.fitmonolyth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailService implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String Email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(Email);
        return org.springframework.security.core.userdetails.User.builder().username(user.getEmail()).password(user.getPassword()).build();
    }
}
