package com.project.LostPaw.dto.response;
import com.project.LostPaw.entity.UserHistory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDetailsResponse {
    private Long userId;
    private String username;
    private String firstName;
    private String lastName;
    private String status;
    private String role;
    private Long roleId;
    private LocalDate registrationDate;
    private boolean privateUser;
    private String profilePictureUrl;
    private String city;
    private String county;
    private Long countyId;
    private LocalDateTime lastLogin;
    private List<UserHistory> userHistory;
    private String email;
    private String phoneNumber;
    private boolean emailVerified;
    private boolean contactVisible;
    private Long businessTypeId;
    private String businessUserType;
    private String oib;
    private String website;
    private Long statusId;
}
