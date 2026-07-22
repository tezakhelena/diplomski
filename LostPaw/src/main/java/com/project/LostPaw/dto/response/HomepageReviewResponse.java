package com.project.LostPaw.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HomepageReviewResponse {
    private Long reviewId;
    private String comment;
    private Integer rate;
    private UserSummaryResponse user;
}
