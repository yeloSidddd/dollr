package com.example.demo;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
public class HelloController {

    private final UserRepository userRepository;

    @Autowired
    public HelloController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/api/connection-status")
    public String connectionStatus() {
        try {
            // Check if admin user exists
            User admin = userRepository.findByEmail("admin").orElse(null);

            if (admin == null) {
                // Create admin user if it doesn't exist
                admin = new User();
                admin.setEmail("admin");
                admin.setPassword("password");
                userRepository.save(admin);

                userRepository.save(admin);
                return "Connected: Admin user created.";
            } else {
                return "Connected: Admin user already exists.";
            }
        } catch (Exception e) {
            return "Connection failed: " + e.getMessage();
        }
    }
}
