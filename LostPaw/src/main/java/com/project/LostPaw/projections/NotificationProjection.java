package com.project.LostPaw.projections;

import java.time.LocalDateTime;

public interface NotificationProjection {
    Long getNotificationId();
    String getNotification();
    Long getUserId();
    Integer getIsRead();
    Integer getType();
    LocalDateTime getCreatedAt();
    String getContent();
    Long getPetAdId();
}