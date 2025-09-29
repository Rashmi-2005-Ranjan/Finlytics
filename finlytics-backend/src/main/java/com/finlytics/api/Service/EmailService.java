package com.finlytics.api.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;


@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    @Value ( "${spring.mail.properties.mail.smtp.from}" )
    private String fromEmail;

    public void sendEmail(String toEmail, String subject, String body) throws MessagingException {
        Context context = new Context();
        context.setVariable("email", toEmail);
        context.setVariable("subject", subject);
        context.setVariable("body", body);

        String process = templateEngine.process ( "sendEmail",context );
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);

        helper.setFrom ( fromEmail );
        helper.setTo(toEmail);
        helper.setSubject(subject);
        helper.setText(process, true);
        mailSender.send(mimeMessage);
    }
}
