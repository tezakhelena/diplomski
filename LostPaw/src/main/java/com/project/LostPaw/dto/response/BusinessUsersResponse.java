package com.project.LostPaw.dto.response;

import com.project.LostPaw.projections.BusinessUsersProjection;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BusinessUsersResponse {
    private Long subjectId;
    private String subject;
    private String businessUserType;
    private String profilePictureUrl;

    public BusinessUsersResponse(BusinessUsersProjection projection) {
        this.subjectId = projection.getSubjectId();
        this.subject = projection.getSubject();
        this.businessUserType = projection.getBusinessUserType();
        this.profilePictureUrl = projection.getProfilePictureUrl();
    }
}
