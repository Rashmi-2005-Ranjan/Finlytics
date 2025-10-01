package com.finlytics.api.Repository;

import com.finlytics.api.Entity.IncomeEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface IncomeRepository extends JpaRepository<IncomeEntity, Long> {
    //SELECT * FROM incomes WHERE profileId = ? ORDER BY date DESC
    List<IncomeEntity> findByProfileIdOrderByDateDesc(Long profileId);

    //SELECT * FROM incomes WHERE profileId = ? ORDER BY date DESC LIMIT 5
    List<IncomeEntity> findTop5ByProfileIdOrderByDateDesc(Long profileId);

    @Query("SELECT SUM(e.amount) FROM IncomeEntity AS e WHERE e.profile.id = :profileId")
    BigDecimal findTotalExpenseByProfileId(@Param("profileId") Long profileId);

    //SELECT * FROM incomes WHERE profileId = ? AND date BETWEEN ? AND ? and name LIKE %?%
    List<IncomeEntity> findByProfileIdAndDateBetweenAndNameContainingIgnoreCase(
            Long profileId ,
            LocalDate startDate ,
            LocalDate endDate ,
            String keyword ,
            Sort sort
    );

    //SELECT * FROM incomes WHERE profileId = ? AND date BETWEEN ? AND ?
    List<IncomeEntity> findByProfileIdAndDateBetween(
            Long profileId ,
            LocalDate startDate ,
            LocalDate endDate
    );
    //SELECT * FROM incomes WHERE profileId = ? AND date = ?
    List<IncomeEntity> findByProfileIdAndDate(Long profileId , LocalDate date);
}