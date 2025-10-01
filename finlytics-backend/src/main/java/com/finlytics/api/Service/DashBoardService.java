package com.finlytics.api.Service;

import com.finlytics.api.DTO.ExpenseDTO;
import com.finlytics.api.DTO.IncomeDTO;
import com.finlytics.api.DTO.RecentTransactionDTO;
import com.finlytics.api.Entity.ProfileEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import static java.util.stream.Stream.concat;

@Service
@RequiredArgsConstructor
public class DashBoardService {
    private final IncomeService incomeService;
    private final ProfileService profileService;
    private final ExpenseService expenseService;

    public Map<String, Object> getDashBoardData() {
        ProfileEntity currentProfile = profileService.getCurrentProfile ( );
        Map<String, Object> dashboardData = new LinkedHashMap<> ( );

        List<IncomeDTO> latestIncomes = incomeService.getLatest5IncomesForCurrentUser ( );
        List<ExpenseDTO> latestExpenses = expenseService.getLatest5ExpensesForCurrentUser ( );

        List<RecentTransactionDTO> recentTransactions = concat (
                latestIncomes.stream ( ).map ( income -> RecentTransactionDTO.builder ( )
                        .id ( income.getId ( ) )
                        .profileId ( currentProfile.getId ( ) ) // fixed profileId
                        .icon ( income.getIcon ( ) )
                        .name ( income.getName ( ) )
                        .amount ( income.getAmount ( ) )
                        .date ( income.getDate ( ) )
                        .createdAt ( income.getCreatedAt ( ) )
                        .updatedAt ( income.getUpdatedAt ( ) )
                        .type ( "income" )
                        .build ( ) ) ,
                latestExpenses.stream ( ).map ( expense -> RecentTransactionDTO.builder ( )
                        .id ( expense.getId ( ) )
                        .profileId ( currentProfile.getId ( ) ) // fixed profileId
                        .icon ( expense.getIcon ( ) )
                        .name ( expense.getName ( ) )
                        .amount ( expense.getAmount ( ) )
                        .date ( expense.getDate ( ) )
                        .createdAt ( expense.getCreatedAt ( ) )
                        .updatedAt ( expense.getUpdatedAt ( ) )
                        .type ( "expense" )
                        .build ( ) ) )
                .sorted ( (a , b) -> {
                    int cmp = b.getDate ( ).compareTo ( a.getDate ( ) );
                    if (cmp == 0 && a.getCreatedAt ( ) != null && b.getCreatedAt ( ) != null) {
                        return b.getCreatedAt ( ).compareTo ( a.getCreatedAt ( ) );
                    }
                    return cmp;
                } ).toList ( );
        dashboardData.put (
                "totalBalance" ,
                incomeService.getTotalIncomeForCurrentUser ( ).subtract ( expenseService.getTotalExpenseAmountForCurrentUser ( ) ) );
        dashboardData.put ( "totalIncome" ,
                incomeService.getTotalIncomeForCurrentUser ( ) );
        dashboardData.put ( "recent5Expenses" ,
                latestExpenses );
        dashboardData.put ( "recent5Incomes" ,
                latestIncomes );
        dashboardData.put ( "recentTransaction" , recentTransactions );
        return dashboardData;
    }
}
