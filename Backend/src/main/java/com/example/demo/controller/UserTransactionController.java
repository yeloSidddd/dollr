package com.example.demo.controller;

import com.example.demo.model.Transaction;
import com.example.demo.model.User;
import com.example.demo.repository.TransactionRepository;
import com.example.demo.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class UserTransactionController {

    @Autowired
    private UserRepository userRepository; // your UserRepository

    @Autowired
    private TransactionRepository transactionRepository; // your TransactionRepository

    // Create user
    @PostMapping("/users")
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    // Add transaction for a user (with balance update)
    @PostMapping("/users/{email}/transactions")
    public Transaction addTransaction(@PathVariable String email, @RequestBody Transaction transaction) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found!"));

        // Get last balance
        Transaction lastTransaction = transactionRepository.findTopByUserEmailOrderByDateDesc(email);
        double previousBalance = (lastTransaction != null) ? lastTransaction.getBalance() : 0.0;

        // Adjust balance based on type
        double newBalance;
        if ("expense".equalsIgnoreCase(transaction.getType())) {
            newBalance = previousBalance - transaction.getAmount();
        } else { // income
            newBalance = previousBalance + transaction.getAmount();
        }

        transaction.setUser(user);
        transaction.setBalance(newBalance);
        transaction.setDate(LocalDateTime.now());

        return transactionRepository.save(transaction);
    }

    // Get all transactions for a user
    @GetMapping("/users/{email}/transactions")
    public List<Transaction> getUserTransactions(@PathVariable String email) {
        return transactionRepository.findByUserEmailOrderByDateAsc(email);
    }

    // Get current balance
    @GetMapping("/users/{email}/balance")
    public double getCurrentBalance(@PathVariable String email) {
        Transaction lastTransaction = transactionRepository.findTopByUserEmailOrderByDateDesc(email);
        return (lastTransaction != null) ? lastTransaction.getBalance() : 0.0;
    }
}
