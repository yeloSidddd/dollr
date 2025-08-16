package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

import jakarta.servlet.http.HttpSession;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")

@RequestMapping("/api/users")
public class UserController {

    private final UserRepository repo;

    public UserController(UserRepository repo) {
        this.repo = repo;
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        // Save user to DB
        User savedUser = repo.save(user);

        // Hide password before returning
        savedUser.setPassword(null);
        return savedUser;
    }

    @GetMapping("/me")
    public ResponseEntity<String> getSessionName(HttpSession session) {
        String name = (String) session.getAttribute("name");

        if (name != null) {
            System.out.println(name);
            return ResponseEntity.ok(name);
        } else {
            return ResponseEntity.status(401).body("Not logged in");
        }
    }

}
