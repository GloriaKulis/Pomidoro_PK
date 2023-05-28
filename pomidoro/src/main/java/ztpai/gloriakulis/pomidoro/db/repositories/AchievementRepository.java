package ztpai.gloriakulis.pomidoro.db.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ztpai.gloriakulis.pomidoro.db.entity.Achievement;

import java.util.List;

public interface AchievementRepository extends JpaRepository<Achievement,Integer> {

    @Query("SELECT a FROM Achievement a JOIN a.user u WHERE u.id_user = :userId")
    List<Achievement> findAchievementsByUserId(@Param("userId") Integer userId);
}