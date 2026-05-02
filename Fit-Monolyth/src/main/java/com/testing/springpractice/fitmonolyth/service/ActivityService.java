package com.testing.springpractice.fitmonolyth.service;

import com.testing.springpractice.fitmonolyth.Model.Activity;
import com.testing.springpractice.fitmonolyth.Model.User;
import com.testing.springpractice.fitmonolyth.dto.AcitivityRequest;
import com.testing.springpractice.fitmonolyth.dto.ActivityResponse;
import com.testing.springpractice.fitmonolyth.repository.ActivityRepo;
import com.testing.springpractice.fitmonolyth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ActivityService {
    @Autowired
    UserRepository userrepo;

    @Autowired
    ActivityRepo actrepo;


    public ActivityResponse save(AcitivityRequest req) {
        Activity act = new Activity();
        User user = userrepo.findById(req.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        act.setAct(req.getAct());
        act.setCalorieBurn(req.getCalorieBurn());
        act.setCreatedat(LocalDateTime.now());
        act.setDuration(req.getDuration());
        act.setStarttime(req.getStarttime());
        act.setUpdatedat(LocalDateTime.now());
        act.setUser(user);
        Activity Saved = actrepo.save(act);
        return maptores(Saved);
    }

    private ActivityResponse maptores(Activity act) {
        ActivityResponse res = new ActivityResponse();
        res.setUserId(act.getUser().getId());
        res.setAct(act.getAct());
        res.setCalorieBurn(act.getCalorieBurn());
        res.setCreatedat(act.getCreatedat());
        res.setDuration(act.getDuration());
        res.setId(act.getId());
        res.setStarttime(act.getStarttime());
        res.setUpdatedat(act.getUpdatedat());
        return res;
    }

    public List<ActivityResponse> get( String userId) {
        List<Activity> res = actrepo.findByUserId(userId);
        return res.stream().map(this::maptores).collect(Collectors.toList());


    }
}
