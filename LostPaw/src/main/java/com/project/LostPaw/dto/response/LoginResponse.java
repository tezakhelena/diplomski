package com.project.LostPaw.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {
    private String token;
    private String username;
    private Long userId;
    private String firstName;
    private String lastName;
    private Long roleId;
    private String profilePictureUrl;
    private boolean privateUser;
    private boolean contactVisible;
    private List<UserPreferenceResponse> preferences;
    private Long businessTypeId;
}
