package com.project.LostPaw.service;

public interface UserHistoryService {
    void addUserHistory(String content, Long userId, Long createdBy, Integer type, String notification, Integer isRead);
    void addUserHistoryForUser(String content, Long userId, Integer type, String notification, Integer isRead, Long petAdId);
    void addUserHistoryForInquiries(String content, Long userId, Integer type, String notification, Integer isRead);
}
