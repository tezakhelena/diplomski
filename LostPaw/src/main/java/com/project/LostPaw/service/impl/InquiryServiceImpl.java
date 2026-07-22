package com.project.LostPaw.service.impl;

import com.project.LostPaw.dto.request.InquiryFilterRequest;
import com.project.LostPaw.dto.request.InquiryRequest;
import com.project.LostPaw.dto.response.InquiryResponse;
import com.project.LostPaw.dto.response.UserResponse;
import com.project.LostPaw.entity.Inquiry;
import com.project.LostPaw.enumeration.InquiryType;
import com.project.LostPaw.enumeration.NotificationStatus;
import com.project.LostPaw.enumeration.UserSubject;
import com.project.LostPaw.enumeration.NotificationType;
import com.project.LostPaw.repository.UserRepository;
import com.project.LostPaw.repository.InquiryRepository;
import com.project.LostPaw.service.UserHistoryService;
import com.project.LostPaw.service.InquiryService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InquiryServiceImpl implements InquiryService {
    @Autowired
    InquiryRepository inquiryRepository;

    @Autowired
    UserHistoryService userHistoryService;

    @Autowired
    UserRepository userRepository;

    @Override
    public List<InquiryResponse> getInquiries(InquiryFilterRequest request) {
        return inquiryRepository.findAllInquiries(
                        request.getUserId(),
                        request.getType(),
                        request.getSortDirection(),
                        request.getSearch()
                ).stream()
                .map(InquiryResponse::new)
                .collect(Collectors.toList());
    }

    @Override
    public void addInquiry(InquiryRequest request) {
        InquiryType inquiryType = null;
        for (InquiryType type : InquiryType.values()) {
            if (type.getCode().equals(request.getType())) {
                inquiryType = type;
                break;
            }
        }

        if (inquiryType == null) {
            throw new IllegalArgumentException("Unknown inquiry type code: " + request.getType());
        }

        Inquiry inquiry = new Inquiry();
        inquiry.setQuestion(request.getQuestion());
        inquiry.setType(request.getType());
        inquiry.setUserId(request.getUserId());
        inquiry.setResponderId(request.getResponderId());
        inquiry.setCreatedAt(LocalDateTime.now());
        inquiryRepository.saveAndFlush(inquiry);

        // kome saljemo notifikaciju ovisno o tipu upita
        List<UserResponse> targetUsers = switch (inquiryType) {
            case INQUIRY_TYPE_ADOPTION ->
                    filterUsersByCompanyType(UserSubject.SHELTER_ANIMAL_ASYLUM.getCode()); // Šalji udrugama/azilima

            case INQUIRY_TYPE_PET_HEALTH ->
                    filterUsersByCompanyType(UserSubject.VETERINARY_STATION.getCode()); // Šalji veterinarima

            case INQUIRY_TYPE_PET_CARE ->
                    filterUsersByCompanyType(
                            UserSubject.GROOMING_SALON.getCode(),
                            UserSubject.PET_SHOPS.getCode(),
                            UserSubject.DOG_TRAINING_SCHOOL.getCode());

            case INQUIRY_TYPE_TECHNICAL_SUPPORT ->
                    Collections.emptyList();
        };
        // 4. ČETVRTO: Pošalji notifikacije ciljanim korisnicima (ako ih ima)
        if (targetUsers != null && !targetUsers.isEmpty()) {
            targetUsers.forEach(user -> {
                userHistoryService.addUserHistoryForInquiries(
                        NotificationType.POSLAN_UPIT.getSadrzaj(),
                        user.getUserId(),
                        NotificationType.POSLAN_UPIT.getCode(),
                        NotificationType.POSLAN_UPIT.getNotification(),
                        NotificationStatus.NOTIFICATION_UNREAD.getCode()
                );
            });
        }
    }

    @Override
    public void addAnswer(InquiryRequest request) {
        Inquiry inquiry = inquiryRepository.findById(request.getInquiryId())
                .orElseThrow(() -> new EntityNotFoundException("Inquiry not found with ID: " + request.getInquiryId()));

        inquiry.setAnswer(request.getAnswer());
        inquiry.setRepliedAt(LocalDateTime.now());
        inquiry.setResponderId(request.getResponderId());

        // Pošalji obavijest korisniku koji je postavio pitanje da mu je odgovoreno
        userHistoryService.addUserHistoryForInquiries(
                NotificationType.ODGOVOR_NA_UPIT.getSadrzaj(),
                inquiry.getUserId(),
                NotificationType.ODGOVOR_NA_UPIT.getCode(),
                NotificationType.ODGOVOR_NA_UPIT.getNotification(),
                NotificationStatus.NOTIFICATION_UNREAD.getCode()
        );

        inquiryRepository.saveAndFlush(inquiry);
    }

    private List<UserResponse> filterUsersByCompanyType(Long... codes) {
        List<UserResponse> allFoundUsers = new ArrayList<>();

        for (Long code : codes) {
            List<UserResponse> usersForCode = userRepository.getAllUsers(
                            null, null, null, null, null, false, code, "DESC", null
                    ).stream()
                    .map(UserResponse::new)
                    .toList();

            allFoundUsers.addAll(usersForCode);
        }

        return allFoundUsers;
    }
}
