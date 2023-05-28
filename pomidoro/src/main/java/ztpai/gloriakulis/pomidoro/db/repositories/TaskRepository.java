package ztpai.gloriakulis.pomidoro.db.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ztpai.gloriakulis.pomidoro.db.entity.Task;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task,Integer> {

    @Query("SELECT t FROM Task t WHERE t.user.id_user = :userId")
    List<Task> findByUserId(@Param("userId") Integer userId);



    @Query("SELECT date_of_completion, COUNT(id_task) FROM Task WHERE user.id_user = :userId and date_of_completion " +
            "between CURRENT_DATE-6 and CURRENT_DATE GROUP BY date_of_completion ORDER BY date_of_completion")
    List<Object[]> countTaskByWeek(@Param("userId") Integer userId);


    @Query("SELECT COUNT(id_task)FROM Task WHERE user.id_user=:userId and date_of_completion is not null")
    int countIsDone(@Param("userId") Integer userId);


}