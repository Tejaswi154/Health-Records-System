package com.example.demo.controller;

import com.example.demo.service.EmailService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class ForgotPasswordController {

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam("email") String email) {
        boolean userExists = userService.checkUserExistsByEmail(email);
        if (!userExists) {
            return ResponseEntity.badRequest().body("User with given email does not exist.");
        }

        String token = userService.createPasswordResetToken(email);
        String resetLink = "http://localhost:8080/reset-password?token=" + token;

        // Send email with reset link with enhanced styling
        String htmlContent = "<h1>Password Reset Request</h1>"
                + "<p>Dear user,</p>"
                + "<p>We received a request to reset your password. Click the button below to reset it:</p>"
                + "<a href=\"" + resetLink + "\" style=\"display:inline-block;padding:10px 20px;margin:10px 0;font-size:16px;color:#ffffff;background-color:#007bff;text-decoration:none;border-radius:5px;\">Reset Password</a>"
                + "<p>If you did not request a password reset, please ignore this email.</p>"
                + "<p>Thank you,<br/>The Million Dollar App Team</p>";

        emailService.sendHtmlMessage(email, "Password Reset Request", htmlContent);

        return ResponseEntity.ok("Password reset email sent.");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam("token") String token, @RequestParam("newPassword") String newPassword) {
        boolean valid = userService.validatePasswordResetToken(token);
        if (!valid) {
            return ResponseEntity.badRequest().body("Invalid or expired password reset token.");
        }

        userService.updatePassword(token, newPassword);
        return ResponseEntity.ok("Password has been reset successfully.");
    }
}
