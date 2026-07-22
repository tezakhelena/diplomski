import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { CHANGE_APPLICATION_STATUS, SEND_APPLICATION } from "../../../utils/constants";
import { showErrorNotification, showSuccessNotification } from "../../../utils/notificationUtils";
import { VolunteerApplicationRequest } from "../types/request-types";

interface SendApplicationVariables {
    action: "sendApplication";
    request: VolunteerApplicationRequest;
}

interface ChangeStatusVariables {
    action: "changeStatus";
    volunteeringId: number;
    statusId: number;
}

type VolunteeringMutationVariables = SendApplicationVariables | ChangeStatusVariables;

export const useVolunteeringMutations = () => {
    const { t } = useTranslation("volunteer");
    const queryClient = useQueryClient();

    const volunteeringMutation = useMutation({
        mutationFn: (variables: VolunteeringMutationVariables) => {
            if (variables.action === "sendApplication") {
                return axios.post(SEND_APPLICATION, variables.request);
            }

            return axios.post(CHANGE_APPLICATION_STATUS, {
                volunteeringId: variables.volunteeringId,
                statusId: variables.statusId,
            });
        },

        onSuccess: async (_, variables) => {
            await queryClient.invalidateQueries({ queryKey: ["volunteerApplications"] });

            if (variables.action === "changeStatus") {
                await queryClient.invalidateQueries({
                    queryKey: ["volunteerApplicationDetails", variables.volunteeringId],
                });
            }

            const isSending = variables.action === "sendApplication";

            showSuccessNotification(
                isSending ? t("notifications.sendApplication.successTitle") : t("notifications.changeStatus.title"),
                isSending
                    ? t("notifications.sendApplication.successDescription")
                    : t("notifications.changeStatus.successDescription"),
            );
        },

        onError: (error, variables) => {
            const isSending = variables.action === "sendApplication";

            showErrorNotification(
                isSending ? t("notifications.sendApplication.errorTitle") : t("notifications.changeStatus.title"),
                error,
                isSending
                    ? t("notifications.sendApplication.errorDescription")
                    : t("notifications.changeStatus.errorDescription"),
            );
        },
    });

    return {
        sendApplication: (request: VolunteerApplicationRequest) =>
            volunteeringMutation.mutateAsync({ action: "sendApplication", request }),

        changeApplicationStatus: (volunteeringId: number, statusId: number) =>
            volunteeringMutation.mutateAsync({ action: "changeStatus", volunteeringId, statusId }),

        isSendingApplication:
            volunteeringMutation.isPending &&
            volunteeringMutation.variables?.action === "sendApplication",

        isChangingStatus:
            volunteeringMutation.isPending &&
            volunteeringMutation.variables?.action === "changeStatus",
    };
};