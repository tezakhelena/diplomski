package com.project.LostPaw.service;

import com.project.LostPaw.dto.request.AdoptionFilterRequest;
import com.project.LostPaw.dto.request.VolunteerApplicationRequest;
import com.project.LostPaw.dto.response.VolunteerApplicationDetailsResponse;
import com.project.LostPaw.dto.response.VolunteerRequestsResponse;
import com.project.LostPaw.projections.VolunteerApplicationProjection;

import java.util.List;

public interface VolunteeringService {
    List<VolunteerRequestsResponse> getVolunteerApplications(AdoptionFilterRequest request);
    boolean sendApplication(VolunteerApplicationRequest request);
    boolean changeApplicationStatus(Long volunteeringId, Long statusId);
    VolunteerApplicationDetailsResponse getDetails(Long volunteeringId);
}
