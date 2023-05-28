package ztpai.gloriakulis.pomidoro.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
@Data
@Entity
@RequiredArgsConstructor
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tasks")

public class Task {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private int id_task;

    private String description;

    @NonNull
    private Date date_of_completion;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id_user")
    private User user;


    public Task(User user, String task) {
        this.user = user;
        this.description = task;
    }
}
