package com.project.LostPaw.service.impl;

import com.project.LostPaw.entity.UserHistory;
import com.project.LostPaw.entity.UserNotificationPreference;
import com.project.LostPaw.enumeration.NotificationStatus;
import com.project.LostPaw.repository.UserHistoryRepository;
import com.project.LostPaw.repository.UserNotificationPreferencesRepository;
import com.project.LostPaw.service.UserHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class UserHistoryServiceImpl implements UserHistoryService {
    @Autowired
    UserHistoryRepository userHistoryRepository;

    @Autowired
    UserNotificationPreferencesRepository userNotificationPreferencesRepository;

    @Autowired
    SimpMessagingTemplate messagingTemplate;

    @Override
    public void addUserHistory(
            String content,
            Long userId,
            Long createdBy,
            Integer type,
            String notification,
            Integer isRead
    ) {
        boolean receiveNotification =
                userNotificationPreferencesRepository
                        .findByUserIdAndType(userId, type)
                        .map(UserNotificationPreference::isReceiveNotification)
                        .orElse(true);

        if (!receiveNotification) {
            return;
        }

        UserHistory userHistory = new UserHistory();

        userHistory.setUserId(userId);
        userHistory.setContent(content);
        userHistory.setCreatedAt(LocalDateTime.now());
        userHistory.setIsRead(isRead);
        userHistory.setType(type);
        userHistory.setNotification(notification);
        userHistory.setCreatedBy(createdBy);

        UserHistory saved =
                userHistoryRepository.saveAndFlush(userHistory);

        messagingTemplate.convertAndSend(
                "/topic/notifikacije/" + userId,
                saved
        );
    }

    @Override
    public void addUserHistoryForUser(
            String content,
            Long userId,
            Integer type,
            String notification,
            Integer isRead,
            Long petAdId
    ) {
        boolean receiveNotification =
                userNotificationPreferencesRepository
                        .findByUserIdAndType(userId, type)
                        .map(UserNotificationPreference::isReceiveNotification)
                        .orElse(true);

        if (!receiveNotification) {
            return;
        }

        UserHistory userHistory = new UserHistory();

        userHistory.setUserId(userId);
        userHistory.setContent(content);
        userHistory.setCreatedAt(LocalDateTime.now());
        userHistory.setIsRead(isRead);
        userHistory.setType(type);
        userHistory.setNotification(notification);
        userHistory.setCreatedBy(userId);
        userHistory.setPetAdId(petAdId);

        UserHistory saved =
                userHistoryRepository.saveAndFlush(userHistory);

        messagingTemplate.convertAndSend(
                "/topic/notifikacije/" + userId,
                saved
        );
    }

    @Override
    public void addUserHistoryForOrganization(
            String content,
            Long userId,
            Integer type,
            String notification,
            Integer isRead
    ) {
        boolean receiveNotification =
                userNotificationPreferencesRepository
                        .findByUserIdAndType(userId, type)
                        .map(UserNotificationPreference::isReceiveNotification)
                        .orElse(true);

        if (!receiveNotification) {
            return;
        }

        UserHistory userHistory = new UserHistory();

        userHistory.setUserId(userId);
        userHistory.setContent(content);
        userHistory.setCreatedAt(LocalDateTime.now());
        userHistory.setIsRead(isRead);
        userHistory.setType(type);
        userHistory.setNotification(notification);
        userHistory.setCreatedBy(userId);

        UserHistory saved =
                userHistoryRepository.saveAndFlush(userHistory);

        messagingTemplate.convertAndSend(
                "/topic/notifikacije/" + userId,
                saved
        );
    }

    @Override
    public void addUserHistoryForInquiries(String content, Long userId, Integer type, String notification, Integer isRead) {
        UserHistory userHistory = new UserHistory();

        userHistory.setUserId(userId);
        userHistory.setContent(content);
        userHistory.setCreatedAt(LocalDateTime.now());
        userHistory.setIsRead(isRead);
        userHistory.setType(type);
        userHistory.setNotification(notification);
        userHistory.setCreatedBy(userId);

        UserHistory saved = userHistoryRepository.saveAndFlush(userHistory);

        messagingTemplate.convertAndSend(
                "/topic/notifikacije/" + userId,
                saved
        );
    }
}
