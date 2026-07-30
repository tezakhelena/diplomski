package com.project.LostPaw.service.impl;
import com.project.LostPaw.dto.request.FilterAdsRequest;
import com.project.LostPaw.dto.request.ReportAdRequest;
import com.project.LostPaw.dto.request.SaveAdRequest;
import com.project.LostPaw.dto.response.PetAdDetailResponse;
import com.project.LostPaw.dto.response.PetAdResponse;
import com.project.LostPaw.enumeration.NotificationStatus;
import com.project.LostPaw.enumeration.NotificationType;
import com.project.LostPaw.entity.*;
import com.project.LostPaw.mapper.PetAdMapper;
import com.project.LostPaw.repository.*;
import com.project.LostPaw.service.FileStorageService;
import com.project.LostPaw.service.UserHistoryService;
import com.project.LostPaw.service.PetAdService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class PetAdServiceImpl implements PetAdService {
    @Autowired
    PetAdRepository petAdRepository;

    @Autowired
    PetAdPicturesRepository petAdPicturesRepository;

    @Autowired
    PetRepository petRepository;

    @Autowired
    PetAdHistoryRepository petAdHistoryRepository;

    @Autowired
    UserHistoryService userHistoryService;

    @Autowired
    PetAdMapper petAdMapper;

    @Autowired
    FileStorageService fileStorageService;

    @Override
    public List<PetAdResponse> getAds(FilterAdsRequest request) {
        return petAdRepository.findAllPetAds(
                request.getStatusId(), request.getCategoryId(), request.getSpeciesId(),
                request.getCountyId(), null, request.getUserId(), request.getBreedId(),
                request.getGender(), request.getMaturity(), request.getSortDirection(), request.getSearch()
        ).stream().map(PetAdResponse::new).collect(Collectors.toList());
    }

    @Override
    public List<PetAdResponse> checkSimilarAdsBeforeCreating(SaveAdRequest request) {
        // Logika zamjene kategorije 41 traži 42 i obrnuto preko Enuma
        Long oppositeCategory = Objects.equals(request.getCategoryId(), 41L) ? 42L : 41L;
        return petAdRepository.findAllPetAds(
                null, oppositeCategory, request.getSpeciesId(), request.getCountyId(),
                null, null, request.getBreedId(), request.getGender(), request.getMaturity(), "DESC", null
        ).stream().map(PetAdResponse::new).collect(Collectors.toList());
    }

    @Override
    public List<PetAdResponse> getAdsFromLast7Days() {
        return petAdRepository.findPetAdsByLast7Days().stream()
                .map(PetAdResponse::new).collect(Collectors.toList());
    }

    @Override
    public Long addPetData(SaveAdRequest request) {
        Pet pet = new Pet();
        pet.setMissingDate(request.getMissingDate());
        pet.setStatusId(request.getStatusId() == null ? 31L : request.getStatusId());
        pet.setSpeciesId(request.getSpeciesId());
        pet.setGender(request.getGender());
        pet.setMaturity(request.getMaturity());
        pet.setBreedId(request.getBreedId() == null ? 41L : request.getBreedId());
        pet.setFurColor(request.getFurColor());
        pet.setName(request.getPetName());

        return petRepository.saveAndFlush(pet).getId();
    }

    @Override
    public PetAd createAd(SaveAdRequest request, Long petId) {
        PetAd petAd = new PetAd();
        petAd.setCategoryId(request.getCategoryId());
        petAd.setUserId(request.getUserId());
        petAd.setCreatedAt(LocalDate.now());
        petAd.setStatusId(21L);
        petAd.setCountyId(request.getCountyId());
        petAd.setCity(request.getCity());
        petAd.setNotes(request.getNotes());
        petAd.setPetId(petId);
        petAd.setReward(request.getReward());
        petAd.setViews(0);

        return petAdRepository.saveAndFlush(petAd);
    }

    @Override
    public void addImages(Long petAdId, MultipartFile[] images) throws IOException {

        if (images == null || images.length == 0) {
            return;
        }

        for (int i = 0; i < images.length; i++) {
            MultipartFile image = images[i];

            if (image == null || image.isEmpty()) {
                continue;
            }

            String filenameWithoutExtension = petAdId + "_" + (i + 1);

            String savedFilename = fileStorageService.saveImage(image, filenameWithoutExtension);

            PetAdPicture picture = new PetAdPicture();
            picture.setPetAdId(petAdId);
            picture.setUrl(savedFilename);
            picture.setFirst(i == 0);

            petAdPicturesRepository.saveAndFlush(picture);
        }
    }

    @Override
    public PetAdDetailResponse getPetAdDetails(Long petAdId) {
        PetAd petAd = petAdRepository.findById(petAdId)
                .orElseThrow(() -> new EntityNotFoundException("Pet ad not found with ID: " + petAdId));

        incrementViews(petAd);

        List<PetAdPicture> pictures = petAdPicturesRepository.findByPetAdId(petAdId);
        List<Long> reportedUserIds = petAdHistoryRepository.findReportedUserIdsByPetAdId(petAdId);

        // Samo proslijediš podatke kroz tvoj mapper
        PetAdDetailResponse response = petAdMapper.toDetailResponse(petAd, pictures, reportedUserIds);

        petAdRepository.saveAndFlush(petAd);
        return response;
    }

    private void incrementViews(PetAd petAd) {
        if (petAd.getViews() == null) {
            petAd.setViews(1);
        } else {
            petAd.setViews(petAd.getViews() + 1);
        }

        if (Objects.equals(petAd.getViews(), 100)) {
            userHistoryService.addUserHistory(
                    NotificationType.PREGLEDI.getFormattedMessageNaslovOglasa(petAd.getGeneratedName()),
                    petAd.getUserId(), null, NotificationType.PREGLEDI.getCode(),
                    NotificationType.PREGLEDI.getFormattedNotificationOglas(petAd.getGeneratedName()),
                    NotificationStatus.NOTIFICATION_UNREAD.getCode()
            );
        }
    }

    @Override
    public void reportAd(ReportAdRequest request) {
        PetAd petAd = petAdRepository.findById(request.getPetAdId())
                .orElseThrow(() -> new EntityNotFoundException("Ad not found"));

        PetAdHistory history = new PetAdHistory();
        history.setPetAdId(request.getPetAdId());
        history.setComment(request.getComment());
        history.setStatusId(24L);
        history.setChangedAt(LocalDate.now());
        history.setUserId(request.getUserId());

        petAd.setStatusId(24L);

        petAdHistoryRepository.saveAndFlush(history);
        petAdRepository.saveAndFlush(petAd);

        userHistoryService.addUserHistory(
                NotificationType.PRIJAVLJEN_OGLAS.getFormattedMessageNaslovOglasa(petAd.getGeneratedName()),
                3L, request.getUserId(), NotificationType.PRIJAVLJEN_OGLAS.getCode(),
                NotificationType.PRIJAVLJEN_OGLAS.getFormattedNotificationOglas(petAd.getGeneratedName()),
                NotificationStatus.NOTIFICATION_UNREAD.getCode()
        );
    }

    @Override
    public void updateAd(SaveAdRequest request) {
        PetAd petAd = petAdRepository.findById(request.getPetAdId())
                .orElseThrow(() -> new EntityNotFoundException("Ad not found"));
        Pet pet = petRepository.findById(petAd.getPetId())
                .orElseThrow(() -> new EntityNotFoundException("Pet not found"));

        petAd.setCountyId(request.getCountyId() == null ? petAd.getCountyId() : request.getCountyId());
        petAd.setCity(request.getCity() == null ? petAd.getCity() : request.getCity());
        petAd.setNotes(request.getNotes() == null ? petAd.getNotes() : request.getNotes());
        petAd.setReward(request.getReward() == null ? petAd.getReward() : request.getReward());

        pet.setBreedId(request.getBreedId() == null ? pet.getBreedId() : request.getBreedId());
        pet.setMaturity(request.getMaturity() == null ? pet.getMaturity() : request.getMaturity());
        pet.setStatusId(request.getStatusId() == null ? pet.getStatusId() : request.getStatusId());
        pet.setName(request.getPetName() == null ? pet.getName() : request.getPetName());
        pet.setFurColor(request.getFurColor() == null ? pet.getFurColor() : request.getFurColor());
        pet.setGender(request.getGender() == null ? pet.getGender() : request.getGender());
        pet.setMissingDate(request.getMissingDate() == null ? pet.getMissingDate() : request.getMissingDate());

        petRepository.saveAndFlush(pet);
        petAdRepository.saveAndFlush(petAd);
    }

    @Override
    public boolean deleteAd(Long petAdId) {
        if (petAdRepository.existsById(petAdId)) {
            petAdRepository.deleteById(petAdId);
            return true;
        }
        return false;
    }
}
