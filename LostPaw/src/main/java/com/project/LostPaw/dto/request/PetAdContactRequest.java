package com.project.LostPaw.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PetAdContactRequest {
    private Long userId;
    private String filterBy;
    private String sortDirection;
    private String search;
}
