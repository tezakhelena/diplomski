package com.project.LostPaw.service.impl;

import com.project.LostPaw.dto.request.AdoptionFilterRequest;
import com.project.LostPaw.dto.request.VolunteerApplicationRequest;
import com.project.LostPaw.dto.response.VolunteerApplicationDetailsResponse;
import com.project.LostPaw.dto.response.VolunteerRequestsResponse;
import com.project.LostPaw.entity.Volunteer;
import com.project.LostPaw.enumeration.AttributeEnum;
import com.project.LostPaw.enumeration.NotificationStatus;
import com.project.LostPaw.enumeration.NotificationType;
import com.project.LostPaw.projections.VolunteerApplicationProjection;
import com.project.LostPaw.repository.VolunteeringRepository;
import com.project.LostPaw.service.UserHistoryService;
import com.project.LostPaw.service.VolunteeringService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VolunteeringServiceImpl implements VolunteeringService {
    @Autowired
    VolunteeringRepository volunteeringRepository;

    @Autowired
    UserHistoryService userHistoryService;

    @Override
    public List<VolunteerRequestsResponse> getVolunteerApplications(AdoptionFilterRequest request) {
        return volunteeringRepository.getVolunteerApplications(
                request.getFilterBy(),
                request.getUserId(),
                request.getSortDirection(),
                request.getSearch(), request.getStatusId(),
                request.getVolunteerType()
        ).stream()
                .map(VolunteerRequestsResponse::new)
                .collect(Collectors.toList());
    }

    @Override
    public boolean sendApplication(VolunteerApplicationRequest request) {
        Volunteer volunteer = new Volunteer();

        volunteer.setAppliedAt(LocalDateTime.now());
        volunteer.setAvailability(request.getAvailability());
        volunteer.setMotivation(request.getMotivation());
        volunteer.setApplicantId(request.getApplicantId());
        volunteer.setOrganizationId(request.getOrganizationId());
        volunteer.setVolunteerType(request.getVolunteerType());
        volunteer.setExperience(request.getExperience());
        volunteer.setStatusId(AttributeEnum.VOLUNTEER_SUBMITTED.getCode());

        volunteeringRepository.saveAndFlush(volunteer);

        userHistoryService.addUserHistoryForOrganization(
                NotificationType.PRIJAVA_ZA_VOLONTIRANJE.getSadrzaj(),
                request.getOrganizationId(),
                NotificationType.PRIJAVA_ZA_VOLONTIRANJE.getCode(),
                NotificationType.PRIJAVA_ZA_VOLONTIRANJE.getNotification(),
                NotificationStatus.NOTIFICATION_UNREAD.getCode()
        );

        return true;
    }

    @Override
    public boolean changeApplicationStatus(Long volunteeringId, Long statusId) {
        Volunteer volunteer = volunteeringRepository.findById(volunteeringId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        volunteer.setStatusId(statusId);

        volunteeringRepository.saveAndFlush(volunteer);

        if(statusId.equals(AttributeEnum.VOLUNTEER_ACCEPTED.getCode())) {
            userHistoryService.addUserHistoryForOrganization(
                    NotificationType.PRIJAVA_ODOBRENA.getSadrzaj(),
                    volunteer.getApplicantId(),
                    NotificationType.PRIJAVA_ODOBRENA.getCode(),
                    NotificationType.PRIJAVA_ODOBRENA.getNotification(),
                    NotificationStatus.NOTIFICATION_UNREAD.getCode()
            );
        } else {
            userHistoryService.addUserHistoryForOrganization(
                    NotificationType.PRIJAVA_ODBIJENA.getSadrzaj(),
                    volunteer.getApplicantId(),
                    NotificationType.PRIJAVA_ODBIJENA.getCode(),
                    NotificationType.PRIJAVA_ODBIJENA.getNotification(),
                    NotificationStatus.NOTIFICATION_UNREAD.getCode()
            );
        }
        return true;
    }

    @Override
    public VolunteerApplicationDetailsResponse getDetails(Long volunteeringId) {
        VolunteerApplicationDetailsResponse response = new VolunteerApplicationDetailsResponse();
        Volunteer volunteer = volunteeringRepository.findById(volunteeringId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        response.setAppliedAt(volunteer.getAppliedAt());
        response.setAvailability(volunteer.getAvailability());
        response.setMotivation(volunteer.getMotivation());
        response.setApplicantId(volunteer.getApplicantId());
        response.setOrganizationId(volunteer.getOrganizationId());
        response.setVolunteerType(volunteer.getVolunteerType());
        response.setExperience(volunteer.getExperience());
        response.setStatusId(volunteer.getStatusId());
        response.setStatus(volunteer.getStatus().getValue());

        return response;
    }
}
