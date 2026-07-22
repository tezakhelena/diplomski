package com.project.LostPaw.repository;

import com.project.LostPaw.projections.NotificationProjection;
import com.project.LostPaw.entity.UserHistory;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserHistoryRepository extends JpaRepository<UserHistory, Long> {

    List<UserHistory> findByCreatedBy(Long createdBy);

    @Query(value = """
        SELECT      
            h.history_id AS notificationId,      
            h.notification AS notification,      
            h.is_read AS isRead,      
            h.type AS type,      
            h.user_id AS userId,    
            h.created_at AS createdAt,  
            h.content AS content,  
            h.pet_ad_id AS petAdId  
        FROM user_history h       
        WHERE h.user_id = :userId    
          AND h.notification IS NOT NULL    
        ORDER BY h.created_at DESC 
    """, nativeQuery = true)
    List<NotificationProjection> findNotificationsByUserId(Long userId);

    @Modifying
    @Transactional
    @Query(value = """
        UPDATE user_history 
        SET is_read = :readStatus 
        WHERE user_id = :userId 
          AND is_read = :unreadStatus
    """, nativeQuery = true)
    void markAllAsRead(Long userId,
                       Integer readStatus,
                       Integer unreadStatus);

    @Modifying
    @Transactional
    @Query(value = """
        UPDATE user_history 
        SET notification = NULL 
        WHERE user_id = :userId
    """, nativeQuery = true)
    void deleteAllNotifications(Long userId);
}
