package com.project.LostPaw.service.impl;

import com.project.LostPaw.dto.response.NotificationResponse;
import com.project.LostPaw.enumeration.NotificationStatus;
import com.project.LostPaw.repository.UserHistoryRepository;
import com.project.LostPaw.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationServiceImpl implements NotificationService {
    @Autowired
    UserHistoryRepository userHistoryRepository;

    @Override
    public List<NotificationResponse> getNotificationsByUserId(Long userId) {
        return userHistoryRepository.findNotificationsByUserId(userId).stream()
                .map(NotificationResponse::new)
                .collect(Collectors.toList());
    }

    @Override
    public void markAllAsRead(Long userId) {
        userHistoryRepository.markAllAsRead(
                userId,
                NotificationStatus.NOTIFICATION_READ.getCode(),   // Kod 1
                NotificationStatus.NOTIFICATION_UNREAD.getCode() // Kod 0
        );
    }

    @Override
    public void deleteAllNotifications(Long userId) {
        userHistoryRepository.deleteAllNotifications(userId);
    }
}
