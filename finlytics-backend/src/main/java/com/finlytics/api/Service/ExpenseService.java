package com.finlytics.api.Service;

import com.finlytics.api.DTO.ExpenseDTO;
import com.finlytics.api.Entity.CategoryEntity;
import com.finlytics.api.Entity.ExpenseEntity;
import com.finlytics.api.Entity.ProfileEntity;
import com.finlytics.api.Repository.CategoryRepository;
import com.finlytics.api.Repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseService {
    private final CategoryRepository categoryRepository;
    private final ExpenseRepository expenseRepository;
    private final ProfileService profileService;

    //Add Expense
    public ExpenseDTO addExpense(ExpenseDTO DTO) {
        //Get The Profile
        ProfileEntity currentProfile = profileService.getCurrentProfile ( );
        //Get The Category
        CategoryEntity byId = categoryRepository.findById ( DTO.getCategoryId ( ) )
                .orElseThrow ( () -> new RuntimeException ( "Category Not Found" ) );
        ExpenseEntity entity = toEntity ( DTO , currentProfile , byId );
        entity = expenseRepository.save ( entity );
        return toDTO ( entity );
    }

    //Retrieves All The Expenses For The current Month/Based On The Start and End Date
    public List<ExpenseDTO> getCurrentMonthExpensesForCurrentUser() {
        ProfileEntity currentProfile = profileService.getCurrentProfile ( );
        LocalDate now = LocalDate.now ( );
        LocalDate startDate = now.withDayOfMonth ( 1 ); // First day of the month
        LocalDate endDate = now.withDayOfMonth ( now.lengthOfMonth ( ) ); // Last day of the month
        List<ExpenseEntity> expenseEntityList = expenseRepository.findByProfileIdAndDateBetween ( currentProfile.getId ( ) , startDate , endDate );
        return expenseEntityList
                .stream ( )
                .map ( this::toDTO )
                .toList ( );
    }

    //Delete Expense By Id For The Current User
    public void deleteExpense(Long expenseId) {
        ProfileEntity currentProfile = profileService.getCurrentProfile ( );
        ExpenseEntity expense = expenseRepository.findById ( expenseId )
                .orElseThrow ( () -> new RuntimeException ( "Expense Not Found" ) );
        if (expense.getProfile ( ).getId ( ).equals ( currentProfile.getId ( ) ))
            expenseRepository.delete ( expense );
        else
            throw new RuntimeException ( "You Are Unauthorized To Delete This Expense" );
    }

    //Get Latest 5 Expenses For Current User
    public List<ExpenseDTO> getLatest5ExpensesForCurrentUser() {
        ProfileEntity currentProfile = profileService.getCurrentProfile ( );
        List<ExpenseEntity> expenseEntityList = expenseRepository.findTop5ByProfileIdOrderByDateDesc ( currentProfile.getId ( ) );
        return expenseEntityList
                .stream ( )
                .map ( this::toDTO )
                .toList ( );
    }

    //Get Total Expense Amount For Current User
    public BigDecimal getTotalExpenseAmountForCurrentUser() {
        ProfileEntity currentProfile = profileService.getCurrentProfile ( );
        BigDecimal totalExpense = expenseRepository.findTotalExpenseByProfileId ( currentProfile.getId ( ) );
        return totalExpense != null ? totalExpense : BigDecimal.ZERO;
    }

    //Filter Expenses By Category For Current User
    public List<ExpenseDTO> filterExpenses(LocalDate startDate , LocalDate endDate , String keyword , Sort sort) {
        ProfileEntity currentProfile = profileService.getCurrentProfile ( );
        List<ExpenseEntity> expenseEntityList = expenseRepository.findByProfileIdAndDateBetweenAndNameContainingIgnoreCase ( currentProfile.getId ( ) , startDate , endDate , keyword , sort );
        return expenseEntityList
                .stream ( )
                .map ( this::toDTO )
                .toList ( );
    }

    //Notifications
    public List<ExpenseDTO> getExpensesForUserOnDate(Long profileId , LocalDate date) {
        List<ExpenseEntity> list = expenseRepository.findByProfileIdAndDate ( profileId , date );
        return list.stream ( ).map ( this::toDTO ).toList ( );
    }

    public Double getYesterdayExpense(Long profileId) {
        LocalDate yesterday = LocalDate.now ( ).minusDays ( 1 );
        List<ExpenseEntity> yesterdayExpenses = expenseRepository.findByProfileIdAndDate ( profileId , yesterday );
        if (yesterdayExpenses != null) {
            return yesterdayExpenses.stream ( )
                    .mapToDouble ( expense -> expense.getAmount ( ).doubleValue ( ) )
                    .sum ( );
        } else {
            return 0.0;
        }
    }


    private ExpenseEntity toEntity(ExpenseDTO expenseDTO , ProfileEntity profileEntity , CategoryEntity categoryEntity) {
        return ExpenseEntity.builder ( )
                .name ( expenseDTO.getName ( ) )
                .icon ( expenseDTO.getIcon ( ) )
                .amount ( expenseDTO.getAmount ( ) )
                .date ( expenseDTO.getDate ( ) )
                .category ( categoryEntity )
                .profile ( profileEntity )
                .build ( );
    }

    private ExpenseDTO toDTO(ExpenseEntity expenseEntity) {
        return ExpenseDTO.builder ( )
                .id ( expenseEntity.getId ( ) )
                .name ( expenseEntity.getName ( ) )
                .icon ( expenseEntity.getIcon ( ) )
                .amount ( expenseEntity.getAmount ( ) )
                .date ( expenseEntity.getDate ( ) )
                .categoryId ( expenseEntity.getCategory ( ) != null ? expenseEntity.getCategory ( ).getId ( ) : null )
                .categoryName ( expenseEntity.getCategory ( ) != null ? expenseEntity.getCategory ( ).getName ( ) : "N/A" )
                .createdAt ( expenseEntity.getCreatedAt ( ) )
                .updatedAt ( expenseEntity.getUpdatedAt ( ) )
                .build ( );
    }
}
