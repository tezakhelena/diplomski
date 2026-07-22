package com.project.LostPaw.controller;

import com.project.LostPaw.dto.request.AdoptionChangeStatusRequest;
import com.project.LostPaw.dto.request.AdoptionFilterRequest;
import com.project.LostPaw.dto.request.AdoptionSubmissionRequest;
import com.project.LostPaw.dto.response.AdoptionRequestDetailResponse;
import com.project.LostPaw.dto.response.AdoptionRequestsResponse;
import com.project.LostPaw.dto.response.ApiResponse;
import com.project.LostPaw.service.AdoptionRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/adoption_request")
@CrossOrigin
public class AdoptionController {

    @Autowired
    AdoptionRequestService adoptionRequestService;

    @PostMapping("/send_adoption_request")
    public ApiResponse sendAdoptionRequest(@RequestBody AdoptionSubmissionRequest request) {
        return adoptionRequestService.sendAdoptionRequest(request);
    }

    @PostMapping("/adoption_requests")
    public List<AdoptionRequestsResponse> allAdoptionRequests(@RequestBody AdoptionFilterRequest request) {
        return adoptionRequestService.getAllAdoptionRequests(request);
    }

    @GetMapping("/{adoptionId}/{userId}")
    public AdoptionRequestDetailResponse getAdoptionRequestDetails(@PathVariable Long adoptionId, @PathVariable Long userId) {
        return adoptionRequestService.getAdoptionRequestDetails(adoptionId, userId);
    }

    @PostMapping("/change_adoption_status")
    public ApiResponse changeAdoptionStatus(@RequestBody AdoptionChangeStatusRequest request) {
        return adoptionRequestService.changeAdoptionStatus(request);
    }
}
