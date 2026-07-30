import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { api } from "../../../utils/api";
import { CLEAR_NOTIFIKACIJS, READ_NOTIFICATIONS } from "../../../utils/constants";
import { showErrorNotification, showSuccessNotification } from "../../../utils/notificationUtils";

type NotificationAction = "markAllAsRead" | "deleteAll";

interface NotificationMutationRequest {
    action: NotificationAction;
    userId: number;
}

interface MutationOptions {
    onSuccess?: (action: NotificationAction) => void;
}

export const useNotificationMutations = (options?: MutationOptions) => {
    const { t } = useTranslation("notifications");
    const queryClient = useQueryClient();

    const notificationMutation = useMutation({
        mutationFn: ({ action, userId }: NotificationMutationRequest) => {
            if (action === "markAllAsRead") return api.put(`${READ_NOTIFICATIONS}/${userId}`);
            return api.put(`${CLEAR_NOTIFIKACIJS}/${userId}`);
        },
        onSuccess: async (_, variables) => {
            await queryClient.invalidateQueries({ queryKey: ["notifications", variables.userId] });
            showSuccessNotification(
                variables.action === "markAllAsRead" ? t("notifications.success.read") : t("notifications.success.deleted"),
                variables.action === "markAllAsRead" ? t("notifications.success.readDesc") : t("notifications.success.deletedDesc")
            );
            options?.onSuccess?.(variables.action);
        },
        onError: (error, variables) => {
            showErrorNotification(
                variables.action === "markAllAsRead" ? t("notifications.error.markRead") : t("notifications.error.delete"),
                error,
                variables.action === "markAllAsRead" ? t("notifications.error.markReadDesc") : t("notifications.error.deleteDesc")
            );
        },
    });

    return {
        markAllAsRead: (userId: number) => notificationMutation.mutateAsync({ action: "markAllAsRead", userId }),
        deleteAllNotifications: (userId: number) => notificationMutation.mutateAsync({ action: "deleteAll", userId }),
        isMarkingAsRead: notificationMutation.isPending && notificationMutation.variables?.action === "markAllAsRead",
        isDeletingNotifications: notificationMutation.isPending && notificationMutation.variables?.action === "deleteAll",
    };
};