package com.project.LostPaw.mapper;

import com.project.LostPaw.dto.response.PetAdDetailResponse;
import com.project.LostPaw.dto.response.PetDetailResponse;
import com.project.LostPaw.entity.Pet;
import com.project.LostPaw.entity.PetAd;
import com.project.LostPaw.entity.PetAdPicture;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PetAdMapper {
    public PetAdDetailResponse toDetailResponse(PetAd entity, List<PetAdPicture> pictures, List<Long> reportedIds) {
        if (entity == null) return null;

        PetAdDetailResponse dto = new PetAdDetailResponse();

        // 1. Osnovni podaci s oglasa
        dto.setPetAdId(entity.getId());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setGeneratedTitle(entity.getGeneratedName());
        dto.setNotes(entity.getNotes());
        dto.setViews(entity.getViews());
        dto.setReward(entity.getReward());
        dto.setCategoryId(entity.getCategoryId());
        dto.setCountyId(entity.getCountyId());
        dto.setCity(entity.getCity());
        dto.setAdPictures(pictures);
        dto.setUserReportedIds(reportedIds);
        dto.setStatusId(entity.getStatusId());

        // 2. Mapiranje kategorije i županije
        if (entity.getCategory() != null) dto.setCategory(entity.getCategory().getValue());
        if (entity.getCounty() != null) dto.setCounty(entity.getCounty().getName());

        // 3. Mapiranje korisnika i provjera vidljivosti kontakta
        if (entity.getUser() != null) {
            dto.setUserId(entity.getUser().getId());
            dto.setUsername(entity.getUser().getUsername());
            dto.setUserProfilePicture(entity.getUser().getProfilePictureUrl());
            dto.setUserRegistrationDate(entity.getUser().getRegistrationDate());

            if (entity.getUser().isContactVisible()) {
                dto.setEmail(entity.getUser().getEmail());
                dto.setPhoneNumber(entity.getUser().getPhoneNumber());
            }
        }

        // 4. Mapiranje ljubimca (pozivamo drugu, manju metodu ispod!)
        if (entity.getPet() != null) {
            dto.setPetDetails(toPetDetailResponse(entity.getPet()));
        }

        return dto;
    }

    // Pomoćna metoda isključivo za ljubimca - drži kod preglednim
    private PetDetailResponse toPetDetailResponse(Pet pet) {
        PetDetailResponse petDto = new PetDetailResponse();

        petDto.setName(pet.getName());
        petDto.setMissingDate(pet.getMissingDate());
        petDto.setGender(pet.getGender());
        petDto.setMaturity(pet.getMaturity());
        petDto.setFurColor(pet.getFurColor());

        // Relacije ljubimca (ID-ovi i vrijednosti)
        petDto.setBreedId(pet.getBreedId());
        if (pet.getBreed() != null) petDto.setBreed(pet.getBreed().getName());

        petDto.setSpeciesId(pet.getSpeciesId());
        if (pet.getSpecies() != null) petDto.setSpecies(pet.getSpecies().getValue());

        petDto.setStatusId(pet.getStatusId());
        if (pet.getStatus() != null) petDto.setStatus(pet.getStatus().getValue());

        return petDto;
    }
}
