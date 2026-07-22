package com.project.LostPaw.dto.response;

import com.project.LostPaw.projections.UserProjection;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private Long userId;
    private String firstName;
    private String lastName;
    private String username;
    private String roleName;
    private String status;
    private Long statusId;
    private String profilePictureUrl;
    private LocalDate registrationDate;
    private String reason;
    private Boolean privateUser;
    private String businessUserType;
    private String website;
    private String email;
    private Long businessTypeId;

    public UserResponse(UserProjection projection) {
        if (projection != null) {
            this.userId = projection.getUserId();
            this.firstName = projection.getFirstName();
            this.lastName = projection.getLastName();
            this.username = projection.getUsername();
            this.roleName = projection.getRoleName();
            this.status = projection.getStatus();
            this.profilePictureUrl = projection.getProfilePictureUrl();
            this.registrationDate = projection.getRegistrationDate();
            this.reason = projection.getReason();
            this.statusId = projection.getStatusId();
            this.privateUser = projection.getPrivateUser();
            this.businessUserType = projection.getBusinessUserType();
            this.website = projection.getWebsite();
            this.email = projection.getEmail();
            this.businessTypeId = projection.getBusinessTypeId();
        }
    }
}
