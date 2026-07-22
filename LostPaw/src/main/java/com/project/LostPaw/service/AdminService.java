package com.project.LostPaw.service;

import com.project.LostPaw.dto.response.AdminDashboardResponse;
import com.project.LostPaw.dto.response.BlockedUserAdResponse;
import com.project.LostPaw.dto.response.ChartStatisticsResponse;
import com.project.LostPaw.dto.response.UserReportedAdResponse;

import java.util.List;

public interface AdminService {
    AdminDashboardResponse getStatistics();
    ChartStatisticsResponse getChartStatistics();
    List<UserReportedAdResponse> getUserReportedAds(Long petAdId);
    List<BlockedUserAdResponse> getAdsOfBlockedUser(Long userId);
}
