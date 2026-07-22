package com.project.LostPaw.service;

import com.project.LostPaw.dto.request.ChangeAdStatusRequest;

public interface PetAdHistoryService {
    void changeAdStatus(ChangeAdStatusRequest request);
    void changeAdStatusByUserStatus(Long petAdId, Long statusId, Long userId, Integer reasonCode);
}
