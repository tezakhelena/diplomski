import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { VERIFICIRAJ_MAIL } from "../../../utils/constants";
import { showErrorNotification, showSuccessNotification } from "../../../utils/notificationUtils";

interface VerifyEmailOptions {
    onSuccess?: () => void;
    onError?: () => void;
}

export const useVerifyEmail = (options?: VerifyEmailOptions) => {
    const { t } = useTranslation("verifyEmail");

    const verifyEmailMutation = useMutation({
        mutationFn: async (token: string) => {
            const response = await axios.get(VERIFICIRAJ_MAIL, {
                params: { token },
            });

            return response.data;
        },
        onSuccess: () => {
            showSuccessNotification(
                t("notifications.success.title"),
                t("notifications.success.message")
            );
            options?.onSuccess?.();
        },
        onError: (error) => {
            showErrorNotification(
                t("notifications.error.title"),
                error,
                t("notifications.error.message")
            );

            options?.onError?.();
        },
    });

    return {
        verifyEmail: verifyEmailMutation.mutateAsync,
        isVerifyingEmail: verifyEmailMutation.isPending,
        isVerifyEmailError: verifyEmailMutation.isError,
    };
};