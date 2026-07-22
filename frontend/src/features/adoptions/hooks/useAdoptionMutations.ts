import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { SEND_ADOPTION_REQUEST, CHANGE_ADOPTION_STATUS } from "../../../utils/constants";
import { AdoptionSubmissionRequest, AdoptionChangeStatusRequest } from "../types/request-types";
import { showSuccessNotification, showErrorNotification } from "../../../utils/notificationUtils";
import { useTranslation } from "react-i18next";

interface MutationOptions {
    onSuccess?: () => void;
    navigate?: (path: string) => void;
}

export const useAdoptionMutations = (options?: MutationOptions) => {
    const { t } = useTranslation('adoption');

    const queryClient = useQueryClient();

    const sendRequestMutation = useMutation({
        mutationFn: (request: AdoptionSubmissionRequest) => axios.post(SEND_ADOPTION_REQUEST, request),
        onSuccess: () => {
            showSuccessNotification(t('adoption.mutations.sendRequestMessage'), t('adoption.mutations.sendRequestSuccess'));
            queryClient.invalidateQueries({ queryKey: ["adoption-requests"] });
            
            options?.onSuccess?.();
            options?.navigate?.("/zahtjevi");
        },
        onError: (error) => {
            showErrorNotification(t('adoption.mutations.sendRequestMessage'), error, t('adoption.mutations.sendRequestError'));
        },
    });

    const changeStatusMutation = useMutation({
        mutationFn: (request: Partial<AdoptionChangeStatusRequest>) => axios.post(CHANGE_ADOPTION_STATUS, request),
        onSuccess: () => {
            showSuccessNotification(t('adoption.mutations.changeStatus'), t('adoption.mutations.changeStatusSuccess'));
            queryClient.invalidateQueries({ queryKey: ["adoption-requests"] });
            queryClient.invalidateQueries({ queryKey: ["adoption-detail"] });
            
            options?.onSuccess?.();
        },
        onError: (error) => {
            showErrorNotification(t('adoption.mutations.changeStatus'), error, t('adoption.mutations.changeStatusError'));
        },
    });

    return {
        sendRequest: sendRequestMutation.mutateAsync,
        isSending: sendRequestMutation.isPending,

        changeStatus: changeStatusMutation.mutateAsync,
        isStatusChanging: changeStatusMutation.isPending,
    };
};