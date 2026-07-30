import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { api } from "../../../utils/api";
import { CHANGE_STATUS_OGLAS, CREATE_PET_AD, EDIT_PET_AD, GET_PET_ADS } from "../../../utils/constants";
import { showErrorNotification, showSuccessNotification } from "../../../utils/notificationUtils";
import { ChangeAdStatusRequest, SaveAdRequest } from "../types/request-types";

interface MutationOptions {
    onSuccess?: () => void;
    navigate?: (path: string) => void;
}

export const usePetAdMutations = (options?: MutationOptions) => {
    const { t } = useTranslation("petAd");
    const queryClient = useQueryClient();

    const createAdMutation = useMutation({
        mutationFn: (request: FormData) => {
            return api.post(CREATE_PET_AD, request, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        },
        onSuccess: () => {
            showSuccessNotification(
                t("notifications.create.title"),
                t("notifications.create.success")
            );
            queryClient.invalidateQueries({ queryKey: ["petAds"] });
            queryClient.invalidateQueries({ queryKey: ["latestAds"] });

            options?.onSuccess?.();
            options?.navigate?.("/oglasi");
        },
        onError: (error: any) => {
            //409 javlja ako psotoji slicni oglas
            if (error.response?.status === 409) return;
            showErrorNotification(
                t("notifications.create.title"),
                error,
                t("notifications.create.error")
            );
        },
    });

    const updateAdMutation = useMutation({
        mutationFn: (request: SaveAdRequest) => {
            return api.put(EDIT_PET_AD, request);
        },
        onSuccess: (_, variables) => {
            showSuccessNotification(
                t("notifications.update.title"),
                t("notifications.update.success")
            );
            queryClient.invalidateQueries({ queryKey: ["petAds"] });
            queryClient.invalidateQueries({ queryKey: ["petAdDetails", variables.petAdId] });

            options?.onSuccess?.();
            options?.navigate?.("/oglasi");
        },
        onError: (error) => {
            showErrorNotification(
                t("notifications.update.title"),
                error,
                t("notifications.update.error")
            );
        },
    });

    const deleteAdMutation = useMutation({
        mutationFn: (id: number) => {
            return api.delete(`${GET_PET_ADS}/delete/${id}`);
        },
        onSuccess: () => {
            showSuccessNotification(
                t("notifications.delete.title"),
                t("notifications.delete.success")
            );
            queryClient.invalidateQueries({ queryKey: ["petAds"] });
            queryClient.invalidateQueries({ queryKey: ["latestAds"] });
            queryClient.invalidateQueries({ queryKey: ["adminStatistics"] });

            options?.onSuccess?.();
            options?.navigate?.("/oglasi");
        },
        onError: (error) => {
            showErrorNotification(
                t("notifications.delete.title"),
                error,
                t("notifications.delete.error")
            );
        },
    });

    const changeStatusMutation = useMutation({
        mutationFn: (request: Partial<ChangeAdStatusRequest>) => {
            return api.post(CHANGE_STATUS_OGLAS, request);
        },
        onSuccess: () => {
            showSuccessNotification(
                t("notifications.statusChange.title"),
                t("notifications.statusChange.success")
            );
            queryClient.invalidateQueries({ queryKey: ["petAds"] });
            queryClient.invalidateQueries({ queryKey: ["adminStatistics"] });

            options?.onSuccess?.();
            if (options?.navigate) {
                options.navigate("/oglasi");
            }
        },
        onError: (error) => {
            showErrorNotification(
                t("notifications.statusChange.title"),
                error,
                t("notifications.statusChange.error")
            );
        },
    });

    return {
        createAd: createAdMutation.mutateAsync,
        isCreating: createAdMutation.isPending,

        updateAd: updateAdMutation.mutateAsync,
        isUpdating: updateAdMutation.isPending,

        deleteAd: deleteAdMutation.mutateAsync,
        isDeleting: deleteAdMutation.isPending,

        changeAdStatus: changeStatusMutation.mutateAsync,
        isStatusChanging: changeStatusMutation.isPending ? changeStatusMutation.variables?.petAdId : null,
        isStatusChangingBoolean: changeStatusMutation.isPending,
    };
};