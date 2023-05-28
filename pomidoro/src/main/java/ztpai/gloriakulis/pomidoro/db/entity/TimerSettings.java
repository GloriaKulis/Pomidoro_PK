package ztpai.gloriakulis.pomidoro.db.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "timer_settings")

public class TimerSettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private int id_timer_settings;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id_user")
    private User user;

    private int session_length;

    private int break_length;

    private int number_of_sessions;

    public TimerSettings(int session_length, int break_length, int number_of_sessions) {
        this.session_length = session_length;
        this.break_length = break_length;
        this.number_of_sessions = number_of_sessions;
    }

}
