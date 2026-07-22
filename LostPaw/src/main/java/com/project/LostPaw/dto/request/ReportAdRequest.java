package com.project.LostPaw.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReportAdRequest {
    private Long petAdId;
    private String comment;
    private Long statusId;
    private Long userId;
    private Long reasonCode;
}
