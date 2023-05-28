package ztpai.gloriakulis.pomidoro.db.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ztpai.gloriakulis.pomidoro.db.repositories.UserRepository;
import ztpai.gloriakulis.pomidoro.db.entity.Session;
import ztpai.gloriakulis.pomidoro.db.entity.User;
import ztpai.gloriakulis.pomidoro.db.repositories.SessionRepository;

import java.util.Optional;
@Tag(name = "Session")
@RequestMapping("/api/sessions")
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class SessionController {
    @Autowired
    SessionRepository sessionRepository;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/add/{userId}")
    public ResponseEntity<String> addSession(@PathVariable(value = "userId") Long userId, @RequestBody int time) {
        Optional<User> userFromDB = userRepository.findById(userId);

        if (userFromDB.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Session session = new Session();
        session.setTime(time);
        session.setUser(userFromDB.get());
        sessionRepository.save(session);
        return ResponseEntity.ok("Zadanie zostało dodane");
    }
}
