package com.testing.springpractice.fitmonolyth.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    public String id;
    private Integer duration;
    @Enumerated(EnumType.STRING)
    private ActiivityType act;

    private Integer CalorieBurn;
    private LocalDateTime starttime;
    private LocalDateTime createdat;
    private LocalDateTime updatedat;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false, foreignKey = @ForeignKey(name = "fk_activity_user"))
    private User user;

    @OneToMany(mappedBy = "activity", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Recommendation> recommendations = new ArrayList<>();




}
