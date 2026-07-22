package com.project.LostPaw.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdoptionSubmissionRequest {
    private Long userId;
    private String environment;
    private String reason;
    private String experience;
    private Long petAdId;       // Ili samo 'petAdId' ako ti je tako lakše pratiti
    private String householdMembers; // Zamjena za 'osoba' (s kim živi/obitelj)
    private String schedule;    // Zamjena za 'zauzetost' (slobodno vrijeme/posao)
    private String allergies;
    private String address;
}