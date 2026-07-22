import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { showSuccessNotification, showErrorNotification } from "../../../utils/notificationUtils";
import {
    CHANGE_EMAIL,
    CHANGE_PASSWORD,
    CHANGE_STATUS,
    CONTACT_VISIBILITY,
    DELETE_USER,
    EDIT_USER,
    UPDATE_PREFERENCE
} from "../../../utils/constants";
import { UpdatePreferenceRequest, UpdateProfileRequest } from "../types/request-types";
import { useDispatch, useSelector } from "react-redux";
import { setProfilna } from "../../../redux/slices/authSlice";
import { RootState } from "../../../redux/store";
import { useTranslation } from "react-i18next";

export const useUserMutations = () => {
    const { t } = useTranslation("users");
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const { userId } = useSelector((state: RootState) => state.auth);

    const invalidateUserQueries = (userId?: number) => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        if (userId) queryClient.invalidateQueries({ queryKey: ["user-details", userId] });
    };

    const updateProfileMutation = useMutation({
        mutationFn: (request: FormData) => axios.post(EDIT_USER, request, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }),
        onSuccess: (response) => {
            const updatedUser = response.data;
            const isSameUser = userId === updatedUser.userId;

            if (isSameUser && updatedUser.profilePictureUrl) {
                dispatch(setProfilna(updatedUser.profilePictureUrl));
            }

            queryClient.setQueryData(["user-details", updatedUser.userId], updatedUser);

            showSuccessNotification(t("notifications.updateProfile.title"), t("notifications.updateProfile.success"));
        },
        onError: (error) => showErrorNotification(t("notifications.updateProfile.title"), error, t("notifications.updateProfile.error"))
    });

    const toggleVisibilityMutation = useMutation({
        mutationFn: (request: Partial<UpdateProfileRequest>) =>
            axios.post(CONTACT_VISIBILITY, request),
        onSuccess: (_, vars) => invalidateUserQueries(vars.userId),
        onError: (error) => showErrorNotification(t("notifications.visibility.title"), error, t("notifications.visibility.error"))
    });

    const changeEmailMutation = useMutation({
        mutationFn: (request: Partial<UpdateProfileRequest>) =>
            axios.post(CHANGE_EMAIL, request),
        onSuccess: (_, vars) => {
            showSuccessNotification(t("notifications.email.title"), t("notifications.email.success"));
            invalidateUserQueries(vars.userId);
        },
        onError: (error) => showErrorNotification(t("notifications.email.title"), error, t("notifications.email.error"))
    });

    const changePasswordMutation = useMutation({
        mutationFn: (request: Partial<UpdateProfileRequest>) =>
            axios.post(CHANGE_PASSWORD, request),
        onSuccess: () => {
            showSuccessNotification(t("notifications.password.title"), t("notifications.password.success"));
        },
        onError: (error) => showErrorNotification(t("notifications.password.title"), error, t("notifications.password.error"))
    });

    const changeStatusMutation = useMutation({
        mutationFn: (request: Partial<UpdateProfileRequest>) =>
            axios.post(CHANGE_STATUS, request),
        onSuccess: (_, vars) => {
            showSuccessNotification(t("notifications.status.title"), t("notifications.status.success"));
            invalidateUserQueries(vars.userId);
        },
        onError: (error) => showErrorNotification(t("notifications.status.title"), error, t("notifications.status.error"))
    });

    const deleteAccountMutation = useMutation({
        mutationFn: (userId: number) => axios.get(`${DELETE_USER}${userId}`),
        onSuccess: () => {
            showSuccessNotification(t("notifications.deleteAccount.title"), t("notifications.deleteAccount.success"));
            invalidateUserQueries();
        },
        onError: (error) => showErrorNotification(t("notifications.deleteAccount.title"), error, t("notifications.deleteAccount.error"))
    });

    const updatePreferenceMutation = useMutation({
        mutationFn: (data: Partial<UpdatePreferenceRequest>) =>
            axios.post(UPDATE_PREFERENCE, data),
        onSuccess: (_, vars) => invalidateUserQueries(vars.userId),
        onError: (error) => showErrorNotification(t("notifications.preferences.title"), error, t("notifications.preferences.error"))
    });

    return {
        updateProfile: updateProfileMutation.mutateAsync,
        isUpdating: updateProfileMutation.isPending,

        toggleVisibility: toggleVisibilityMutation.mutateAsync,
        togglePending: toggleVisibilityMutation.isPending,

        changeEmail: changeEmailMutation.mutateAsync,
        changeEmailPending: changeEmailMutation.isPending,

        changePassword: changePasswordMutation.mutateAsync,
        changePasswordPending: changePasswordMutation.isPending,

        changeStatus: changeStatusMutation.mutateAsync,
        changeStatusPending: changeStatusMutation.isPending,

        deleteAccount: deleteAccountMutation.mutateAsync,
        deletePending: deleteAccountMutation.isPending,

        updatePreference: updatePreferenceMutation.mutateAsync,
        updatePreferencePending: updatePreferenceMutation.isPending
    };
};