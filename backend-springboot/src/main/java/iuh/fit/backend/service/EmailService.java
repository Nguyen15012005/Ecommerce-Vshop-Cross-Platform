package iuh.fit.backend.service;

import jakarta.mail.MessagingException;

/**
 * @author TrungNguyen
 * @created 4/20/2026
 * @description
 */
public interface EmailService {
    public void sendVerificationOtpEmail(String userEmail, String otp, String subject, String text) throws MessagingException ;
}
