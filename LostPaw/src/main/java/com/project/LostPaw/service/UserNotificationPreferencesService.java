package com.project.LostPaw.service;

import com.project.LostPaw.dto.request.UpdatePreferenceRequest;
import com.project.LostPaw.entity.UserNotificationPreference;

import java.util.List;

public interface UserNotificationPreferencesService {
    List<UserNotificationPreference> getPreferencesForUser(Long userId);
    void updatePreference(UpdatePreferenceRequest request);
    void addNotificationPreferencesInitial(Long korisnikId);
}
