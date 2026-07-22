package com.project.LostPaw.controller;

import com.project.LostPaw.dto.request.*;
import com.project.LostPaw.dto.response.VolunteerApplicationDetailsResponse;
import com.project.LostPaw.dto.response.VolunteerRequestsResponse;
import com.project.LostPaw.projections.VolunteerApplicationProjection;
import com.project.LostPaw.service.VolunteeringService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/volunteering")
@CrossOrigin
public class VolunteeringController {

    @Autowired
    VolunteeringService volunteeringService;

    @PostMapping("/send")
    public boolean sendApplication(@RequestBody VolunteerApplicationRequest request) {
        return volunteeringService.sendApplication(request);
    }

    @PostMapping
    public List<VolunteerRequestsResponse> getApplications(@RequestBody AdoptionFilterRequest request) {
        return volunteeringService.getVolunteerApplications(request);
    }

    @PostMapping("/change-status")
    public boolean changeVolunteeringStatus(@RequestBody VolunteeringChangeStatusRequest request) {
        return volunteeringService.changeApplicationStatus(request.getVolunteeringId(), request.getStatusId());
    }

    @GetMapping("/{volunteeringId}")
    public VolunteerApplicationDetailsResponse getDetails(@PathVariable Long volunteeringId) {
        return volunteeringService.getDetails(volunteeringId);
    }

}
