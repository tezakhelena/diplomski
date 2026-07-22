package com.project.LostPaw.dto.response;

import com.project.LostPaw.projections.VolunteerApplicationProjection;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class VolunteerRequestsResponse {
    private Long volunteerId;
    private Long organizationId;
    private Long applicantId;
    private String volunteerType;
    private LocalDateTime appliedAtDate;
    private Long statusId;
    private String status;
    private String applicantUsername;
    private String organizationUsername;
    private String applicantProfilePicture;
    private String organizationProfilePicture;
    private String applicantCity;
    private String organizationCity;

    public VolunteerRequestsResponse(VolunteerApplicationProjection projection) {
        this.volunteerId = projection.getVolunteerId();
        this.organizationId = projection.getOrganizationId();
        this.applicantId = projection.getApplicantId();
        this.volunteerType = projection.getVolunteerType();
        this.appliedAtDate = projection.getAppliedAtDate();
        this.statusId = projection.getStatusId();
        this.status = projection.getStatus();
        this.applicantUsername = projection.getApplicantUsername();
        this.organizationUsername = projection.getOrganizationUsername();
        this.applicantProfilePicture = projection.getApplicantProfilePicture();
        this.organizationProfilePicture = projection.getOrganizationProfilePicture();
        this.applicantCity = projection.getApplicantCity();
        this.organizationCity = projection.getOrganizationCity();
    }
}
