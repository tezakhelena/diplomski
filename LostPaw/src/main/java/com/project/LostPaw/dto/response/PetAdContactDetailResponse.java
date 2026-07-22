package com.project.LostPaw.dto.response;

import com.project.LostPaw.entity.PetAdContact;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PetAdContactDetailResponse {
    private Long id;
    private Long petAdId;
    private Long senderId;
    private Long receiverId;
    private String subject;
    private String message;
    private LocalDateTime createdAt;
    private String answer;
    private LocalDateTime repliedAt;
    private boolean isRead;

    public PetAdContactDetailResponse(PetAdContact entity) {
        this.id = entity.getId();
        this.petAdId = entity.getPetAdId();
        this.senderId = entity.getSenderId();
        this.receiverId = entity.getReceiverId();
        this.subject = entity.getSubject();
        this.message = entity.getMessage();
        this.createdAt = entity.getCreatedAt();
        this.answer = entity.getAnswer();
        this.repliedAt = entity.getRepliedAt();
        this.isRead = entity.isRead();
    }
}