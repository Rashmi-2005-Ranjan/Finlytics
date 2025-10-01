package com.finlytics.api.Service;

import com.finlytics.api.DTO.ExpenseDTO;
import com.finlytics.api.Entity.ProfileEntity;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    @Value("${spring.mail.properties.mail.smtp.from}")
    private String fromEmail;

    public void sendEmail(String toEmail , String subject , String body) throws MessagingException {
        Context context = new Context ( );
        context.setVariable ( "email" , toEmail );
        context.setVariable ( "subject" , subject );
        context.setVariable ( "body" , body );

        String process = templateEngine.process ( "sendEmail" , context );
        MimeMessage mimeMessage = mailSender.createMimeMessage ( );
        MimeMessageHelper helper = new MimeMessageHelper ( mimeMessage );

        helper.setFrom ( fromEmail );
        helper.setTo ( toEmail );
        helper.setSubject ( subject );
        helper.setText ( process , true );
        mailSender.send ( mimeMessage );
    }

    public void sendDailyReminder(ProfileEntity profile , double income , double expense , String frontendUrl) {
        Context context = new Context ( );
        context.setVariable ( "name" , profile.getFullName ( ) );
        context.setVariable ( "date" , LocalDate.now ( ).toString ( ) );
        context.setVariable ( "income" , income );
        context.setVariable ( "expense" , expense );
        context.setVariable ( "dashboardUrl" , frontendUrl + "/dashboard" );

        String htmlContent = templateEngine.process ( "dailyReminder" , context );

        try {
            MimeMessage message = mailSender.createMimeMessage ( );
            MimeMessageHelper helper = new MimeMessageHelper ( message , true , "UTF-8" );

            helper.setTo ( profile.getEmail ( ) );
            helper.setSubject ( "Your Daily Income & Expense Reminder" );
            helper.setText ( htmlContent , true ); // ✅ HTML content

            mailSender.send ( message );
        } catch (MessagingException e) {
            throw new RuntimeException ( "Failed to send email" , e );
        }
    }

    public void sendDailyExpenseReminder(ProfileEntity profile , List<ExpenseDTO> expenses , String frontendUrl) {
        // Calculate total expense for today
        Double totalExpense = expenses.stream ( )
                .map ( ExpenseDTO::getAmount )
                .mapToDouble ( BigDecimal::doubleValue )
                .sum ( );

        Context context = new Context ( );
        context.setVariable ( "name" , profile.getFullName ( ) );
        context.setVariable ( "date" , LocalDate.now ( ZoneId.of ( "Asia/Kolkata" ) ).toString ( ) );
        context.setVariable ( "expense" , totalExpense );
        context.setVariable ( "expenses" , expenses ); // Pass list to Thymeleaf
        context.setVariable ( "dashboardUrl" , frontendUrl + "/dashboard" );

        String htmlContent = templateEngine.process ( "dailyExpenseReminder" , context );

        try {
            MimeMessage message = mailSender.createMimeMessage ( );
            MimeMessageHelper helper = new MimeMessageHelper ( message , true , "UTF-8" );

            helper.setTo ( profile.getEmail ( ) );
            helper.setSubject ( "Your Daily Expense Summary" );
            helper.setText ( htmlContent , true ); // HTML content

            mailSender.send ( message );
        } catch (MessagingException e) {
            throw new RuntimeException ( "Failed to send daily expense email" , e );
        }
    }
}
