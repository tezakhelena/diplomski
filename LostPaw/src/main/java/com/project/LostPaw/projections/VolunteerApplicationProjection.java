package com.project.LostPaw.projections;

import java.time.LocalDateTime;

public interface VolunteerApplicationProjection {
    Long getVolunteerId();
    Long getOrganizationId();
    Long getApplicantId();
    String getVolunteerType();
    LocalDateTime getAppliedAtDate();
    Long getStatusId();
    String getStatus();
    String getApplicantUsername();
    String getOrganizationUsername();
    String getApplicantProfilePicture();
    String getOrganizationProfilePicture();
    String getApplicantCity();
    String getOrganizationCity();
}