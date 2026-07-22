package com.project.LostPaw.dto.request;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProfileRequest {
    private Long userId;
    private String firstName;
    private String lastName;
    private Long countyId;
    private String city;
    private Long statusId;
    private Long roleId;
    private String username;
    private String email;
    private String phoneNumber;
    private String oldPassword;
    private String newPassword;
    private boolean contactVisible;
    private String comment;
    private Long businessTypeId;
    private String oib;
    private String website;
}
