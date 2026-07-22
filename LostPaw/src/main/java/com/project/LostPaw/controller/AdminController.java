package com.project.LostPaw.controller;

import com.project.LostPaw.dto.response.AdminDashboardResponse;
import com.project.LostPaw.dto.response.BlockedUserAdResponse;
import com.project.LostPaw.dto.response.ChartStatisticsResponse;
import com.project.LostPaw.dto.response.UserReportedAdResponse;
import com.project.LostPaw.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminController {
    @Autowired
    AdminService adminService;

    @PostMapping
    public ResponseEntity<AdminDashboardResponse> getStatistics(){
        return ResponseEntity.ok(adminService.getStatistics());
    }

    @PostMapping("/chart-statistics")
    public ResponseEntity<ChartStatisticsResponse> getChartStatistics() {
        return ResponseEntity.ok(adminService.getChartStatistics());
    }

    @GetMapping("/reports/{petAdId}")
    public ResponseEntity<List<UserReportedAdResponse>> getUserReportedAds(@PathVariable Long petAdId){
        return ResponseEntity.ok(adminService.getUserReportedAds(petAdId));
    }

    @GetMapping("/petAds/{userId}")
    public ResponseEntity<List<BlockedUserAdResponse>> getAdsOfBlockedUser(@PathVariable Long userId){
        return ResponseEntity.ok(adminService.getAdsOfBlockedUser(userId));
    }
}
