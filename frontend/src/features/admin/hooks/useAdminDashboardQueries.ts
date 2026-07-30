import { useQuery } from "@tanstack/react-query";
import { api } from "../../../utils/api";
import { ADMIN, CHART_STATISTICS, GET_ADS_OD_BLOCKED_USER, GET_USER_REPORTED_ADS } from "../../../utils/constants";
import { AdminDashboardResponse, BlockedUserAdResponse, ChartStatisticsResponse, UserReportedAdResponse } from "../types/response-types";

export const useAdminStatistics = () => {
    return useQuery({
        queryKey: ["admin-statistics"],
        queryFn: async () => (await api.post<AdminDashboardResponse>(ADMIN)).data,
        retry: 0,
    });
};

export const useAdminCharts = () => {
    return useQuery({
        queryKey: ["admin-chart-statistics"],
        queryFn: async () => (await api.post<ChartStatisticsResponse>(CHART_STATISTICS)).data,
        retry: 0,
    });
};

export const useReportedAdUsers = (petAdId?: number) => {
    return useQuery({
        queryKey: ["reported-ad-users", petAdId],
        queryFn: async () => (await api.get<UserReportedAdResponse[]>(`${GET_USER_REPORTED_ADS}${petAdId}`)).data,
        enabled: !!petAdId,
        retry: 0,
    });
};

export const useBlockedUserAds = (userId?: number) => {
    return useQuery({
        queryKey: ["blocked-user-ads", userId],
        queryFn: async () => (await api.get<BlockedUserAdResponse[]>(`${GET_ADS_OD_BLOCKED_USER}${userId}`)).data,
        enabled: !!userId,
        retry: 0,
    });
};