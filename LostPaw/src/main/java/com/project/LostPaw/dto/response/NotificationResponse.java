package com.project.LostPaw.dto.response;

import com.project.LostPaw.projections.NotificationProjection;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class NotificationResponse {
    private Long notificationId;
    private String notification;
    private Long userId;
    private Integer isRead;
    private Integer type;
    private LocalDateTime createdAt;
    private String content;
    private Long petAdId;

    public NotificationResponse(NotificationProjection projection) {
        if (projection != null) {
            this.notificationId = projection.getNotificationId();
            this.notification = projection.getNotification();
            this.userId = projection.getUserId();
            this.isRead = projection.getIsRead();
            this.type = projection.getType();
            this.createdAt = projection.getCreatedAt();
            this.content = projection.getContent();
            this.petAdId = projection.getPetAdId();
        }
    }
}
