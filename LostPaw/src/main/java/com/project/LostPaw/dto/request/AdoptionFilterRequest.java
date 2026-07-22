package com.project.LostPaw.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdoptionFilterRequest {
    private String filterBy;
    private Long userId;
    private String sortDirection;
    private String search;
    private Long statusId;
    private Long volunteerType;
}
