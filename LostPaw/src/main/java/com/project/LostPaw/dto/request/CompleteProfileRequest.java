package com.project.LostPaw.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompleteProfileRequest {
    private Long userId;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private Long countyId;
    private String city;
    private boolean contactVisible;
    private Long businessTypeId;
    private String oib;
    private String website;
}
