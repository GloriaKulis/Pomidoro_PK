package ztpai.gloriakulis.pomidoro.db.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;
import ztpai.gloriakulis.pomidoro.db.entity.Achievement;
import ztpai.gloriakulis.pomidoro.db.repositories.AchievementRepository;
import ztpai.gloriakulis.pomidoro.db.repositories.UserRepository;

import java.util.List;

@Tag(name = "Achievements")
@RequestMapping("/api/achievements")
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AchievementController {
    @Autowired
    AchievementRepository achievementRepository;
    @Autowired
    UserRepository userRepository;

    @Operation(summary = "get all user's achievements",
            description = "public List<Achievement> getAchievementsByUserId(@PathVariable(value = \"userId\")Integer userId)")
    @GetMapping("/getAchievements/{userId}")
    public List<Achievement> getAchievementsByUserId(@PathVariable(value = "userId")Integer userId){

        return achievementRepository.findAchievementsByUserId(userId);

    }

//    TODO zrobić wysyłanie do bazy
//    @PostMapping("/sendToDataBase/{userId}")
//    public void sendToDatabaseByUserId(@PathVariable(value = "userId") Integer userId,
//                               @RequestBody Integer achievementId){
//
//    }


}
