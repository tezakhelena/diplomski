package com.project.LostPaw.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.LostPaw.dto.request.*;
import com.project.LostPaw.dto.response.ApiResponse;
import com.project.LostPaw.dto.response.PetAdDetailResponse;
import com.project.LostPaw.dto.response.PetAdResponse;
import com.project.LostPaw.dto.response.UserResponse;
import com.project.LostPaw.entity.Pet;
import com.project.LostPaw.entity.PetAd;
import com.project.LostPaw.enumeration.NotificationStatus;
import com.project.LostPaw.enumeration.NotificationType;
import com.project.LostPaw.repository.UserRepository;
import com.project.LostPaw.repository.PetRepository;
import com.project.LostPaw.repository.PetAdRepository;
import com.project.LostPaw.service.UserHistoryService;
import com.project.LostPaw.service.PetAdService;
import com.project.LostPaw.service.PetAdHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/pet_ads")
@CrossOrigin
public class PetAdController {
    @Autowired
    PetAdService petAdService;

    @Autowired
    PetAdRepository petAdRepository;

    @Autowired
    UserHistoryService userHistoryService;

    @Autowired
    PetAdHistoryService petAdHistoryService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PetRepository petRepository;

    @PostMapping
    public ResponseEntity<List<PetAdResponse>> getAds(@RequestBody FilterAdsRequest request) {
        return ResponseEntity.ok(petAdService.getAds(request));
    }

    @GetMapping("/details/{petAdId}")
    public ResponseEntity<PetAdDetailResponse> getPetAdDetails(@PathVariable Long petAdId) {
        return ResponseEntity.ok(petAdService.getPetAdDetails(petAdId));
    }

    @GetMapping("/latest")
    public ResponseEntity<List<PetAdResponse>> getLatestAds() {
        return ResponseEntity.ok(petAdService.getAdsFromLast7Days());
    }

    @PutMapping("/update")
    public ResponseEntity<ApiResponse> updateAd(@RequestBody SaveAdRequest request) {
        try {
            petAdService.updateAd(request);
            return ResponseEntity.ok(new ApiResponse(true, "Advertisement updated successfully."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Failed to update advertisement."));
        }
    }

    @PostMapping(value = "/create")
    public ResponseEntity<?> createAd(@RequestPart("adRequest") String adRequestJson,
                                      @RequestPart(value = "images", required = false) MultipartFile[] images) throws IOException {

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.findAndRegisterModules(); // Za LocalDate podršku
        SaveAdRequest request = objectMapper.readValue(adRequestJson, SaveAdRequest.class);

        List<PetAdResponse> similarAds = petAdService.checkSimilarAdsBeforeCreating(request);

        if (!request.isForceCreate() && !similarAds.isEmpty()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(similarAds);
        }

        Long petId = petAdService.addPetData(request);
        PetAd ad = petAdService.createAd(request, petId);

        List<UserResponse> targetUsers = userRepository.getUsersFromCountyAndCity(ad.getCountyId(), ad.getCity())
                .stream()
                .map(UserResponse::new)
                .toList();
        petAdService.addImages(ad.getId(), images);

        Pet pet = petRepository.findById(petId).orElseThrow(() -> new RuntimeException("Pet not found"));
        String generatedTitle = ad.getId() + "-" + ad.getCategoryId() + "-" + ad.getCountyId() + pet.getBreedId();

        ad.setGeneratedName(generatedTitle);
        petAdRepository.saveAndFlush(ad);

        // Povijest i obavijesti za županije
        targetUsers.forEach(user -> {
            if (!request.getUserId().equals(user.getUserId())) {
                userHistoryService.addUserHistoryForUser(null, user.getUserId(), NotificationType.KORISNIK_ZUPANIJA.getCode(), NotificationType.KORISNIK_ZUPANIJA.getNotification(), NotificationStatus.NOTIFICATION_UNREAD.getCode(), ad.getId());
            }
        });

        // Povijest za slične oglase
        similarAds.forEach(similarAd -> {
            if (!request.getUserId().equals(similarAd.getUserId())) {
                userHistoryService.addUserHistoryForUser(null, similarAd.getUserId(), NotificationType.SLICNI_OGLAS.getCode(), NotificationType.SLICNI_OGLAS.getNotification(), NotificationStatus.NOTIFICATION_UNREAD.getCode(), ad.getId());
            }
        });

        userHistoryService.addUserHistory(NotificationType.OBAVIJEST.getFormattedMessageNaslovOglasa(generatedTitle), ad.getUserId(), request.getUserId(), NotificationType.OBAVIJEST.getCode(), NotificationType.OBAVIJEST.getFormattedNotificationOglas(generatedTitle), NotificationStatus.NOTIFICATION_UNREAD.getCode());

        return ResponseEntity.ok(new ApiResponse(true, "Advertisement created successfully with ID: " + ad.getId()));
    }

    @PostMapping("/report")
    public ResponseEntity<ApiResponse> reportAd(@RequestBody ReportAdRequest request) {
        try {
            petAdService.reportAd(request);
            return ResponseEntity.ok(new ApiResponse(true, "Advertisement reported successfully."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Failed to report advertisement."));
        }
    }

    @DeleteMapping("/delete/{petAdId}")
    public ResponseEntity<ApiResponse> deleteAd(@PathVariable Long petAdId) {
        boolean isDeleted = petAdService.deleteAd(petAdId);
        if (isDeleted) {
            return ResponseEntity.ok(new ApiResponse(true, "Advertisement deleted successfully."));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, "Advertisement not found."));
        }
    }

    @GetMapping("/counts-by-species")
    public ResponseEntity<List<Object[]>> getCountByPetType() {
        return ResponseEntity.ok(petAdRepository.countByPetType());
    }

    @PostMapping("/change-status")
    public ResponseEntity<ApiResponse> changeAdStatus(@RequestBody ChangeAdStatusRequest request) {
        petAdHistoryService.changeAdStatus(request);
        return ResponseEntity.ok(new ApiResponse(true, "Status changed successfully."));
    }
}
