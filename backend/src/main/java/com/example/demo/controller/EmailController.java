package com.example.demo.controller;

import com.example.demo.service.EmailService;
import com.example.demo.service.EmailService.Attachment;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/email")
@Validated
public class EmailController {

    private static final Logger logger = LoggerFactory.getLogger(EmailController.class);

    @Autowired
    private EmailService emailService;

    public static class EmailRequest {
        @NotBlank(message = "Name is required")
        public String name;

        @NotBlank(message = "Recipient email is required")
        @Email(message = "Recipient email should be valid")
        public String to;

        public String subject;

        public String body;

        public boolean isHtml;
    }

    @PostMapping(value = "/send", consumes = {"multipart/form-data"})
    public ResponseEntity<String> sendEmail(
            @Valid @ModelAttribute EmailRequest request,
            @RequestParam(value = "attachments", required = false) List<MultipartFile> attachments) {

        String subject = StringUtils.hasText(request.subject) ? request.subject : "New message from " + request.name;
        String body = StringUtils.hasText(request.body) ? request.body : "Sender: " + request.name + "\nEmail: " + request.to;

        try {
            if (attachments != null && !attachments.isEmpty()) {
                List<Attachment> attachmentList = new ArrayList<>();
                for (MultipartFile file : attachments) {
                    if (!file.isEmpty()) {
                        InputStreamSource source = file::getInputStream;
                        attachmentList.add(new Attachment(file.getOriginalFilename(), source));
                    }
                }
                emailService.sendMessageWithAttachments(request.to, subject, body, attachmentList);
            } else if (request.isHtml) {
                emailService.sendHtmlMessage(request.to, subject, body);
            } else {
                emailService.sendSimpleMessage(request.to, subject, body);
            }
            logger.info("Email sent successfully to {}", request.to);
            return ResponseEntity.ok("Email sent successfully");
        } catch (Exception e) {
            logger.error("Failed to send email", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send email");
        }
    }
}
