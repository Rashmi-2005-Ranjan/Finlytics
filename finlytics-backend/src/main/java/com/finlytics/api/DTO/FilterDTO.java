package com.finlytics.api.DTO;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class FilterDTO {
    private String type;
    private LocalDate startDate; // Start date in ISO format (e.g., "2023-01-01")
    private LocalDate endDate;   // End date in ISO format (e.g., "2023-01-31")
    private String keyword;
    private String sortField; // Field to sort by (e.g., "date", "amount")
    private String sortOrder; // "asc" for ascending, "desc" for descending
}
