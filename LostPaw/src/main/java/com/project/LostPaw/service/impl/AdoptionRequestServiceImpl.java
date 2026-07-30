package com.project.LostPaw.service.impl;
import com.project.LostPaw.dto.request.AdoptionChangeStatusRequest;
import com.project.LostPaw.dto.request.AdoptionFilterRequest;
import com.project.LostPaw.dto.request.AdoptionSubmissionRequest;
import com.project.LostPaw.dto.response.AdoptionContractResponse;
import com.project.LostPaw.dto.response.AdoptionRequestDetailResponse;
import com.project.LostPaw.dto.response.AdoptionRequestsResponse;
import com.project.LostPaw.dto.response.ApiResponse;
import com.project.LostPaw.entity.PetAd;
import com.project.LostPaw.entity.User;
import com.project.LostPaw.enumeration.AttributeEnum;
import com.project.LostPaw.enumeration.NotificationStatus;
import com.project.LostPaw.projections.AdoptionRequestsProjection;
import com.project.LostPaw.projections.AdoptionContractProjection;
import com.project.LostPaw.enumeration.NotificationType;
import com.project.LostPaw.entity.AdoptionRequest;
import com.project.LostPaw.repository.AdoptionRequestsRepository;
import com.project.LostPaw.repository.PetAdRepository;
import com.project.LostPaw.repository.AdoptionContractRepository;
import com.project.LostPaw.repository.UserRepository;
import com.project.LostPaw.service.AdoptionRequestService;
import com.project.LostPaw.service.UserHistoryService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.beans.BeanUtils.copyProperties;

@Service
public class AdoptionRequestServiceImpl implements AdoptionRequestService {
    @Autowired
    AdoptionRequestsRepository adoptionRequestsRepository;

    @Autowired
    PetAdRepository petAdRepository;

    @Autowired
    UserHistoryService userHistoryService;

    @Autowired
    AdoptionContractRepository adoptionContractRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public ApiResponse sendAdoptionRequest(AdoptionSubmissionRequest request) {
        PetAd petAd = petAdRepository.findById(request.getPetAdId()).orElseThrow();
        petAd.setStatusId(AttributeEnum.AD_IN_ADOPTION.getCode());
        User owner = userRepository.findById(petAd.getUserId()).orElseThrow();

        AdoptionRequest adoptionRequest = new AdoptionRequest();

        copyProperties(request, adoptionRequest);

        adoptionRequest.setCreatedAt(LocalDateTime.now());
        adoptionRequest.setAdOwnerId(petAd.getUserId());
        adoptionRequest.setStatusId(AttributeEnum.ADOPTION_RECEIVED.getCode());

        userHistoryService.addUserHistoryForUser(
                NotificationType.ZAHTJEV_ZA_UDOMLJAVANJEM.getSadrzaj(),
                petAd.getUserId(),
                NotificationType.ZAHTJEV_ZA_UDOMLJAVANJEM.getCode(),
                NotificationType.ZAHTJEV_ZA_UDOMLJAVANJEM.getNotification(),
                NotificationStatus.NOTIFICATION_UNREAD.getCode(),
                request.getPetAdId()
        );

        adoptionRequestsRepository.saveAndFlush(adoptionRequest);
        petAdRepository.saveAndFlush(petAd);

        return new ApiResponse(true, "Uspješno ste poslali zahtjev za udomljavanje korisniku " + owner.getUsername());
    }

    @Override
    public List<AdoptionRequestsResponse> getAllAdoptionRequests(AdoptionFilterRequest request) {
        return adoptionRequestsRepository.findAdoptionRequests(
                request.getFilterBy(),
                request.getUserId(),
                request.getSortDirection(),
                request.getSearch(),
                request.getStatusId()
        ).stream()
                .map(AdoptionRequestsResponse::new)
                .collect(Collectors.toList());
    }

    @Override
    public AdoptionRequestDetailResponse getAdoptionRequestDetails(Long adoptionId, Long userId) {
        AdoptionRequest adoptionRequest = adoptionRequestsRepository
                .findById(adoptionId)
                .orElseThrow(() ->
                        new EntityNotFoundException("Adoption request not found")
                );

        AdoptionRequestDetailResponse response = new AdoptionRequestDetailResponse(adoptionRequest);

        adoptionContractRepository.getByAdoptionId(adoptionId)
                .map(AdoptionContractResponse::new)
                .ifPresent(response::setContract);

        if (adoptionRequest.getAdOwnerId().equals(userId) && !adoptionRequest.isOpen()) {
            adoptionRequest.setOpen(true);
            adoptionRequest.setStatusId(AttributeEnum.ADOPTION_UNDER_REVIEW.getCode());

            adoptionRequestsRepository.saveAndFlush(adoptionRequest);

            userHistoryService.addUserHistoryForUser(
                    NotificationType.ZAHTJEV_U_RAZMATRANJU.getSadrzaj(),
                    adoptionRequest.getUserId(),
                    NotificationType.ZAHTJEV_U_RAZMATRANJU.getCode(),
                    NotificationType.ZAHTJEV_U_RAZMATRANJU.getNotification(),
                    NotificationStatus.NOTIFICATION_UNREAD.getCode(),
                    adoptionRequest.getPetAdId()
            );

            response.setStatusId(AttributeEnum.ADOPTION_UNDER_REVIEW.getCode());
            response.setStatusValue(AttributeEnum.ADOPTION_UNDER_REVIEW.getValue());
        }

        return response;
    }

