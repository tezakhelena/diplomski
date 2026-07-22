package com.project.LostPaw.projections;

import java.time.LocalDateTime;

public interface AdoptionContractProjection {
    Integer getContractId();
    String getFileName();
    String getNewFileName();
    LocalDateTime getUploadedAt();
    Integer getSignedStatus();
    String getUsername();
    String getProfilePicture();
}
