package com.finlytics.api.Controller;

import com.finlytics.api.Service.DashBoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashBoardService dashBoardService;

    @GetMapping("/data")
    public ResponseEntity<Map<String, Object>> dashboardData() {
        Map<String, Object> dashboardData = dashBoardService.getDashBoardData ( );
        return ResponseEntity.ok ( dashboardData );
    }
}