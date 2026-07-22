package com.project.LostPaw.dto.response;

import com.project.LostPaw.projections.PetAdHistoryProjection;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PetAdHistoryResponse {
    private Long petAdId;
    private LocalDate changedAt;
    private Long statusId;
    private Long userId;
    private String reason;
    private String primaryImage;
    private String generatedName;
    private String username;
    private String comment;
    private String profilePictureUrl;
    private LocalDate latestChangeDate;
    private Integer blockCount;

    public PetAdHistoryResponse(PetAdHistoryProjection projection) {
        if (projection != null) {
            this.petAdId = projection.getPetAdId();
            this.changedAt = projection.getDatumPromjene();
            this.statusId = projection.getStatusId();
            this.userId = projection.getUserId();
            this.reason = projection.getReason();
            this.primaryImage = projection.getPrimaryImage();
            this.generatedName = projection.getGeneratedName();
            this.username = projection.getUsername();
            this.comment = projection.getComment();
            this.profilePictureUrl = projection.getProfilePictureUrl();
            this.latestChangeDate = projection.getLatestChangeDate();
            this.blockCount = projection.getBlockCount();
        }
    }
}
