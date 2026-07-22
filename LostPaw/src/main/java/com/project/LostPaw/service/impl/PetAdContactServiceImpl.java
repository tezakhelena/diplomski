package com.project.LostPaw.service.impl;

import com.project.LostPaw.dto.request.PetAdContactRequest;
import com.project.LostPaw.dto.request.SendMessageRequest;
import com.project.LostPaw.dto.response.AdoptionContractResponse;
import com.project.LostPaw.dto.response.AdoptionRequestDetailResponse;
import com.project.LostPaw.dto.response.PetAdContactDetailResponse;
import com.project.LostPaw.dto.response.PetAdContactResponse;
import com.project.LostPaw.entity.AdoptionRequest;
import com.project.LostPaw.entity.PetAdContact;
import com.project.LostPaw.enumeration.AttributeEnum;
import com.project.LostPaw.enumeration.NotificationStatus;
import com.project.LostPaw.enumeration.NotificationType;
import com.project.LostPaw.repository.PetAdContactRepository;
import com.project.LostPaw.service.PetAdContactService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PetAdContactServiceImpl implements PetAdContactService {
    @Autowired
    PetAdContactRepository petAdContactRepository;
    
    @Override
    public List<PetAdContactResponse> getContacts(PetAdContactRequest request) {
        return  petAdContactRepository.findAllPetAdContacts(
                        request.getUserId(),
                        request.getFilterBy(),
                        request.getSortDirection(),
                        request.getSearch()
                ).stream()
                .map(PetAdContactResponse::new)
                .collect(Collectors.toList());
    }

    @Override
    public void sendMessage(SendMessageRequest request) {

        PetAdContact petAdContact = new PetAdContact();
        petAdContact.setPetAdId(request.getPetAdId());
        petAdContact.setSenderId(request.getSenderId());
        petAdContact.setReceiverId(request.getReceiverId());
        petAdContact.setSubject(request.getSubject());
        petAdContact.setMessage(request.getMessage());
        petAdContact.setCreatedAt(LocalDateTime.now());
         
        petAdContactRepository.saveAndFlush(petAdContact);

    }

    @Override
    public void addAnswer(SendMessageRequest request) {
        PetAdContact petAdContact =  petAdContactRepository.findById(request.getContactId())
                .orElseThrow(() -> new EntityNotFoundException("Message not found with ID: " + request.getContactId()));

        petAdContact.setAnswer(request.getAnswer());
        petAdContact.setRepliedAt(LocalDateTime.now());

        petAdContactRepository.saveAndFlush( petAdContact);
    }

    @Override
    public PetAdContactDetailResponse getPetAdContactDetail(Long contactId, Long userId) {
        PetAdContact petAdContact = petAdContactRepository
                .findById(contactId)
                .orElseThrow(() ->
                        new EntityNotFoundException("Contact not found")
                );

        PetAdContactDetailResponse response = new PetAdContactDetailResponse( petAdContact);

        if ( petAdContact.getReceiverId().equals(userId) && !petAdContact.isRead()) {
             petAdContact.setRead(true);

            petAdContactRepository.saveAndFlush(petAdContact);
        }

        return response;
    }
}
