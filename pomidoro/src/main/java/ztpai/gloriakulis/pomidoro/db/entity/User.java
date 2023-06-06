package ztpai.gloriakulis.pomidoro.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Integer id_user;

    private String email;
    private String password;

    @JsonIgnore
    @OneToOne(mappedBy = "user")
    private UserDetails user_details;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Task> tasks;


    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<TimerSettings> timerSettings;

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "user_achievements",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "achievement_id")
    )
    private List<Achievement> achievements;


}
