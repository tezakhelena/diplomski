import { UsersResponse } from "../../users/types/response-types";

export interface UserSummaryResponse {
    userId: number;
    username: string;
    profilePictureUrl: string;
}

export interface BusinessUsersResponse {
    subjectId: number;
    subject: string;
    businessUserType: string;
    profilePictureUrl: string;
}

export interface UniversalStatisticsResponse {
    label: string;
    count: number;
    date?: string;
}

export interface ChartStatisticsResponse {
    countyStatistics: UniversalStatisticsResponse[];
    businessUserStatistics: UniversalStatisticsResponse[];
    adsCountyStatistics: UniversalStatisticsResponse[];
    categoryStatistics: UniversalStatisticsResponse[];
    categoryAndDateStatistics: UniversalStatisticsResponse[];
    lastLoginCount: UniversalStatisticsResponse[];
    userActivityCount: UniversalStatisticsResponse[];
    adsByDate: UniversalStatisticsResponse[];
}

export interface PetAdHistoryResponse {
    historyId: number;
    petAdId: number;
    changedAt: string;
    statusId: number;
    userId: number;
    reason: string;
    primaryImage: string;
    generatedName: string;
    username: string;
    comment: string;
    profilePictureUrl: string;
    latestChangeDate: string;
    blockCount: number;
}

export interface AdminDashboardResponse {
    activeAdsCount: number;
    blockedAdsCount: number;
    reportedAdsCount: number;
    successfullAdsCount: number;
    activeUsersCount: number;
    usersPendingCount: number;
    usersSuspendedCount: number;
    suspendedUsers: UsersResponse[];
    blockedAds: PetAdHistoryResponse[];
    reportedAds: PetAdHistoryResponse[];
}

export interface HomePageResponse {
    countSuccessfullAds: number;
    countActiveUsers: number;
    averageReview: number;
    businessUsers: BusinessUsersResponse[];
}

export interface UserReportedAdResponse {
    petAdId: number;
    changedAt: string;
    comment: string;
    reason: string;
    user: UserSummaryResponse;
}

export interface BlockedUserAdResponse {
    petAdId: number;
    latestChangeDate: string;
    statusId: number;
    statusValue: string;
    reason: string;
    primaryImage: string;
    generatedName: string;
    userId: number;
}

export interface HomepageReviewResponse {
    reviewId: number;
    comment: string;
    rate: number;
    user: UserSummaryResponse;
}