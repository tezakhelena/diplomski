import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { ADD_ATTRIBUTE, DELETE_ATTRIBUTE, GET_ALL_ATTRIBUTES, UPDATE_ATTRIBUTE } from "../../../utils/constants";
import { showErrorNotification, showSuccessNotification } from "../../../utils/notificationUtils";
import { Attribute } from "../types/response-types";
import { useMemo } from "react";
import { removeEmptyFilters } from "../../../utils/formatters";
import { AttributeFilterRequest } from "../types/request-types";

export const useAllAttributes = (params: Partial<AttributeFilterRequest>) => {
    const { t } = useTranslation('attributes');
    const activeFilters = useMemo(() => removeEmptyFilters(params), [params]);
    const query = useQuery({
        queryKey: ["all-attributes", activeFilters],
        queryFn: async (): Promise<Attribute[]> => {
            try {
                const { data } = await axios.post<Attribute[]>(GET_ALL_ATTRIBUTES, params);
                return data;
            } catch (error) {
                showErrorNotification(t('notifications.fetchError'), error, t('notifications.fetchErrorMessage'));
                throw error;
            }
        },
        retry: 0,
    });
    return { data: query.data ?? [], isLoading: query.isLoading, isFetching: query.isFetching, isError: query.isError, refetch: query.refetch };
};

export const useAttributeMutations = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation('attributes');

    const addMutation = useMutation({
        mutationFn: (data: Attribute) => axios.post(ADD_ATTRIBUTE, data),
        onSuccess: () => {
            showSuccessNotification(t('notifications.addTitle'), t('notifications.addSuccess'));
            queryClient.invalidateQueries({ queryKey: ["all-attributes"] });
        },
        onError: (err) => showErrorNotification(t('notifications.addTitle'), err, t('notifications.addError'))
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: number, data: Attribute }) => axios.put(`${UPDATE_ATTRIBUTE}${id}`, data),
        onSuccess: () => {
            showSuccessNotification(t('notifications.updateTitle'), t('notifications.updateSuccess'));
            queryClient.invalidateQueries({ queryKey: ["all-attributes"] });
        },
        onError: (err) => showErrorNotification(t('notifications.updateTitle'), err, t('notifications.updateError'))
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => axios.delete(`${DELETE_ATTRIBUTE}${id}`),
        onSuccess: () => {
            showSuccessNotification(t('notifications.deleteTitle'), t('notifications.deleteSuccess'));
            queryClient.invalidateQueries({ queryKey: ["all-attributes"] });
        },
        onError: (err) => showErrorNotification(t('notifications.deleteTitle'), err, t('notifications.deleteError'))
    });

    return { addAttribute: addMutation.mutateAsync, updateAttribute: updateMutation.mutateAsync, deleteAttribute: deleteMutation.mutateAsync, isPending: addMutation.isPending || updateMutation.isPending || deleteMutation.isPending };
};