package ztpai.gloriakulis.pomidoro.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;

import java.util.List;

@Data
@Getter
@Entity
@Table(name = "achievement")
public class Achievement {
    @GeneratedValue
    @Id
    @JsonIgnore
    private int id_achievement;
    private String description;

//    @ManyToMany
    @JsonIgnore
    @ManyToMany(mappedBy = "achievements")
    private List<User> user;
}
