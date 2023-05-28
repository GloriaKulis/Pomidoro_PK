package ztpai.gloriakulis.pomidoro.db.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ztpai.gloriakulis.pomidoro.db.entity.TimerSettings;

import java.util.Optional;

public interface TimerSettingsRepository extends JpaRepository<TimerSettings, Integer> {

    @Query("SELECT  t FROM TimerSettings t WHERE t.user.id_user = :userId")
    Optional<TimerSettings> findTimerSettingsByUserId(@Param("userId") Integer userId);

}