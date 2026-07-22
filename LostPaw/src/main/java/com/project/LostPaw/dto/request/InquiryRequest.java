package com.project.LostPaw.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InquiryRequest {
    private Long inquiryId;
    private Long userId;
    private Long responderId;
    private String question;
    private String answer;
    private Long type;
}
