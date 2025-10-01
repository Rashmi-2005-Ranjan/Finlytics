package com.finlytics.api.Controller;

import com.finlytics.api.DTO.IncomeDTO;
import com.finlytics.api.Service.IncomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/incomes")
public class IncomeController {
    private final IncomeService incomeService;

    @PostMapping("/add-income")
    public ResponseEntity<IncomeDTO> addIncome(@RequestBody IncomeDTO incomeDTO) {
        IncomeDTO income = incomeService.addIncome ( incomeDTO );
        return ResponseEntity.status ( HttpStatus.CREATED ).body ( income );
    }

    @GetMapping("/current-month-incomes")
    public ResponseEntity<List<IncomeDTO>> getCurrentMonthExpensesForCurrentUser() {
        List<IncomeDTO> currentMonthIncomesForCurrentUser = incomeService.getCurrentMonthIncomesForCurrentUser ( );
        return ResponseEntity.ok ( currentMonthIncomesForCurrentUser );
    }

    @DeleteMapping("/delete-income/{incomeId}")
    public ResponseEntity<Void> deleteIncome(@PathVariable Long incomeId) {
        incomeService.deleteIncome ( incomeId );
        return ResponseEntity.noContent ( ).build ( );
    }
}