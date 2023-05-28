package ztpai.gloriakulis.pomidoro.db.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import ztpai.gloriakulis.pomidoro.db.entity.User;

import java.util.Optional;

@RepositoryRestResource
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findUserByEmail(String email);

    @Query("select id_user FROM User WHERE email =:email")
    int findUserIdByEmail(@Param("email") String email);



}