package com.project.LostPaw.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserReportedAdResponse {
    private Long petAdId;
    private LocalDate changedAt;
    private String comment;
    private String reason;
    private UserSummaryResponse user;
}
