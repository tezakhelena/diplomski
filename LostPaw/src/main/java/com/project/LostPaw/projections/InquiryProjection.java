package com.project.LostPaw.projections;

import java.time.LocalDateTime;

public interface InquiryProjection {
    Long getInquiryId();
    Long getUserId();
    String getUsername();
    Long getResponderId();
    String getResponderUsername();
    String getUserProfilePicture();
    String getResponderProfilePicture();
    String getQuestion();
    String getAnswer();
    Integer getType();
    String getTypeValue();
    LocalDateTime getCreatedAt();
    LocalDateTime getRepliedAt();
}
