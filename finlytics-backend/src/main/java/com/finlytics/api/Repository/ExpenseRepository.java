package com.finlytics.api.Repository;

import com.finlytics.api.Entity.ExpenseEntity;
import com.finlytics.api.Entity.IncomeEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<ExpenseEntity, Long> {

    //SELECT * FROM expenses WHERE profileId = ? ORDER BY date DESC
    List<ExpenseEntity> findByProfileIdOrderByDateDesc(Long profileId);

    //SELECT * FROM expenses WHERE profileId = ? ORDER BY date DESC LIMIT 5
    List<ExpenseEntity> findTop5ByProfileIdOrderByDateDesc(Long profileId);

    @Query("SELECT SUM(e.amount) FROM ExpenseEntity AS e WHERE e.profile.id = :profileId")
    BigDecimal findTotalExpenseByProfileId(@Param("profileId") Long profileId);

    //SELECT * FROM expenses WHERE profileId = ? AND date BETWEEN ? AND ? and name LIKE %?%
    List<ExpenseEntity> findByProfileIdAndDateBetweenAndNameContainingIgnoreCase(
            Long profileId ,
            LocalDate startDate ,
            LocalDate endDate ,
            String keyword ,
            Sort sort
    );

    //SELECT * FROM expenses WHERE profileId = ? AND date BETWEEN ? AND ?
    List<ExpenseEntity> findByProfileIdAndDateBetween(
            Long profileId ,
            LocalDate startDate ,
            LocalDate endDate
    );

    //SELECT * FROM expenses WHERE profileId = ? AND date = ?
    List<ExpenseEntity> findByProfileIdAndDate(Long profileId , LocalDate date);
}