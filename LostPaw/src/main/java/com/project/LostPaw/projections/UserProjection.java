package com.project.LostPaw.projections;

import java.time.LocalDate;

public interface UserProjection {
    Long getUserId();
    String getFirstName();
    String getLastName();
    String getUsername();
    String getRoleName();
    String getStatus();
    String getProfilePictureUrl();
    LocalDate getRegistrationDate();
    String getReason();
    Long getStatusId();
    Boolean getPrivateUser();
    String getBusinessUserType();
    String getWebsite();
    String getEmail();
    Long getBusinessTypeId();
}
