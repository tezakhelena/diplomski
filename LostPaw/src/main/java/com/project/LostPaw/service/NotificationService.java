package com.project.LostPaw.service;

import com.project.LostPaw.dto.response.NotificationResponse;

import java.util.List;

public interface NotificationService {
    List<NotificationResponse> getNotificationsByUserId(Long userId);
    void markAllAsRead(Long userId);
    void deleteAllNotifications(Long userId);
}
