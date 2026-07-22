package com.project.LostPaw.dto.response;

import com.project.LostPaw.projections.AdoptionRequestsProjection;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AdoptionRequestsResponse {
    private Long adoptionId;
    private Long petAdId;
    private LocalDateTime createdAt;

    private Long applicantId;
    private String applicantUsername;
    private String applicantProfilePicture;

    private Long adOwnerId;
    private String adOwnerUsername;
    private String adOwnerProfilePicture;

    private Integer statusId;
    private String statusValue;

    public AdoptionRequestsResponse(AdoptionRequestsProjection projection) {
        this.adoptionId = projection.getAdoptionId();
        this.petAdId = projection.getPetAdId();
        this.createdAt = projection.getCreatedAt();
        this.applicantId = projection.getApplicantId();
        this.applicantUsername = projection.getApplicantUsername();
        this.applicantProfilePicture = projection.getApplicantProfilePicture();
        this.adOwnerId = projection.getAdOwnerId();
        this.adOwnerUsername = projection.getAdOwnerUsername();
        this.adOwnerProfilePicture = projection.getAdOwnerProfilePicture();
        this.statusId = projection.getStatusId();
        this.statusValue = projection.getStatusValue();
    }
}
