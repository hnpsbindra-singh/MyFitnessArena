package com.testing.springpractice.fitmonolyth.service;

import com.testing.springpractice.fitmonolyth.Model.User;
import com.testing.springpractice.fitmonolyth.dto.registerRequest;
import com.testing.springpractice.fitmonolyth.dto.userResponse;
import com.testing.springpractice.fitmonolyth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UserService {

    @Autowired
    UserRepository repo;

    public userResponse register(registerRequest userRegister) {

        User user = new User();
        user.setFirstname(userRegister.getFirstname());
        user.setLastname(userRegister.getLastname());
        user.setEmail(userRegister.getEmail());
        user.setPassword(userRegister.getPassword());
        user.setCreatedat(LocalDateTime.now());
        user.setUpdatedat(LocalDateTime.now());
        User Saved = repo.save(user);
        return maptores(Saved);
    }

    public userResponse maptores(User saved) {
        userResponse res = new userResponse();
        res.setCreatedat(saved.getCreatedat());
        res.setUpdatedat(saved.getUpdatedat());
        res.setEmail(saved.getEmail());
        res.setFirstname(saved.getFirstname());
        res.setLastname(saved.getLastname());
        res.setPassword(saved.getPassword());
        res.setId(saved.getId());
        

        return res;
    }
}