    @Override
    public ApiResponse changeAdoptionStatus(AdoptionChangeStatusRequest request) {
        AdoptionRequest adoptionRequest = adoptionRequestsRepository.findById(request.getAdoptionId())
                .orElseThrow(() -> new EntityNotFoundException("Adoption request not found"));

        adoptionRequest.setStatusId(request.getStatusId());
        adoptionRequest.setReason(request.getReason());

        AttributeEnum currentStatus = null;
        for (AttributeEnum attr : AttributeEnum.values()) {
            if (attr.getCode().equals(request.getStatusId())) {
                currentStatus = attr;
                break;
            }
        }

        if (currentStatus == null) {
            return new ApiResponse(false, "Status ID nije validan ili nije pronađen.");
        }

        switch (currentStatus) {
            case ADOPTION_REQUEST_APPROVED: // case 63
                userHistoryService.addUserHistoryForUser(
                        NotificationType.ZAHTJEV_ODOBREN.getSadrzaj(), adoptionRequest.getUserId(),
                        NotificationType.ZAHTJEV_ODOBREN.getCode(), NotificationType.ZAHTJEV_ODOBREN.getNotification(),
                        NotificationStatus.NOTIFICATION_UNREAD.getCode(), adoptionRequest.getPetAdId()
                );
                break;

            case ADOPTION_CANCELLED: // case 64
                // Ovdje ide vlasnik oglasa (adOwnerId)
                userHistoryService.addUserHistoryForUser(
                        NotificationType.ZAHTJEV_OTKAZAN.getSadrzaj(), adoptionRequest.getAdOwnerId(),
                        NotificationType.ZAHTJEV_OTKAZAN.getCode(), NotificationType.ZAHTJEV_OTKAZAN.getNotification(),
                        NotificationStatus.NOTIFICATION_UNREAD.getCode(), adoptionRequest.getPetAdId()
                );
                break;

            case ADOPTION_REQUEST_REJECTED: // case 65
                userHistoryService.addUserHistoryForUser(
                        NotificationType.ZAHTJEV_ODBIJEN.getSadrzaj(), adoptionRequest.getUserId(),
                        NotificationType.ZAHTJEV_ODBIJEN.getCode(), NotificationType.ZAHTJEV_ODBIJEN.getNotification(),
                        NotificationStatus.NOTIFICATION_UNREAD.getCode(), adoptionRequest.getPetAdId()
                );
                break;

            case ADOPTION_EVALUATION_IN_PROGRESS: // case 66
                adoptionRequest.setEvaluated(true); // Prevedeno s 'setObavljenaProcjena'
                userHistoryService.addUserHistoryForUser(
                        NotificationType.OBAVLJENA_PROCJENA.getSadrzaj(), adoptionRequest.getUserId(),
                        NotificationType.OBAVLJENA_PROCJENA.getCode(), NotificationType.OBAVLJENA_PROCJENA.getNotification(),
                        NotificationStatus.NOTIFICATION_UNREAD.getCode(), adoptionRequest.getPetAdId()
                );
                break;

            case ADOPTION_FINAL_APPROVED: // case 67
                userHistoryService.addUserHistoryForUser(
                        NotificationType.UDOMLJAVANJE_ODOBRENO.getSadrzaj(), adoptionRequest.getUserId(),
                        NotificationType.UDOMLJAVANJE_ODOBRENO.getCode(), NotificationType.UDOMLJAVANJE_ODOBRENO.getNotification(),
                        NotificationStatus.NOTIFICATION_UNREAD.getCode(), adoptionRequest.getPetAdId()
                );
                break;

            case ADOPTION_FINAL_REJECTED: // case 68
                userHistoryService.addUserHistoryForUser(
                        NotificationType.UDOMLJAVANJE_ODBIJENO.getSadrzaj(), adoptionRequest.getUserId(),
                        NotificationType.UDOMLJAVANJE_ODBIJENO.getCode(), NotificationType.UDOMLJAVANJE_ODBIJENO.getNotification(),
                        NotificationStatus.NOTIFICATION_UNREAD.getCode(), adoptionRequest.getPetAdId()
                );
                break;

            case ADOPTION_SIGNING_CONTRACT:
                if (request.isSignViaApp()) {
                    userHistoryService.addUserHistoryForUser(
                            NotificationType.POTPISIVANJE_UGOVORA.getSadrzaj(), adoptionRequest.getUserId(),
                            NotificationType.POTPISIVANJE_UGOVORA.getCode(), NotificationType.POTPISIVANJE_UGOVORA.getNotification(),
                            NotificationStatus.NOTIFICATION_UNREAD.getCode(), adoptionRequest.getPetAdId()
                    );
                } else {
                    userHistoryService.addUserHistoryForUser(
                            NotificationType.POTPISIVANJE_UZIVO.getSadrzaj(), adoptionRequest.getUserId(),
                            NotificationType.POTPISIVANJE_UZIVO.getCode(), NotificationType.POTPISIVANJE_UZIVO.getNotification(),
                            NotificationStatus.NOTIFICATION_UNREAD.getCode(), adoptionRequest.getPetAdId()
                    );
                }
                break;

            case ADOPTION_FINISHED:
                if (adoptionRequest.getPetAd() != null) {
                    adoptionRequest.getPetAd().setStatusId(AttributeEnum.AD_RESOLVED.getCode());
                }
                userHistoryService.addUserHistoryForUser(
                        NotificationType.ZAVRSEN_PROCES.getSadrzaj(), adoptionRequest.getUserId(),
                        NotificationType.ZAVRSEN_PROCES.getCode(), NotificationType.ZAVRSEN_PROCES.getNotification(),
                        NotificationStatus.NOTIFICATION_UNREAD.getCode(), adoptionRequest.getPetAdId()
                );
                break;

            default:
                break;
        }

        adoptionRequestsRepository.saveAndFlush(adoptionRequest);
        return new ApiResponse(true, "Uspješno ste promijenili status udomljavanja u '" + currentStatus.getValue() + "'");
    }
}
