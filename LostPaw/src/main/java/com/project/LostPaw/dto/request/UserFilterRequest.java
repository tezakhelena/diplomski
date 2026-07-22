package com.project.LostPaw.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserFilterRequest {
    private String firstName;
    private String lastName;
    private String username;
    private Long statusId;
    private Long roleId;
    private Boolean privateUser;
    private Long businessTypeId;
    private String sortDirection;
    private String search;
}
