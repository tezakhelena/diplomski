package com.project.LostPaw.service;

import com.project.LostPaw.dto.request.PetAdContactRequest;
import com.project.LostPaw.dto.request.SendMessageRequest;
import com.project.LostPaw.dto.response.PetAdContactDetailResponse;
import com.project.LostPaw.dto.response.PetAdContactResponse;

import java.util.List;

public interface PetAdContactService {
    void sendMessage(SendMessageRequest request);
    List<PetAdContactResponse> getContacts(PetAdContactRequest request);
    void addAnswer(SendMessageRequest request);
    PetAdContactDetailResponse getPetAdContactDetail(Long contactId, Long userId);
}
