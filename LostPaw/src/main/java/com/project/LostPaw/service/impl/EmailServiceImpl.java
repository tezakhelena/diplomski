package com.project.LostPaw.service.impl;

import com.project.LostPaw.service.EmailService;
import freemarker.template.Template;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import freemarker.template.Configuration;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import java.time.Year;
import java.util.HashMap;
import java.util.Map;

@Service
public class EmailServiceImpl implements EmailService {
    @Autowired
    JavaMailSender mailSender;

    @Autowired
    Configuration freemarkerConfig;

    public void sendVerificationEmail(String email, String verificationUrl) {
        try {
            Template template = freemarkerConfig.getTemplate("email-verification.ftl");

            Map<String, Object> model = new HashMap<>();
            model.put("verificationUrl", verificationUrl);
            model.put("year", Year.now());

            String emailContent = FreeMarkerTemplateUtils.processTemplateIntoString(template, model);

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom("tezak.helena@gmail.com");
            helper.setTo(email);
            helper.setSubject("Verificiraj svoj email");
            helper.setText(emailContent, true);

            ClassPathResource image = new ClassPathResource("static/images/LostPaws.png");
            helper.addInline("backgroundImage", image);

            mailSender.send(message);

        } catch (Exception e) {
            throw new RuntimeException("Failed to send email: " + e.getMessage());
        }
    }
}
