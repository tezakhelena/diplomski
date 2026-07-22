package com.project.LostPaw.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InquiryFilterRequest {
    private Long userId;
    private Integer type;
    private String sortDirection;
    private String search;
}
