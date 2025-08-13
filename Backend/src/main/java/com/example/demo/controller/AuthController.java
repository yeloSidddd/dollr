package com.example.demo.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.User;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/auth")
public class AuthController {
    
    @PostMapping("/login")
    public String login(@RequestBody User user)
    {
        String email = user.getEmail();
        String password = user.getPassword();

        // Simple hardcoded check
        if ("admin".equals(email) && "password".equals(password)) {
            return "success";
        } else {
            return "invalid";
        }
    }
}
