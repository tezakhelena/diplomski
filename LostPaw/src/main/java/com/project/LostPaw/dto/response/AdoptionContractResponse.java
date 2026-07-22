package com.project.LostPaw.dto.response;

import com.project.LostPaw.projections.AdoptionContractProjection;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AdoptionContractResponse {
    Integer contractId;
    String fileName;
    String newFileName;
    LocalDateTime uploadedAt;
    Integer signedStatus;
    String username;
    String profilePicture;

    public AdoptionContractResponse(AdoptionContractProjection projection){
        this.contractId = projection.getContractId();
        this.fileName = projection.getFileName();
        this.newFileName = projection.getNewFileName();
        this.uploadedAt = projection.getUploadedAt();
        this.signedStatus = projection.getSignedStatus();
        this.username = projection.getUsername();
        this.profilePicture = projection.getProfilePicture();
    }
}
