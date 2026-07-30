import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { api } from "../../../utils/api";
import { GET_ADOPTION_REQUESTS, GET_ALL_ADOPTION_REQUESTS } from "../../../utils/constants";
import { removeEmptyFilters } from "../../../utils/formatters";
import { showErrorNotification } from "../../../utils/notificationUtils";
import { AdoptionRequest } from "../types/request-types";
import { AdoptionRequestDetailResponse, AdoptionRequestsResponse } from "../types/response-types";

interface UseAdoptionOptions {
    enabled?: boolean;
}

export const useAdoptionRequests = (
    params: Partial<AdoptionRequest>,
    options?: UseAdoptionOptions
) => {
    const { t } = useTranslation('adoption');

    const activeFilters = useMemo(() => removeEmptyFilters(params), [params]);
    const query = useQuery({
        queryKey: [
            "adoption-requests",
            activeFilters,
        ],
        queryFn: async (): Promise<AdoptionRequestsResponse[]> => {
            try {
                const { data } = await api.post<AdoptionRequestsResponse[]>(GET_ALL_ADOPTION_REQUESTS, params);
                return data;
            } catch (error) {
                showErrorNotification(
                    t('adoption.query.listErrorTitle'),
                    error,
                    t('adoption.query.listErrorDescription')
                );
                throw error;
            }
        },
        enabled: options?.enabled ?? true,
        retry: 0,
    });

    return {
        requests: query.data ?? [],
        isLoading: query.isLoading,
        isFetching: query.isFetching,
        isError: query.isError,
        refetch: query.refetch,
    };
};

export const useAdoptionDetails = (
    adoptionId?: number,
    userId?: number,
    options?: UseAdoptionOptions
) => {
    const { t } = useTranslation('adoption');

    const query = useQuery({
        queryKey: ["adoption-detail", adoptionId, userId],
        queryFn: async (): Promise<AdoptionRequestDetailResponse> => {
            try {
                const { data } = await api.get<AdoptionRequestDetailResponse>(
                    `${GET_ADOPTION_REQUESTS}/${adoptionId}/${userId}`
                );
                return data;
            } catch (error) {
                showErrorNotification(
                    t('adoption.query.detailsErrorTitle'),
                    error,
                    t('adoption.query.detailsErrorDescription')
                );
                throw error;
            }
        },
        enabled: (options?.enabled ?? true) && !!adoptionId && !!userId,
        retry: 0,
        refetchOnWindowFocus: false,
    });

    return {
        details: query.data,
        isLoading: query.isLoading,
        isFetching: query.isFetching,
        refetch: query.refetch,
    };
};