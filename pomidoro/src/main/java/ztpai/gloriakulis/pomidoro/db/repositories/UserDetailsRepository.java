package ztpai.gloriakulis.pomidoro.db.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ztpai.gloriakulis.pomidoro.db.entity.UserDetails;

public interface UserDetailsRepository extends JpaRepository<UserDetails, Integer> {
    @Query("SELECT  ud FROM UserDetails ud WHERE ud.user.id_user = :userId")
    UserDetails findUserDetailsByUserId(@Param("userId") Integer userId);
}