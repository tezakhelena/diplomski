import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { REPLY_TO_PET_AD_CONTACT, SEND_PET_AD_CONTACT } from "../../../utils/constants";
import { showErrorNotification, showSuccessNotification } from "../../../utils/notificationUtils";
import { SendPetAdContactRequest } from "../types/request-types";

type PetAdContactAction = "send" | "reply";

interface PetAdContactMutationRequest { action: PetAdContactAction; request: SendPetAdContactRequest; }

interface MutationOptions { onSendSuccess?: () => void; onReplySuccess?: () => void; }

export const usePetAdContactMutations = (options?: MutationOptions) => {
    const { t } = useTranslation("petAdContact");
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ action, request }: PetAdContactMutationRequest) => {
            const url = action === "send" ? SEND_PET_AD_CONTACT : REPLY_TO_PET_AD_CONTACT;
            return axios.post(url, request);
        },
        onSuccess: (_, variables) => {
            const isSend = variables.action === "send";
            showSuccessNotification(
                isSend ? t("notifications.success.sent") : t("notifications.success.replied"),
                isSend ? t("notifications.success.sentDesc") : t("notifications.success.repliedDesc")
            );
            queryClient.invalidateQueries({ queryKey: ["pet-ad-contacts"] });
            queryClient.invalidateQueries({ queryKey: ["pet-ad-contact-detail"] });
            isSend ? options?.onSendSuccess?.() : options?.onReplySuccess?.();
        },
        onError: (error, variables) => {
            const isSend = variables.action === "send";
            showErrorNotification(
                isSend ? t("notifications.error.send") : t("notifications.error.reply"),
                error,
                isSend ? t("notifications.error.sendDesc") : t("notifications.error.replyDesc")
            );
        },
    });

    return {
        sendContactMessage: (request: SendPetAdContactRequest) => mutation.mutateAsync({ action: "send", request }),
        replyToContactMessage: (request: SendPetAdContactRequest) => mutation.mutateAsync({ action: "reply", request }),
        isSending: mutation.isPending && mutation.variables?.action === "send",
        isReplying: mutation.isPending && mutation.variables?.action === "reply",
    };
};