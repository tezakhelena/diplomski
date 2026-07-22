package com.project.LostPaw.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HomePageResponse {
    long countSuccessfullAds;
    long countActiveUsers;
    Double averageReview;
    List<BusinessUsersResponse> businessUsers;
}
