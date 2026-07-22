package com.project.LostPaw.dto.response;
import com.project.LostPaw.entity.PetAdPicture;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PetAdDetailResponse {
    private Long petAdId;
    private Long userId;
    private String username;
    private String userProfilePicture;
    private LocalDate userRegistrationDate;

    private LocalDate createdAt;
    private String generatedTitle;
    private String notes;
    private Integer views;
    private BigDecimal reward;

    private Long categoryId;
    private String category;
    private Long countyId;
    private String county;
    private String city;

    private String email;
    private String phoneNumber;

    private PetDetailResponse petDetails;

    private List<PetAdPicture> adPictures;
    private List<Long> userReportedIds;
    private Long statusId;
}
