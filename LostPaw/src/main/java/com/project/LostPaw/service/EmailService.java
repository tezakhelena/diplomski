package com.project.LostPaw.service;

public interface EmailService {
    void sendVerificationEmail(String email, String verificationUrl);
}
