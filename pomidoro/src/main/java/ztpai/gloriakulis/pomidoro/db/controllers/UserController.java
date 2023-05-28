package ztpai.gloriakulis.pomidoro.db.controllers;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ztpai.gloriakulis.pomidoro.db.entity.TimerSettings;
import ztpai.gloriakulis.pomidoro.db.entity.User;
import ztpai.gloriakulis.pomidoro.db.entity.UserDetails;
import ztpai.gloriakulis.pomidoro.db.repositories.TimerSettingsRepository;
import ztpai.gloriakulis.pomidoro.db.repositories.UserDetailsRepository;
import ztpai.gloriakulis.pomidoro.db.repositories.UserRepository;


import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "User")
@RequestMapping("api/users")
@RestController

public class UserController {

    @Autowired
    ObjectMapper objectMapper;
    @Autowired
    UserRepository userRepository;

    @Autowired
    TimerSettingsRepository timerSettingsRepository;

    @Autowired
    UserDetailsRepository userDetailsRepository;



        @Operation(summary = "getUsers() -it responsible for get all users in Data Base")
        @GetMapping("/users")
        public ResponseEntity getUsers() throws JsonProcessingException {
            List<User> users = userRepository.findAll();

            return ResponseEntity.ok(objectMapper.writeValueAsString(users));
        }

        @Operation(summary = "getUser(userId) - it responsible for get certain user")
        @GetMapping("/{userId}")
        public User getUser(@PathVariable Long userId) {
            return userRepository.findById(userId)
                    .orElseThrow(ResourceNotFoundException::new);
        }

        @GetMapping("/id/{userEmail}")
        public int getUserIdByEmail(@PathVariable String userEmail){
            return userRepository.findUserIdByEmail(userEmail);
        }

        @Operation(summary = "addUser() - post new User in DB")
        @PostMapping("/add_user")
        public ResponseEntity addUser(@RequestBody User user){
            Optional<User> userFromDB = userRepository.findUserByEmail(user.getEmail());

            if(!userFromDB.isEmpty()){
                return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).build();
            }

            User savedUser = userRepository.save(user);



            TimerSettings timerSettings = new TimerSettings(25,5,4);
            timerSettings.setUser(savedUser); // Przypisz użytkownika do ustawień timera

            timerSettingsRepository.save(timerSettings);
            return ResponseEntity.ok(savedUser);
        }




        @Operation(summary = "login(User) - check user's email and password")
        @PostMapping("/login")
        public ResponseEntity login(@RequestBody User user){
            Optional<User> userFromDB = userRepository.findUserByEmail(user.getEmail());

            if(userFromDB.isEmpty() || wrongPassword(userFromDB,user)){
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            return ResponseEntity.ok().build();
        }

    private boolean wrongPassword(Optional<User> userFromDB, User user) {
            return !userFromDB.get().getPassword().equals(user.getPassword());
    }


    @DeleteMapping("/deleteUser/{userId}")
    public void deleteUser(@PathVariable int userId){


            TimerSettings timerSettings =timerSettingsRepository.findTimerSettingsByUserId(userId).get();
            timerSettingsRepository.delete(timerSettings);

            UserDetails userDetails = userDetailsRepository.findUserDetailsByUserId(userId);
            userDetailsRepository.delete(userDetails);

            User user = userRepository.findById((long) userId).get();
            userRepository.delete(user);

    }


}

