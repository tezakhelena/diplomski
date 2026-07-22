package com.project.LostPaw.projections;

import java.time.LocalDate;

public interface PetAdHistoryProjection {
    Long getPetAdId();
    LocalDate getDatumPromjene();
    Long getStatusId();
    String getStatusValue();
    Long getUserId();
    String getReason();
    String getPrimaryImage();
    String getGeneratedName();
    String getUsername();
    String getComment();
    String getProfilePictureUrl();
    LocalDate getLatestChangeDate();
    Integer getBlockCount();
}
