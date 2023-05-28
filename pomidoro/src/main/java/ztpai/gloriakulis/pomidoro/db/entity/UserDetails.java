package ztpai.gloriakulis.pomidoro.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user_details")
public class UserDetails {
    @Id
    @GeneratedValue
    @JsonIgnore
    private Integer id_user_details;
    private String name;
    private String surname;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "user_id_user")
    private User user;

    public UserDetails(String name, String surname) {
        this.name = name;
        this.surname = surname;
    }

    public UserDetails(String name, String surname, User user) {
        this.name = name;
        this.surname = surname;
        this.user = user;
    }
}
