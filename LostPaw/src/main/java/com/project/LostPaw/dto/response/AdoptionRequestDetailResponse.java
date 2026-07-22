package com.project.LostPaw.dto.response;

import com.project.LostPaw.entity.AdoptionRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdoptionRequestDetailResponse {
    private Long id;
    private Long userId;
    private Long petAdId;
    private Long adOwnerId;
    private LocalDateTime createdAt;
    private String environment;
    private String reason;
    private String experience;
    private String householdMembers;
    private String schedule;
    private String allergies;
    private String address;
    private Long statusId;
    private String statusValue;
    private AdoptionContractResponse contract;

    public AdoptionRequestDetailResponse(AdoptionRequest entity) {
        this.id = entity.getId();
        this.userId = entity.getUserId();
        this.petAdId = entity.getPetAdId();
        this.adOwnerId = entity.getAdOwnerId();
        this.createdAt = entity.getCreatedAt();
        this.environment = entity.getEnvironment();
        this.reason = entity.getReason();
        this.experience = entity.getExperience();
        this.householdMembers = entity.getHouseholdMembers();
        this.schedule = entity.getSchedule();
        this.allergies = entity.getAllergies();
        this.address = entity.getAddress();
        this.statusId = entity.getStatusId();

        if (entity.getStatus() != null) {
            this.statusValue = entity.getStatus().getValue();
        }
    }
}
