package ztpai.gloriakulis.pomidoro.db.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ztpai.gloriakulis.pomidoro.db.entity.TimerSettings;
import ztpai.gloriakulis.pomidoro.db.repositories.TimerSettingsRepository;
import ztpai.gloriakulis.pomidoro.db.repositories.UserRepository;


import java.util.Optional;

@Tag(name = "Timer Settings")
@RequestMapping("/api/timer")
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TimerController {
    @Autowired
    private TimerSettingsRepository timerSettingsRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    ObjectMapper objectMapper;

    @Operation(summary = "get user's timer settings",
            description = "public Optional<TimerSettings> getTimerByUserId(@PathVariable(value = \"userId\") Integer userId)")
    @GetMapping("{userId}")
    public Optional<TimerSettings> getTimerByUserId(@PathVariable(value = "userId") Integer userId) {
        return timerSettingsRepository.findTimerSettingsByUserId(userId);
    }


    @Operation(summary = "update session length",
            description = "public ResponseEntity<String> updateSessionLengthById(@PathVariable(value = \"userId\") Long userId, @RequestBody Integer value) ")
    @PutMapping("/setSessionLength/{userId}")
    public ResponseEntity<String> updateSessionLengthById(@PathVariable(value = "userId") Long userId, @RequestBody Integer value) {
        try {
            Optional<TimerSettings> optionalTimerSettings = timerSettingsRepository.findTimerSettingsByUserId(Math.toIntExact(userId));

                TimerSettings timerSettings = optionalTimerSettings.get();
                timerSettings.setSession_length(value);
                timerSettings.setUser(userRepository.findById(userId).get());

                timerSettingsRepository.save(timerSettings);

                return ResponseEntity.ok("Dane zostały zaaktualizowane");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Wystąpił błąd podczas aktualizacji danych");
        }
    }

    @Operation(summary = " update break length",
            description = "public ResponseEntity<String> updateBreakLengthById(@PathVariable(value = \"userId\") Long userId, @RequestBody Integer value)")
    @PutMapping("/setBreakLength/{userId}")
    public ResponseEntity<String> updateBreakLengthById(@PathVariable(value = "userId") Long userId, @RequestBody Integer value) {
        try {
            Optional<TimerSettings> optionalTimerSettings = timerSettingsRepository.findTimerSettingsByUserId(Math.toIntExact(userId));


                TimerSettings timerSettings = optionalTimerSettings.get();
                timerSettings.setBreak_length(value);
                timerSettings.setUser(userRepository.findById(userId).get());

                timerSettingsRepository.save(timerSettings);

                return ResponseEntity.ok("Dane zostały zaaktualizowane");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Wystąpił błąd podczas aktualizacji danych");
        }
    }

    @Operation(summary = "update number of session",
    description = "public ResponseEntity<String> updateNumberOfSessionsById(@PathVariable(value = \"userId\") Long userId, @RequestBody Integer value)")
    @PutMapping("/setNumberOfSessions/{userId}")
    public ResponseEntity<String> updateNumberOfSessionsById(@PathVariable(value = "userId") Long userId, @RequestBody Integer value) {
        try {
            Optional<TimerSettings> optionalTimerSettings = timerSettingsRepository.findTimerSettingsByUserId(Math.toIntExact(userId));


                TimerSettings timerSettings = optionalTimerSettings.get();
                timerSettings.setNumber_of_sessions(value);
                timerSettings.setUser(userRepository.findById(userId).get());

                timerSettingsRepository.save(timerSettings);

                return ResponseEntity.ok("Dane zostały zaaktualizowane");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Wystąpił błąd podczas aktualizacji danych");
        }
    }



    @Operation(summary = "update all Settings",
            description = "public ResponseEntity<String> updateAllSettings(@PathVariable(value = \"userId\") Long userId, @RequestBody TimerSettings timerSettings1)")
    @PutMapping("updateAllSettings/{userId}")
    public ResponseEntity<String> updateAllSettings(@PathVariable(value = "userId") Long userId, @RequestBody TimerSettings timerSettings1) {
        try {
            Optional<TimerSettings> optionalTimerSettings = timerSettingsRepository.findTimerSettingsByUserId(Math.toIntExact(userId));


            TimerSettings timerSettings = optionalTimerSettings.get();
            timerSettings.setNumber_of_sessions(timerSettings1.getNumber_of_sessions());
            timerSettings.setSession_length(timerSettings1.getSession_length());
            timerSettings.setBreak_length(timerSettings1.getBreak_length());
            timerSettings.setUser(userRepository.findById(userId).get());

            timerSettingsRepository.save(timerSettings);

            return ResponseEntity.ok("Dane zostały zaaktualizowane");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Wystąpił błąd podczas aktualizacji danych");
        }
    }
}
