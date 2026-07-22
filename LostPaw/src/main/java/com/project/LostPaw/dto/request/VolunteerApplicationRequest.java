package com.project.LostPaw.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VolunteerApplicationRequest {
    private Long organizationId;
    private Long applicantId;
    private String motivation;
    private String availability;
    private Long volunteerType;
    private String experience;
}
