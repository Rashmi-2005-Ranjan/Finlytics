package com.finlytics.api.Service;

import com.finlytics.api.DTO.ExpenseDTO;
import com.finlytics.api.Entity.ProfileEntity;
import com.finlytics.api.Repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {
    private final ProfileRepository profileRepository;
    private final EmailService emailService;
    private final ExpenseService expenseService;
    private final IncomeService incomeService;

    @Value("${frontend.url}")
    private String frontendUrl;

    @Scheduled(cron = "0 0 22 * * *", zone = "IST") // Every day at 10 PM IST
//    @Scheduled(cron = "0 * * * * *", zone = "IST") // For Testing: Every minute
    public void sendDailyReminderForAddingIncomeAndExpenses() {
        log.info ( "Job Started: Sending Daily Income and Expense Reminder Emails" );
        List<ProfileEntity> profiles = profileRepository.findAll ( );
        for (ProfileEntity profile : profiles) {
            Double income = incomeService.getYesterdayIncome ( profile.getId ( ) );
            Double expense = expenseService.getYesterdayExpense ( profile.getId ( ) );
            emailService.sendDailyReminder ( profile , income , expense , frontendUrl );
        }
        log.info ( "Job Finished: Sending Daily Income and Expense Reminder Emails" );
    }

    @Scheduled(cron = "0 0 23 * * *", zone = "IST")
    //@Scheduled(cron = "0 * * * * *", zone = "IST") // For Testing: Every minute
    public void sendDailyExpenseSummary() {
        log.info ( "Job Started: Sending Daily Expense Summary" );
        List<ProfileEntity> profiles = profileRepository.findAll ( );
        for (ProfileEntity profile : profiles) {
            List<ExpenseDTO> expensesForUserOnDate = expenseService.getExpensesForUserOnDate ( profile.getId ( ) , LocalDate.now ( ZoneId.of ( "Asia/Kolkata" ) ) );
            if (!expensesForUserOnDate.isEmpty ( )) {
                emailService.sendDailyExpenseReminder ( profile , expensesForUserOnDate , frontendUrl );
            }
        }
        log.info ( "Job Completed: Sending Daily Expense Summary" );
    }
}
