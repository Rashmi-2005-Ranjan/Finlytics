package com.finlytics.api.Controller;

import com.finlytics.api.DTO.ExpenseDTO;
import com.finlytics.api.Service.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/expenses")
public class ExpenseController {
    private final ExpenseService expenseService;

    @PostMapping("/add-expense")
    public ResponseEntity<ExpenseDTO> addExpense(@RequestBody ExpenseDTO expenseDTO) {
        ExpenseDTO expense = expenseService.addExpense ( expenseDTO );
        return ResponseEntity.status ( HttpStatus.CREATED ).body ( expense );
    }

    @GetMapping("/current-month-expenses")
    public ResponseEntity<List<ExpenseDTO>> getCurrentMonthExpensesForCurrentUser() {
        List<ExpenseDTO> currentMonthExpensesForCurrentUser = expenseService.getCurrentMonthExpensesForCurrentUser ( );
        return ResponseEntity.ok ( currentMonthExpensesForCurrentUser );
    }

    @DeleteMapping("/delete-expense/{expenseId}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long expenseId) {
        expenseService.deleteExpense ( expenseId );
        return ResponseEntity.noContent ( ).build ( );
    }
}