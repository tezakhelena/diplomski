package com.project.LostPaw.service;

import com.project.LostPaw.dto.request.AdoptionChangeStatusRequest;
import com.project.LostPaw.dto.request.AdoptionFilterRequest;
import com.project.LostPaw.dto.request.AdoptionSubmissionRequest;
import com.project.LostPaw.dto.response.AdoptionRequestDetailResponse;
import com.project.LostPaw.dto.response.AdoptionRequestsResponse;
import com.project.LostPaw.dto.response.ApiResponse;

import java.util.List;

public interface AdoptionRequestService {
    ApiResponse sendAdoptionRequest(AdoptionSubmissionRequest request);
    List<AdoptionRequestsResponse> getAllAdoptionRequests(AdoptionFilterRequest request);
    AdoptionRequestDetailResponse getAdoptionRequestDetails(Long adoptionId, Long korisnikId);
    ApiResponse changeAdoptionStatus(AdoptionChangeStatusRequest request);
}
