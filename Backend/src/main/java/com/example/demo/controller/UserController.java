package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

import jakarta.servlet.http.HttpSession;

import java.util.Map;

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
    public ResponseEntity<User> getSessionName(HttpSession session) {
        String name = (String) session.getAttribute("name");
        String email = (String) session.getAttribute("email");

        if (name != null) {
            User user = new User(email, null, name, null, null, null, null);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(401).body(null);
        }
    }

}
