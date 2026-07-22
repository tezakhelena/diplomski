package com.project.LostPaw.dto.response;

import com.project.LostPaw.projections.PetAdProjection;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PetAdResponse {
    private Long petAdId;
    private Long userId;
    private String primaryImage;
    private String county;
    private String gender;
    private LocalDate missingDate;
    private String petName;
    private String category;
    private Long categoryId;
    private String breed;
    private String city;
    private Integer views;
    private BigDecimal reward;
    private String maturity;
    private String generatedTitle;
    private String notes;
    private LocalDate createdAt;
    private String status;
    private Integer statusId;
    private Integer speciesId;
    private String species;

    public PetAdResponse(PetAdProjection projection) {
        if (projection != null) {
            this.petAdId = projection.getPetAdId();
            this.userId = projection.getUserId();
            this.primaryImage = projection.getPrimaryImage();
            this.county = projection.getCounty();
            this.gender = projection.getGender();
            this.missingDate = projection.getMissingDate();
            this.petName = projection.getPetName();
            this.category = projection.getCategory();
            this.categoryId = projection.getCategoryId();
            this.breed = projection.getBreed();
            this.city = projection.getCity();
            this.views = projection.getViews();
            this.reward = projection.getReward();
            this.maturity = projection.getMaturity();
            this.generatedTitle = projection.getGeneratedTitle();
            this.notes = projection.getNotes();
            this.createdAt = projection.getCreatedAt();
            this.status = projection.getStatus();
            this.statusId = projection.getStatusId();
            this.species = projection.getSpecies();
            this.speciesId = projection.getSpeciesId();
        }
    }
}
