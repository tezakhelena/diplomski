package com.project.LostPaw.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SendMessageRequest {
    private Long contactId;
    private Long petAdId;
    private Long senderId;
    private Long receiverId;
    private String subject;
    private String message;
    private String answer;
}
