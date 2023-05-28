package ztpai.gloriakulis.pomidoro.db.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ztpai.gloriakulis.pomidoro.db.entity.User;
import ztpai.gloriakulis.pomidoro.db.entity.UserDetails;
import ztpai.gloriakulis.pomidoro.db.repositories.UserDetailsRepository;
import ztpai.gloriakulis.pomidoro.db.repositories.UserRepository;

import java.util.Optional;

@Tag(name = "User Details")
@RestController
@RequestMapping("api/user_details")
public class UserDetailsController {

    @Autowired
    UserDetailsRepository userDetailsRepository;

    @Autowired
    UserRepository userRepository;

    @Operation(summary = "addUserDetails(UserDetails) - post new value in userDetails Repository")
    @PostMapping("/add_user_details/{userId}")
    public ResponseEntity addUserDetails(@PathVariable(value = "userId") Long userId, @RequestBody UserDetails userDetails){
        Optional<User> userFromDB = userRepository.findById(userId);

        UserDetails savedUserDetails = new UserDetails(userDetails.getName(), userDetails.getName());
        savedUserDetails.setUser(userFromDB.get());
        userDetailsRepository.save(savedUserDetails);
        return ResponseEntity.ok(savedUserDetails);
    }




}
