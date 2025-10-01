package com.finlytics.api.Service;

import com.finlytics.api.DTO.IncomeDTO;
import com.finlytics.api.Entity.CategoryEntity;
import com.finlytics.api.Entity.IncomeEntity;
import com.finlytics.api.Entity.ProfileEntity;
import com.finlytics.api.Repository.CategoryRepository;
import com.finlytics.api.Repository.IncomeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class IncomeService {
    private final CategoryRepository categoryRepository;
    private final IncomeRepository incomeRepository;
    private final ProfileService profileService;

    public IncomeDTO addIncome(IncomeDTO DTO) {
        //Get The Profile
        ProfileEntity currentProfile = profileService.getCurrentProfile ( );
        //Get The Category
        CategoryEntity byId = categoryRepository.findById ( DTO.getCategoryId ( ) )
                .orElseThrow ( () -> new RuntimeException ( "Category Not Found" ) );
        IncomeEntity entity = toEntity ( DTO , currentProfile , byId );
        entity = incomeRepository.save ( entity );
        return toDTO ( entity );
    }

    //Retrieves All The Expenses For The current Month/Based On The Start and End Date
    public List<IncomeDTO> getCurrentMonthIncomesForCurrentUser() {
        ProfileEntity currentProfile = profileService.getCurrentProfile ( );
        LocalDate now = LocalDate.now ( );
        LocalDate startDate = now.withDayOfMonth ( 1 ); // First day of the month
        LocalDate endDate = now.withDayOfMonth ( now.lengthOfMonth ( ) ); // Last day of the month
        List<IncomeEntity> expenseEntityList = incomeRepository.findByProfileIdAndDateBetween ( currentProfile.getId ( ) , startDate , endDate );
        return expenseEntityList
                .stream ( )
                .map ( this::toDTO )
                .toList ( );
    }

    //Delete Income By Id For The Current User
    public void deleteIncome(Long incomeId) {
        ProfileEntity currentProfile = profileService.getCurrentProfile ( );
        IncomeEntity income = incomeRepository.findById ( incomeId )
                .orElseThrow ( () -> new RuntimeException ( "Income Not Found" ) );
        if (income.getProfile ( ).getId ( ).equals ( currentProfile.getId ( ) ))
            incomeRepository.delete ( income );
        else
            throw new RuntimeException ( "You Are Unauthorized To Delete This Income" );
    }

    //Get Latest 5 Incomes For Current User
    public List<IncomeDTO> getLatest5IncomesForCurrentUser() {
        ProfileEntity currentProfile = profileService.getCurrentProfile ( );
        List<IncomeEntity> incomeEntityList = incomeRepository.findTop5ByProfileIdOrderByDateDesc ( currentProfile.getId ( ) );
        return incomeEntityList
                .stream ( )
                .map ( this::toDTO )
                .toList ( );
    }

    //Get Total Income Amount For Current User
    public BigDecimal getTotalIncomeForCurrentUser() {
        ProfileEntity currentProfile = profileService.getCurrentProfile ( );
        BigDecimal totalIncome = incomeRepository.findTotalExpenseByProfileId ( currentProfile.getId ( ) );
        return totalIncome != null ? totalIncome : BigDecimal.ZERO;
    }

    //Filter Incomes By Category For Current User
    public List<IncomeDTO> filterIncomes(LocalDate startDate , LocalDate endDate , String keyword , Sort sort) {
        ProfileEntity currentProfile = profileService.getCurrentProfile ( );
        List<IncomeEntity> incomeEntityList = incomeRepository.findByProfileIdAndDateBetweenAndNameContainingIgnoreCase ( currentProfile.getId ( ) , startDate , endDate , keyword , sort );
        return incomeEntityList
                .stream ( )
                .map ( this::toDTO )
                .toList ( );
    }

    public Double getYesterdayIncome(Long profileId) {
        LocalDate yesterday = LocalDate.now ( ).minusDays ( 1 );
        List<IncomeEntity> yesterdayIncomes = incomeRepository.findByProfileIdAndDate ( profileId , yesterday );
        if (yesterdayIncomes != null) {
            return yesterdayIncomes.stream ( )
                    .mapToDouble ( income -> income.getAmount ( ).doubleValue ( ) )
                    .sum ( );
        } else {
            return 0.0;
        }
    }

    private IncomeEntity toEntity(IncomeDTO incomeDTO , ProfileEntity profileEntity , CategoryEntity categoryEntity) {
        return IncomeEntity.builder ( )
                .name ( incomeDTO.getName ( ) )
                .icon ( incomeDTO.getIcon ( ) )
                .amount ( incomeDTO.getAmount ( ) )
                .date ( incomeDTO.getDate ( ) )
                .category ( categoryEntity )
                .profile ( profileEntity )
                .build ( );
    }


    private IncomeDTO toDTO(IncomeEntity incomeEntity) {
        return IncomeDTO.builder ( )
                .id ( incomeEntity.getId ( ) )
                .name ( incomeEntity.getName ( ) )
                .icon ( incomeEntity.getIcon ( ) )
                .amount ( incomeEntity.getAmount ( ) )
                .date ( incomeEntity.getDate ( ) )
                .categoryId ( incomeEntity.getCategory ( ) != null ? incomeEntity.getCategory ( ).getId ( ) : null )
                .categoryName ( incomeEntity.getCategory ( ) != null ? incomeEntity.getCategory ( ).getName ( ) : "N/A" )
                .createdAt ( incomeEntity.getCreatedAt ( ) )
                .updatedAt ( incomeEntity.getUpdatedAt ( ) )
                .build ( );
    }
}