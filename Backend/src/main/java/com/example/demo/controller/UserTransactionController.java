package com.example.demo.controller;

import com.example.demo.model.Transaction;
import com.example.demo.model.User;
import com.example.demo.repository.TransactionRepository;
import com.example.demo.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class UserTransactionController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionRepository transactionRepository;

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

        // Use the date provided by the frontend if available
        if (transaction.getDate() != null) {
            transaction.setDate(transaction.getDate());
        } else {
            transaction.setDate(LocalDateTime.now());
        }

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

    // Chart data grouped by period
    @GetMapping("/users/{email}/chart")
    public Map<String, Object> getChartData(
            @PathVariable String email,
            @RequestParam(defaultValue = "all") String period) {

        List<Transaction> transactions = transactionRepository.findByUserEmailOrderByDateAsc(email);
        Map<String, Object> response = new HashMap<>();
        List<String> categories = new ArrayList<>();
        List<Double> data = new ArrayList<>();
        LocalDateTime now = LocalDateTime.now();

        switch (period.toLowerCase()) {
            case "1d": {
                // Group by hour (today only)
                Map<Integer, Double> hourly = new TreeMap<>();
                transactions.stream()
                        .filter(t -> t.getDate().toLocalDate().isEqual(now.toLocalDate()))
                        .forEach(t -> {
                            int hour = t.getDate().getHour();
                            hourly.put(hour, hourly.getOrDefault(hour, 0.0) + t.getAmount());
                        });
                hourly.forEach((hour, amount) -> {
                    categories.add(hour + ":00");
                    data.add(amount);
                });
                break;
            }
            case "1w": {
                // Group by day of week (last 7 days)
                Map<String, Double> daily = new LinkedHashMap<>();
                transactions.stream()
                        .filter(t -> t.getDate().isAfter(now.minusDays(7)))
                        .forEach(t -> {
                            String day = t.getDate().getDayOfWeek().toString().substring(0, 3);
                            daily.put(day, daily.getOrDefault(day, 0.0) + t.getAmount());
                        });
                daily.forEach((day, amount) -> {
                    categories.add(day);
                    data.add(amount);
                });
                break;
            }
            case "1m": {
                // Group by week (last 30 days)
                Map<String, Double> weekly = new LinkedHashMap<>();
                transactions.stream()
                        .filter(t -> t.getDate().isAfter(now.minusDays(30)))
                        .forEach(t -> {
                            int week = (t.getDate().getDayOfMonth() - 1) / 7 + 1;
                            String weekLabel = "Week " + week;
                            weekly.put(weekLabel, weekly.getOrDefault(weekLabel, 0.0) + t.getAmount());
                        });
                weekly.forEach((week, amount) -> {
                    categories.add(week);
                    data.add(amount);
                });
                break;
            }
            case "1y": {
                // Group by quarter (last 12 months)
                Map<String, Double> quarterly = new LinkedHashMap<>();
                transactions.stream()
                        .filter(t -> t.getDate().isAfter(now.minusYears(1)))
                        .forEach(t -> {
                            int month = t.getDate().getMonthValue();
                            int quarter = (month - 1) / 3 + 1;
                            String label = "Q" + quarter;
                            quarterly.put(label, quarterly.getOrDefault(label, 0.0) + t.getAmount());
                        });
                quarterly.forEach((q, amount) -> {
                    categories.add(q);
                    data.add(amount);
                });
                break;
            }
            case "all":
            default: {
                // Group by year
                Map<Integer, Double> yearly = new TreeMap<>();
                transactions.forEach(t -> {
                    int year = t.getDate().getYear();
                    yearly.put(year, yearly.getOrDefault(year, 0.0) + t.getAmount());
                });
                yearly.forEach((year, amount) -> {
                    categories.add(String.valueOf(year));
                    data.add(amount);
                });
                break;
            }
        }

        response.put("categories", categories);
        response.put("data", data);
        return response;
    }

@GetMapping("/users/{email}/balance-history")
public Map<String, Object> getBalanceHistory(
        @PathVariable String email,
        @RequestParam(defaultValue = "all") String period) {

    List<Transaction> transactions = transactionRepository.findByUserEmailOrderByDateAsc(email);
    Map<String, Object> response = new HashMap<>();
    List<String> categories = new ArrayList<>();
    List<Double> balances = new ArrayList<>();

    if (transactions.isEmpty()) {
        response.put("categories", categories);
        response.put("balances", balances);
        return response;
    }

    LocalDateTime latest = transactions.get(transactions.size() - 1).getDate();

    // Filter transactions based on period (using date only, no time)
    List<Transaction> filtered = switch (period.toLowerCase()) {
        case "1d" -> transactions.stream()
                .filter(t -> t.getDate().toLocalDate().isEqual(latest.toLocalDate()))
                .toList();
        case "1w" -> transactions.stream()
                .filter(t -> !t.getDate().toLocalDate().isBefore(latest.toLocalDate().minusDays(6)) &&
                             !t.getDate().toLocalDate().isAfter(latest.toLocalDate()))
                .toList();
        case "1m" -> transactions.stream()
                .filter(t -> !t.getDate().toLocalDate().isBefore(latest.toLocalDate().minusDays(29)) &&
                             !t.getDate().toLocalDate().isAfter(latest.toLocalDate()))
                .toList();
        case "1y" -> transactions.stream()
                .filter(t -> !t.getDate().toLocalDate().isBefore(latest.toLocalDate().minusYears(1).plusDays(1)) &&
                             !t.getDate().toLocalDate().isAfter(latest.toLocalDate()))
                .toList();
        default -> transactions;
    };

    // Group transactions by date (date only, no time)
    Map<String, Double> dailyNet = new LinkedHashMap<>();
    DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    for (Transaction t : filtered) {
        String dateKey = t.getDate().toLocalDate().format(dateFormatter);
        double amount = "income".equalsIgnoreCase(t.getType()) ? t.getAmount() : -t.getAmount();
        dailyNet.put(dateKey, dailyNet.getOrDefault(dateKey, 0.0) + amount);
    }

    // Calculate cumulative balance from grouped daily net amounts
    double runningBalance = 0.0;
    for (Map.Entry<String, Double> entry : dailyNet.entrySet()) {
        runningBalance += entry.getValue();
        categories.add(entry.getKey());
        balances.add(runningBalance);
    }

    response.put("categories", categories);
    response.put("balances", balances);
    return response;
}
}
