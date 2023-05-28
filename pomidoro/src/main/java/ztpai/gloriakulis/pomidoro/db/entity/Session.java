package ztpai.gloriakulis.pomidoro.db.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Entity
@RequiredArgsConstructor

@AllArgsConstructor
@Table(name = "sessions")
public class Session {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private int id_sessions;
    private int time;

    @ManyToOne
    @JoinColumn(name = "user_id_user")
    private User user;


}
