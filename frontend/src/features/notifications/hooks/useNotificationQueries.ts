import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { api } from "../../../utils/api";
import { NOTIFICATIONS } from "../../../utils/constants";
import { showErrorNotification } from "../../../utils/notificationUtils";
import { NotificationResponse } from "../types/response-types";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

interface UseNotificationsOptions {
    enabled?: boolean;
}



export const useNotifications = (userId?: number, options?: UseNotificationsOptions) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    const shouldFetch = isAuthenticated && !!userId && userId > 0 && (options?.enabled ?? true);
    const { t } = useTranslation("notifications");
    const query = useQuery({
        queryKey: ["notifications", userId],
        queryFn: async (): Promise<NotificationResponse[]> => {
            try {
                const response = await api.get<NotificationResponse[]>(`${NOTIFICATIONS}/${userId}`);
                return response.data;
            } catch (error) {
                showErrorNotification(t("notifications.error.fetch"), error, t("notifications.error.fetchDesc"));
                throw error;
            }
        },
        enabled: shouldFetch,
        retry: 0,
    });

    return {
        notifications: query.data ?? [],
        isLoading: query.isLoading,
        isFetching: query.isFetching,
        isError: query.isError,
        error: query.error,
        refetchNotifications: query.refetch,
    };
};