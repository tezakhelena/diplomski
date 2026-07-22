package com.project.LostPaw.projections;

import java.time.LocalDateTime;

public interface PetAdContactProjection {
    Long getContactId();
    Long getPetAdId();
    Long getSenderId();
    Long getReceiverId();
    String getSubject();
    String getMessage();
    LocalDateTime getCreatedAt();
    Boolean getIsRead();
    Long getContactUserId();
    String getContactUsername();
    String getContactUserProfilePicture();
    String getPetAdTitle();
    String getAnswer();
    LocalDateTime getRepliedAt();

}