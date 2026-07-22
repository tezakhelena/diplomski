package com.project.LostPaw.service.impl;

import com.project.LostPaw.dto.request.UpdatePreferenceRequest;
import com.project.LostPaw.entity.UserNotificationPreference;
import com.project.LostPaw.repository.UserNotificationPreferencesRepository;
import com.project.LostPaw.service.UserNotificationPreferencesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserNotificationPreferencesServiceImpl implements UserNotificationPreferencesService {
    @Autowired
    UserNotificationPreferencesRepository userNotificationPreferencesRepository;

    @Override
    public List<UserNotificationPreference> getPreferencesForUser(Long userId) {
        return userNotificationPreferencesRepository.findByUserId(userId);
    }

    @Override
    public void updatePreference(UpdatePreferenceRequest request) {
        UserNotificationPreference preference = userNotificationPreferencesRepository
                .findByUserIdAndType(request.getUserId(), request.getType())
                .orElseGet(() -> new UserNotificationPreference(
                        null,
                        request.getUserId(),
                        request.getType(),
                        request.isReceiveNotification()
                ));

        preference.setReceiveNotification(request.isReceiveNotification());
        userNotificationPreferencesRepository.saveAndFlush(preference);
    }

    @Override
    public void addNotificationPreferencesInitial(Long korisnikId) {
        List<UserNotificationPreference> defaultPreferences = List.of(
                new UserNotificationPreference(null, korisnikId, 1, true),
                new UserNotificationPreference(null, korisnikId, 11, true),
                new UserNotificationPreference(null, korisnikId, 12, true)
        );

        userNotificationPreferencesRepository.saveAll(defaultPreferences);
    }
}
