package com.project.LostPaw.dto.response;

import com.project.LostPaw.projections.PetAdContactProjection;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PetAdContactResponse {
    private Long contactId;
    private Long petAdId;
    private Long senderId;
    private Long receiverId;
    private String subject;
    private String message;
    private LocalDateTime createdAt;
    private Boolean isRead;
    private Long contactUserId;
    private String contactUsername;
    private String contactUserProfilePicture;
    private String petAdTitle;
    private String primaryImage;
    private String answer;
    private LocalDateTime repliedAt;

    public PetAdContactResponse(PetAdContactProjection projection) {
        this.contactId = projection.getContactId();
        this.petAdId = projection.getPetAdId();
        this.senderId = projection.getSenderId();
        this.receiverId = projection.getReceiverId();
        this.subject = projection.getSubject();
        this.message = projection.getMessage();
        this.createdAt = projection.getCreatedAt();
        this.isRead = projection.getIsRead();
        this.contactUserId = projection.getContactUserId();
        this.contactUsername = projection.getContactUsername();
        this.contactUserProfilePicture = projection.getContactUserProfilePicture();
        this.petAdTitle = projection.getPetAdTitle();
        this.answer = projection.getAnswer();
        this.repliedAt = projection.getRepliedAt();
    }
}