import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { REPLY_TO_INQUIRY, SEND_INQUIRY } from "../../../utils/constants";
import { showErrorNotification, showSuccessNotification } from "../../../utils/notificationUtils";
import { InquiryRequest } from "../types/request-types";
import { api } from "../../../utils/api";

type InquiryAction = "send" | "reply";

interface InquiryMutationRequest {
    action: InquiryAction;
    request: Partial<InquiryRequest>;
}

export const useInquiryMutations = () => {
    const { t } = useTranslation("inquiries");
    const queryClient = useQueryClient();

    const inquiryMutation = useMutation({
        mutationFn: ({ action, request }: InquiryMutationRequest) => {
            const url = action === "send" ? SEND_INQUIRY : REPLY_TO_INQUIRY;
            return api.post(url, request);
        },
        onSuccess: (_, variables) => {
            const isSend = variables.action === "send";
            showSuccessNotification(
                isSend ? t("notifications.success.inquirySent") : t("notifications.success.replySent"),
                isSend ? t("notifications.success.inquirySentDesc") : t("notifications.success.replySentDesc")
            );
            queryClient.invalidateQueries({ queryKey: ["inquiries"] });
        },
        onError: (error, variables) => {
            showErrorNotification(
                variables.action === "send" ? t("notifications.success.inquirySent") : t("notifications.success.replySent"),
                error,
                variables.action === "send" ? t("notifications.error.sendInquiry") : t("notifications.error.sendReply")
            );
        },
    });

    return {
        sendInquiry: (request: Partial<InquiryRequest>) => inquiryMutation.mutateAsync({ action: "send", request }),
        replyToInquiry: (request: Partial<InquiryRequest>) => inquiryMutation.mutateAsync({ action: "reply", request }),
        isSendingInquiry: inquiryMutation.isPending && inquiryMutation.variables?.action === "send",
        isReplyingToInquiry: inquiryMutation.isPending && inquiryMutation.variables?.action === "reply",
        replyingInquiryId: inquiryMutation.isPending && inquiryMutation.variables?.action === "reply" ? inquiryMutation.variables.request.inquiryId : null,
    };
};