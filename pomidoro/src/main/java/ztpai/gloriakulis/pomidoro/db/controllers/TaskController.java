package ztpai.gloriakulis.pomidoro.db.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ztpai.gloriakulis.pomidoro.db.repositories.TaskRepository;
import ztpai.gloriakulis.pomidoro.db.repositories.UserRepository;
import ztpai.gloriakulis.pomidoro.db.entity.Task;
import ztpai.gloriakulis.pomidoro.db.entity.User;


import java.sql.Date;
import java.time.LocalDate;
import java.util.*;


@Tag(name = "Tasks")
@RequestMapping("/api/tasks")
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;


    @Operation(summary = "add task to To Do List",
            description = " public ResponseEntity<String> addTask(@RequestHeader(\"email\") String email, @RequestBody String taskBody)")
    @PostMapping("/add/{userId}")
    public ResponseEntity<String> addTask(@PathVariable(value = "userId") Long userId, @RequestBody String taskBody) {
        Optional<User> userFromDB = userRepository.findById(userId);

        if (userFromDB.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Task task = new Task(userFromDB.get(), taskBody);
       taskRepository.save(task);
        return ResponseEntity.ok("Zadanie zostało dodane");
    }


    @Operation(summary = "get all task from user's To Do List",
            description = "public List<Task> getTasksByUserId(@PathVariable(value = \"userId\") Integer userId)")
    @GetMapping("{userId}")
    public List<Task> getTasksByUserId(@PathVariable(value = "userId") Integer userId) {
        return taskRepository.findByUserId(userId);
    }


    @Operation(summary = "marks task as completed",
            description = "public void markTaskAsCompletedByTaskId(@PathVariable(value = \"id\")Integer id)")
    @PutMapping("markAsCompleted/{id}")
    public void markTaskAsCompletedByTaskId(@PathVariable(value = "id")Integer id){
        Optional<Task> optionalTask = taskRepository.findById(id);
        Task task = optionalTask.get();
        task.setDate_of_completion(Date.valueOf(LocalDate.now()));
        taskRepository.save(task);
    }

    @Operation(summary = "count all completed task",
            description = "public int numberCompletedTTask(@PathVariable(value = \"userId\") Integer userId)")
    @GetMapping("numberCompletedTask/{userId}")
    public int numberCompletedTTask(@PathVariable(value = "userId") Integer userId){
        return taskRepository.countIsDone(userId);
    }

    @Operation(summary = "count compled tasks in week",
            description = "public List<Object[]> countByWeekByUserId(@PathVariable(value = \"userId\") Integer userId)")
    @GetMapping("countByWeek/{userId}")
    public List<Object[]> countByWeekByUserId(@PathVariable(value = "userId") Integer userId){
        return taskRepository.countTaskByWeek(userId);
    }


}
