package com.example.demo.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamSource;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.util.List;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    @Autowired
    private JavaMailSender mailSender;

    public void sendSimpleMessage(String to, String subject, String text) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);
            mailSender.send(message);
            logger.info("Simple email sent to {}", to);
        } catch (MailException e) {
            logger.error("Failed to send simple email to {}", to, e);
            throw e;
        }
    }

    @Async
    public void sendHtmlMessage(String to, String subject, String htmlBody) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlBody, true);
            mailSender.send(message);
            logger.info("HTML email sent to {}", to);
        } catch (MessagingException | MailException e) {
            logger.error("Failed to send HTML email to {}", to, e);
            throw new RuntimeException(e);
        }
    }

    @Async
    public void sendMessageWithAttachments(String to, String subject, String text, List<Attachment> attachments) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text, false);

            if (attachments != null) {
                for (Attachment attachment : attachments) {
                    helper.addAttachment(attachment.getFilename(), attachment.getInputStreamSource());
                }
            }

            mailSender.send(message);
            logger.info("Email with attachments sent to {}", to);
        } catch (MessagingException | MailException e) {
            logger.error("Failed to send email with attachments to {}", to, e);
            throw new RuntimeException(e);
        }
    }

    public void sendPasswordResetEmail(String toEmail, String resetLink) {
        String subject = "Password Reset Request";
        String text = "To reset your password, click the following link:\n" + resetLink;
        sendSimpleMessage(toEmail, subject, text);
    }

    public static class Attachment {
        private String filename;
        private InputStreamSource inputStreamSource;

        public Attachment(String filename, InputStreamSource inputStreamSource) {
            this.filename = filename;
            this.inputStreamSource = inputStreamSource;
        }

        public String getFilename() {
            return filename;
        }

        public InputStreamSource getInputStreamSource() {
            return inputStreamSource;
        }
    }
}
