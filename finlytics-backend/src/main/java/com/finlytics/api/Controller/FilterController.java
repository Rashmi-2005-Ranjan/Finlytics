package com.finlytics.api.Controller;

import com.finlytics.api.DTO.ExpenseDTO;
import com.finlytics.api.DTO.FilterDTO;
import com.finlytics.api.DTO.IncomeDTO;
import com.finlytics.api.Service.ExpenseService;
import com.finlytics.api.Service.IncomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/filter")
public class FilterController {
    private final ExpenseService expenseService;
    private final IncomeService incomeService;

    @PostMapping("/transactions")
    public ResponseEntity<?> filterTransactions(@RequestBody FilterDTO filterDTO) {
        //Preparing The Data Or Validation
        LocalDate startDate = filterDTO.getStartDate ( ) != null ? filterDTO.getStartDate ( ) : LocalDate.MIN;
        LocalDate endDate = filterDTO.getEndDate ( ) != null ? filterDTO.getEndDate ( ) : LocalDate.now ( );
        String keyWord = filterDTO.getKeyword ( ) != null ? filterDTO.getKeyword ( ) : "";
        String sortField = filterDTO.getSortField ( ) != null ? filterDTO.getSortField ( ) : "date";
        Sort.Direction direction = "desc".equalsIgnoreCase ( filterDTO.getSortOrder ( ) ) ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sort = Sort.by ( direction , sortField );
        //Determine Type And Call The Respective Service
        if ("income".equalsIgnoreCase ( filterDTO.getType ( ) )) {
            List<IncomeDTO> incomeDTOS = incomeService.filterIncomes ( startDate , endDate , keyWord , sort );
            return ResponseEntity.ok ( incomeDTOS );
        } else if ("expense".equalsIgnoreCase ( filterDTO.getType ( ) )) {
            List<ExpenseDTO> expenseDTOS = expenseService.filterExpenses ( startDate , endDate , keyWord , sort );
            return ResponseEntity.ok ( expenseDTOS );
        } else {
            return ResponseEntity.badRequest ( ).body ( "Invalid Type. Must Be 'income' or 'expense'" );
        }
    }
}
