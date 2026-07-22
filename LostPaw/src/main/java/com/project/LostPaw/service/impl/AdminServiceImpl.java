package com.project.LostPaw.service.impl;

import com.project.LostPaw.dto.response.*;
import com.project.LostPaw.enumeration.AttributeEnum;
import com.project.LostPaw.enumeration.NotificationType;
import com.project.LostPaw.repository.PetAdHistoryRepository;
import com.project.LostPaw.repository.PetAdRepository;
import com.project.LostPaw.repository.UserRepository;
import com.project.LostPaw.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminServiceImpl implements AdminService {
    
    @Autowired
    PetAdRepository petAdRepository;
    
    @Autowired
    UserRepository userRepository;
    
    @Autowired
    PetAdHistoryRepository petAdHistoryRepository;
    
    

    @Override
    public AdminDashboardResponse getStatistics(){
        Integer activeAdsCount = petAdRepository.findByStatusId(AttributeEnum.AD_ACTIVE.getCode()).size();
        Integer blockedAdsCount = petAdRepository.findByStatusId(AttributeEnum.AD_BLOCKED.getCode()).size();
        Integer reportedAdsCount = petAdRepository.findByStatusId(AttributeEnum.AD_PENDING.getCode()).size();
        Integer successfullAdsCount = petAdRepository.findByStatusId(AttributeEnum.AD_RESOLVED.getCode()).size();

        Integer activeUsersCount = userRepository.findByStatusId(AttributeEnum.USER_ACTIVE.getCode()).size();
        Integer usersPendingCount = userRepository.findByStatusId(AttributeEnum.USER_PENDING.getCode()).size();
        Integer usersSuspendedCount = userRepository.findByStatusId(AttributeEnum.USER_SUSPENDED.getCode()).size();

        List<UserResponse> obustavljeniUserResponse = userRepository.findBlockedUsers(AttributeEnum.USER_SUSPENDED.getCode(), NotificationType.OBUSTAVLJEN_RACUN.getCode())
                .stream()
                .map(UserResponse::new)
                .toList();

        List<PetAdHistoryResponse> blockedAds = petAdHistoryRepository.findAdStatusByStatusId(AttributeEnum.AD_BLOCKED.getCode())
                .stream()
                .map(PetAdHistoryResponse::new)
                .collect(Collectors.toList());

        List<PetAdHistoryResponse> reportedAds = petAdHistoryRepository.findLastReportedAds(AttributeEnum.AD_PENDING.getCode())
                .stream()
                .map(PetAdHistoryResponse::new)
                .collect(Collectors.toList());
        return new AdminDashboardResponse(activeAdsCount, blockedAdsCount, reportedAdsCount, successfullAdsCount, activeUsersCount, usersPendingCount, usersSuspendedCount, obustavljeniUserResponse, blockedAds, reportedAds);
    }

    @Override
    public ChartStatisticsResponse getChartStatistics() {

        List<UniversalStatisticsResponse> countyStats = userRepository.findUserCountByRegion()
                .stream().map(UniversalStatisticsResponse::new).toList();

        List<UniversalStatisticsResponse> subjectStats = userRepository.findUserCountBySubject()
                .stream().map(UniversalStatisticsResponse::new).toList();

        List<UniversalStatisticsResponse> countyAdsStats = petAdRepository.findPetAdsCountByRegion()
                .stream().map(UniversalStatisticsResponse::new).toList();

        List<UniversalStatisticsResponse> categoryStats = petAdRepository.findPetAdsCountByCategory()
                .stream().map(UniversalStatisticsResponse::new).toList();

        List<UniversalStatisticsResponse> categoryAndDateStats = petAdRepository.findPetAdsCategoryCountAndDate()
                .stream().map(UniversalStatisticsResponse::new).toList();

        List<UniversalStatisticsResponse> adsByDate = petAdRepository.findPetAdsCountByCreationDate()
                .stream().map(UniversalStatisticsResponse::new).toList();

        List<UniversalStatisticsResponse> lastLoginCount = userRepository.findUserCountByLastLogin()
                .stream().map(UniversalStatisticsResponse::new).toList();

        List<UniversalStatisticsResponse> userActivityCount = userRepository.findUserActivityCountByDate()
                .stream().map(UniversalStatisticsResponse::new).toList();

        return new ChartStatisticsResponse(
                countyStats,
                subjectStats,
                countyAdsStats,
                categoryStats,
                categoryAndDateStats,
                lastLoginCount,
                userActivityCount,
                adsByDate
        );
    }

    @Override
    public List<UserReportedAdResponse> getUserReportedAds(Long petAdId) {
        return petAdHistoryRepository.findUserReportedAd(petAdId).stream()
                .map(p -> new UserReportedAdResponse(
                        p.getPetAdId(),
                        p.getDatumPromjene(),
                        p.getComment(),
                        p.getReason(),
                        new UserSummaryResponse(
                                p.getUserId(),
                                p.getUsername(),
                                p.getProfilePictureUrl()
                        )
                )).collect(Collectors.toList());
    }

    @Override
    public List<BlockedUserAdResponse> getAdsOfBlockedUser(Long userId) {
        return petAdHistoryRepository.findAdsOfBlockedUser(userId).stream()
                .map(p -> new BlockedUserAdResponse(
                        p.getPetAdId(),
                        p.getLatestChangeDate(),
                        p.getStatusId(),
                        p.getStatusValue(),
                        p.getReason(),
                        p.getPrimaryImage(),
                        p.getGeneratedName(),
                        p.getUserId()
                )).collect(Collectors.toList());
    }
}
