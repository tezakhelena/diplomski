package com.project.LostPaw.dto.response;

import com.project.LostPaw.projections.InquiryProjection;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InquiryResponse {
    private Long inquiryId;
    private Long userId;
    private String username;
    private String userProfilePicture;
    private Long responderId;
    private String responderUsername;
    private String responderProfilePicture;
    private String question;
    private String answer;
    private Integer type;
    private LocalDateTime createdAt;
    private LocalDateTime repliedAt;
    private String typeValue;

    public InquiryResponse(InquiryProjection projection) {
        if (projection != null) {
            this.inquiryId = projection.getInquiryId();
            this.userId = projection.getUserId();
            this.username = projection.getUsername();
            this.userProfilePicture = projection.getUserProfilePicture();
            this.responderId = projection.getResponderId();
            this.responderUsername = projection.getResponderUsername();
            this.responderProfilePicture = projection.getResponderProfilePicture();
            this.question = projection.getQuestion();
            this.answer = projection.getAnswer();
            this.type = projection.getType();
            this.createdAt = projection.getCreatedAt();
            this.repliedAt = projection.getRepliedAt();
            this.typeValue = projection.getTypeValue();
        }
    }
}
