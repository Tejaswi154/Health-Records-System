package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // This is a simple in-memory store for tokens for demonstration purposes.
    // In a real application, use a persistent store like a database.
    private Map<String, String> passwordResetTokens = new HashMap<>();

    // Implement actual user lookup logic
    public boolean checkUserExistsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    // Create a password reset token and associate it with the user's email
    public String createPasswordResetToken(String email) {
        String token = UUID.randomUUID().toString();
        passwordResetTokens.put(token, email);
        return token;
    }

    // Validate the password reset token
    public boolean validatePasswordResetToken(String token) {
        return passwordResetTokens.containsKey(token);
    }

    // Implement actual password update logic for the user identified by email
    public void updatePassword(String token, String newPassword) {
        String email = passwordResetTokens.get(token);
        if (email != null) {
            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                user.setPassword(passwordEncoder.encode(newPassword));
                userRepository.save(user);
                passwordResetTokens.remove(token);
            }
        }
    }
}
