package com.project.LostPaw.repository;

import com.project.LostPaw.entity.UserNotificationPreference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserNotificationPreferencesRepository extends JpaRepository<UserNotificationPreference, Long> {
    List<UserNotificationPreference> findByUserId(Long userId);
    Optional<UserNotificationPreference> findByUserIdAndType(Long userId, Integer type);
}

