package com.project.LostPaw.dto.request;

import lombok.Data;

@Data
public class CheckChatRequest {
    private Long senderId;
    private Long receiverId;
}
