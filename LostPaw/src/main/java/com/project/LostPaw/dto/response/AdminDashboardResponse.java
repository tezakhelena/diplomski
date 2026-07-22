package com.project.LostPaw.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminDashboardResponse {
    private Integer activeAdsCount;
    private Integer blockedAdsCount;
    private Integer reportedAdsCount;
    private Integer successfullAdsCount;

    private Integer activeUsersCount;
    private Integer usersPendingCount;
    private Integer usersSuspendedCount;
    
    private List<UserResponse> suspendedUsers;
    private List<PetAdHistoryResponse> blockedAds;
    private List<PetAdHistoryResponse> reportedAds;
}
