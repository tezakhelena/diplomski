import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { NOTIFICATIONS } from "../../../utils/constants";
import { showErrorNotification } from "../../../utils/notificationUtils";
import { NotificationResponse } from "../types/response-types";

interface UseNotificationsOptions {
    enabled?: boolean;
}

export const useNotifications = (userId?: number, options?: UseNotificationsOptions) => {
    const { t } = useTranslation("notifications");
    const query = useQuery({
        queryKey: ["notifications", userId],
        queryFn: async (): Promise<NotificationResponse[]> => {
            try {
                const response = await axios.get<NotificationResponse[]>(`${NOTIFICATIONS}/${userId}`);
                return response.data;
            } catch (error) {
                showErrorNotification(t("notifications.error.fetch"), error, t("notifications.error.fetchDesc"));
                throw error;
            }
        },
        enabled: (options?.enabled ?? true) && !!userId,
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