package com.project.LostPaw.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdoptionChangeStatusRequest {
    private Long statusId;
    private Long adoptionId;
    private String reason;
    private boolean signViaApp;
}
