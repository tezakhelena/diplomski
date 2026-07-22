package com.project.LostPaw.projections;

import java.time.LocalDateTime;

public interface AdoptionRequestsProjection {
    Long getAdoptionId();
    Long getPetAdId();
    LocalDateTime getCreatedAt();

    // Podnositelj (Applicant)
    Long getApplicantId();
    String getApplicantUsername();
    String getApplicantProfilePicture();

    // Oglašivač (Ad Owner)
    Long getAdOwnerId();
    String getAdOwnerUsername();
    String getAdOwnerProfilePicture();

    // Status (Iz Attribute tablice)
    Integer getStatusId();
    String getStatusValue();
}
