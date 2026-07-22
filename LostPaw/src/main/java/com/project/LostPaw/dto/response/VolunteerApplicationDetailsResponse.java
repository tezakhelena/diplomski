package com.project.LostPaw.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VolunteerApplicationDetailsResponse {
    private Long organizationId;
    private Long applicantId;
    private String availability;
    private String motivation;
    private LocalDateTime appliedAt;
    private Long volunteerType;
    private String experience;
    private Long statusId;
    private String status;
}
