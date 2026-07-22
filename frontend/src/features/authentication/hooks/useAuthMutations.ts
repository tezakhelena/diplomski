import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { COMPLETE_PROFILE, LOGIN_POST, REGISTER_POST } from "../../../utils/constants";
import { showSuccessNotification, showErrorNotification } from "../../../utils/notificationUtils";

interface MutationOptions {
    onSuccess?: (data: any) => void;
}

export const useAuthMutations = (options?: MutationOptions) => {
    const { t } = useTranslation('authentication');

    const registerMutation = useMutation({
        mutationFn: (request: any) => axios.post(REGISTER_POST, request),
        onSuccess: () => {
            showSuccessNotification(t("notifications.regSuccess"), t("notifications.regSuccessMsg"));
            options?.onSuccess?.({});
        },
        onError: (error: any) => {
            showErrorNotification(t("notifications.regError"), error, t("notifications.regErrorMsg"));
        },
    });

    const loginMutation = useMutation({
        mutationFn: (request: any) => axios.post(LOGIN_POST, request),
        onSuccess: (res) => {
            options?.onSuccess?.(res.data);
        },
        onError: (error: any) => {
            showErrorNotification(t("notifications.loginError"), error, t("notifications.loginErrorMsg"));
        },
    });

    const completeProfileMutation = useMutation({
        mutationFn: (request: FormData) => axios.post(COMPLETE_PROFILE, request),
        onSuccess: (res) => {
            options?.onSuccess?.(res.data);
        },
        onError: (error: any) => {
            showErrorNotification(t("notifications.profileError"), error, t("notifications.profileErrorMsg"));
        },
    });

    return {
        register: registerMutation.mutateAsync,
        isRegistering: registerMutation.isPending,
        loginMethod: loginMutation.mutateAsync,
        isLoggingIn: loginMutation.isPending,
        completeProfile: completeProfileMutation.mutateAsync,
        isCompleting: completeProfileMutation.isPending,
    };
};