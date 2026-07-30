import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { api } from "../../../utils/api";
import { GET_USERS } from "../../../utils/constants";
import { removeEmptyFilters } from "../../../utils/formatters";
import { showErrorNotification } from "../../../utils/notificationUtils";
import { UserFilterRequest } from "../types/request-types";
import { UserDetailsResponse, UsersResponse } from "../types/response-types";

export const useUsers = (filters?: Partial<UserFilterRequest>, enabled = true) => {
    const { t } = useTranslation("users");
    const activeFilters = useMemo(() => removeEmptyFilters(filters), [filters]);

    const query = useQuery({
        queryKey: ["users", activeFilters],
        queryFn: async (): Promise<UsersResponse[]> => {
            try {
                const res = await api.post<UsersResponse[]>(GET_USERS, activeFilters);
                return res.data;
            } catch (error) {
                showErrorNotification(t("notifications.fetchUsers.title"), error, t("notifications.fetchUsers.error"));
                throw error;
            }
        },
        enabled,
        retry: 0,
    });

    return {
        users: query.data ?? [],
        isLoading: query.isLoading,
        refetch: query.refetch,
    };
};

export const useUserDetails = (userId?: number) => {
    const { t } = useTranslation("users");

    const query = useQuery({
        queryKey: ["user-details", userId],
        queryFn: async (): Promise<UserDetailsResponse> => {
            try {
                const res = await api.get<UserDetailsResponse>(`${GET_USERS}/${userId}`);
                return res.data;
            } catch (error) {
                showErrorNotification(t("notifications.fetchUserDetails.title"), error, t("notifications.fetchUserDetails.error"));
                throw error;
            }
        },
        enabled: !!userId,
        refetchOnWindowFocus: false,
        retry: 0,
    });

    return {
        userDetails: query.data,
        isLoading: query.isLoading,
        refetch: query.refetch,
    };
};