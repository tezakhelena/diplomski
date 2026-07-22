package com.project.LostPaw.projections;
import java.math.BigDecimal;
import java.time.LocalDate;

public interface PetAdProjection {
    Long getPetAdId();
    Long getUserId();
    String getPrimaryImage();
    String getCounty();
    String getGender();
    LocalDate getMissingDate();
    String getPetName();
    String getCategory();
    Long getCategoryId();
    String getBreed();
    String getCity();
    Integer getViews();
    BigDecimal getReward();
    String getMaturity();
    String getGeneratedTitle();
    String getNotes();
    LocalDate getCreatedAt();
    Integer getStatusId();
    String getStatus();
    Integer getSpeciesId();
    String getSpecies();
}
