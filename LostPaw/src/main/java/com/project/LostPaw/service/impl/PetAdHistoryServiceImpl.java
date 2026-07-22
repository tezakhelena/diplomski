package com.project.LostPaw.service.impl;

import com.project.LostPaw.dto.request.ChangeAdStatusRequest;
import com.project.LostPaw.entity.PetAd;
import com.project.LostPaw.entity.Review;
import com.project.LostPaw.enumeration.NotificationStatus;
import com.project.LostPaw.enumeration.NotificationType;
import com.project.LostPaw.entity.PetAdHistory;
import com.project.LostPaw.repository.PetAdRepository;
import com.project.LostPaw.repository.PetAdHistoryRepository;
import com.project.LostPaw.repository.ReviewsRepository;
import com.project.LostPaw.service.UserHistoryService;
import com.project.LostPaw.service.PetAdHistoryService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class PetAdHistoryServiceImpl implements PetAdHistoryService {

    @Autowired
    PetAdHistoryRepository petAdHistoryRepository;

    @Autowired
    UserHistoryService userHistoryService;

    @Autowired
    PetAdRepository petAdRepository;

    @Autowired
    ReviewsRepository reviewsRepository;

    @Override
    @Transactional
    public void changeAdStatus(ChangeAdStatusRequest request) {
        // 1. Sigurno dohvaćanje oglasa iz baze preko novog imena polja (petAdId)
        PetAd petAd = petAdRepository.findById(request.getPetAdId())
                .orElseThrow(() -> new EntityNotFoundException("Pet ad not found with ID: " + request.getPetAdId()));

        // 2. Kreiranje povijesti - copyProperties sada automatski kopira: petAdId, userId, rate, statusId, comment!
        PetAdHistory petAdHistory = new PetAdHistory();
        BeanUtils.copyProperties(request, petAdHistory);

        // Ručno postavljamo samo ono čega nema u requestu
        petAdHistory.setChangedAt(LocalDate.now());

        // Provjera statusa za razlog: 24L (Reported) ili 22L (Blocked)
        if (request.getStatusId().equals(24L) || request.getStatusId().equals(22L)) {
            petAdHistory.setReason(NotificationType.getSadrzajByCode(request.getReasonCode()));
        }

        // 3. Ažuriranje statusa na samom oglasu
        petAd.setStatusId(request.getStatusId());
        petAdRepository.saveAndFlush(petAd);

        // 4. Ako je oglas BLOKIRAN (22L), šalje se obavijest korisniku
        if (request.getStatusId().equals(22L)) {
            userHistoryService.addUserHistory(
                    null,
                    request.getUserId(),
                    request.getUserId(),
                    NotificationType.BLOKIRAN_OGLAS.getCode(),
                    NotificationType.getNotificationByCode(request.getReasonCode(), petAd.getGeneratedName()),
                    NotificationStatus.NOTIFICATION_UNREAD.getCode()
            );
        }

        // 5. Ako je oglas PRONAĐEN (23L), kreira se recenzija (Review)
        if (request.getStatusId().equals(23L)) {
            Review review = new Review();
            BeanUtils.copyProperties(request, review);

            reviewsRepository.saveAndFlush(review);
        }

        petAdHistoryRepository.saveAndFlush(petAdHistory);
    }

    @Override
    @Transactional
    public void changeAdStatusByUserStatus(Long petAdId, Long statusId, Long userId, Integer reasonCode) {
        PetAd petAd = petAdRepository.findById(petAdId)
                .orElseThrow(() -> new EntityNotFoundException("Pet ad not found with ID: " + petAdId));

        // 2. Kreiranje i popunjavanje povijesti oglasa
        PetAdHistory petAdHistory = new PetAdHistory();
        petAdHistory.setChangedAt(LocalDate.now());
        petAdHistory.setPetAdId(petAdId);
        petAdHistory.setStatusId(statusId);
        petAdHistory.setUserId(userId);
        petAdHistory.setReason(NotificationType.getSadrzajByCode(reasonCode));

        // 3. Ažuriranje statusa na samom oglasu
        petAd.setStatusId(statusId);
        petAdRepository.saveAndFlush(petAd);

        petAdHistoryRepository.saveAndFlush(petAdHistory);
    }
}
