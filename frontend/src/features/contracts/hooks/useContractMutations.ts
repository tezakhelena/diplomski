import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { api } from "../../../utils/api";
import { ADD_CONTRACT, ADD_SIGNATURE, DOWNLOAD_PDF } from "../../../utils/constants";
import { showErrorNotification, showSuccessNotification } from "../../../utils/notificationUtils";

interface ContractMutationOptions {
    onAddSuccess?: () => void | Promise<void>;
    onSignSuccess?: () => void | Promise<void>;
    onDownloadSuccess?: () => void;
}

const downloadBlob = (blob: Blob, fileName: string) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
};

export const useContractMutations = (options?: ContractMutationOptions) => {
    const { t } = useTranslation('contracts');

    const addContractMutation = useMutation({
        mutationFn: async (request: FormData): Promise<void> => {
            await api.post(ADD_CONTRACT, request);
        },
        onSuccess: async () => {
            showSuccessNotification(t("notifications.addContractTitle"), t("notifications.addSuccess"));
            await options?.onAddSuccess?.();
        },
        onError: (error) => {
            showErrorNotification(t("notifications.addContractTitle"), error, t("notifications.addError"));
        },
    });

    const signContractMutation = useMutation({
        mutationFn: async (request: FormData): Promise<void> => {
            await api.post(ADD_SIGNATURE, request);
        },
        onSuccess: async () => {
            showSuccessNotification(t("notifications.signTitle"), t("notifications.signSuccess"));
            await options?.onSignSuccess?.();
        },
        onError: (error) => {
            showErrorNotification(t("notifications.signTitle"), error, t("notifications.signError"));
        },
    });

    const downloadPdfMutation = useMutation({
        mutationFn: async (fileName: string): Promise<Blob> => {
            const response = await api.get<Blob>(DOWNLOAD_PDF, {
                params: { fileName },
                responseType: "blob",
            });
            return response.data;
        },
        onSuccess: (blob, fileName) => {
            downloadBlob(blob, fileName);
            options?.onDownloadSuccess?.();
        },
        onError: (error) => {
            showErrorNotification(t("notifications.downloadTitle"), error, t("notifications.downloadError"));
        },
    });

    return {
        addContract: addContractMutation.mutateAsync,
        isAddingContract: addContractMutation.isPending,
        signContract: signContractMutation.mutateAsync,
        isSigningContract: signContractMutation.isPending,
        downloadPdf: downloadPdfMutation.mutateAsync,
        isDownloadingPdf: downloadPdfMutation.isPending,
    };
};