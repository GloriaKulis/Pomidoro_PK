package ztpai.gloriakulis.pomidoro.db.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ztpai.gloriakulis.pomidoro.db.entity.Session;

public interface SessionRepository extends JpaRepository<Session, Integer> {
}