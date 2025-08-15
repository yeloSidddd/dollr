package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
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

    @GetMapping
    public List<User> getUsers() {
        return repo.findAll();
    }
}
