import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { COMMENTS } from "../../../utils/constants";
import { showErrorNotification } from "../../../utils/notificationUtils";
import { AddCommentRequest } from "../types/request-types";
import { CommentResponse } from "../types/response-types";

export const useComments = (petAdId?: number) => {
    const { t } = useTranslation('comments');

    const query = useQuery({
        queryKey: ["komentari", petAdId],
        queryFn: async (): Promise<CommentResponse[]> => {
            try {
                const response = await axios.get<CommentResponse[]>(`${COMMENTS}/${petAdId}`);
                return response.data;
            } catch (error) {
                showErrorNotification(t("notifications.fetchError.title"), error, t("notifications.fetchError.message"));
                throw error;
            }
        },
        enabled: !!petAdId,
        retry: 0,
    });

    return {
        komentari: query.data ?? [],
        isLoading: query.isLoading,
        refetchKomentari: query.refetch,
    };
};

export const useCommentMutations = (petAdId?: number) => {
    const { t } = useTranslation('comments');
    const queryClient = useQueryClient();

    const addCommentMutation = useMutation({
        mutationFn: (request: Partial<AddCommentRequest>) => axios.post(COMMENTS, request),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["komentari", petAdId] });
        },
        onError: (error) => {
            showErrorNotification(t("notifications.postError.title"), error, t("notifications.postError.message"));
        },
    });

    return {
        addComment: addCommentMutation.mutateAsync,
        isAdding: addCommentMutation.isPending,
    };
};