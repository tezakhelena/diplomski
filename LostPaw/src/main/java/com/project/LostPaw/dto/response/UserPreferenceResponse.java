package com.project.LostPaw.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserPreferenceResponse {
    private Integer tip;
    private boolean receiveNotification;
}
