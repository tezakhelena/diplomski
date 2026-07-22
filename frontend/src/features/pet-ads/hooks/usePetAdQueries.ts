import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { GET_LATEST_ADS, GET_PET_ADS } from "../../../utils/constants";
import { FilterAdsRequest } from "../types/request-types";
import { PetAdDetailResponse, PetAdResponse } from "../types/response-types";
import { showErrorNotification } from "../../../utils/notificationUtils";
import { removeEmptyFilters } from "../../../utils/formatters";

interface UsePetAdsOptions {
    enabled?: boolean;
}

export const usePetAds = (
    filters?: Partial<FilterAdsRequest>,
    options?: UsePetAdsOptions
) => {
    const { t } = useTranslation("petAd");
    const activeFilters = useMemo(() => removeEmptyFilters(filters), [filters]);

    const query = useQuery({
        queryKey: ["petAds", activeFilters],
        queryFn: async (): Promise<PetAdResponse[]> => {
            try {
                const response = await axios.post<PetAdResponse[]>(
                    GET_PET_ADS,
                    activeFilters
                );
                return response.data;
            } catch (error) {
                showErrorNotification(
                    t("notifications.fetch.adsTitle"),
                    error,
                    t("notifications.fetch.adsError")
                );
                throw error;
            }
        },
        enabled: options?.enabled ?? true,
        retry: 0,
    });

    return {
        data: query.data ?? [],
        isLoading: query.isLoading,
        isFetching: query.isFetching,
        isError: query.isError,
        error: query.error,
        refetch: query.refetch,
        activeFilters,
    };
};

export const usePetAdDetails = (petAdId?: number, options?: UsePetAdsOptions) => {
    const { t } = useTranslation("petAd");

    const query = useQuery({
        queryKey: ["petAdDetails", petAdId],
        queryFn: async (): Promise<PetAdDetailResponse> => {
            try {
                const response = await axios.get<PetAdDetailResponse>(
                    `${GET_PET_ADS}/details/${petAdId}`
                );
                return response.data;
            } catch (error) {
                showErrorNotification(
                    t("notifications.fetch.detailsTitle"),
                    error,
                    t("notifications.fetch.detailsError")
                );
                throw error;
            }
        },
        enabled: (options?.enabled ?? true) && !!petAdId,
        retry: 0,
        refetchOnWindowFocus: false,
    });

    return {
        petAdDetails: query.data,
        isLoading: query.isLoading,
        isFetching: query.isFetching,
        refetchPetAdDetails: query.refetch,
    };
};

export const useLatestPetAds = (options?: UsePetAdsOptions) => {
    const { t } = useTranslation("petAd");

    const query = useQuery({
        queryKey: ["latestAds"],
        queryFn: async (): Promise<PetAdResponse[]> => {
            try {
                const response = await axios.get<PetAdResponse[]>(GET_LATEST_ADS);
                return response.data;
            } catch (error) {
                showErrorNotification(
                    t("notifications.fetch.adsTitle"),
                    error,
                    t("notifications.fetch.latestAdsError")
                );
                throw error;
            }
        },
        enabled: options?.enabled ?? true,
        retry: 0,
    });

    return {
        latestAds: query.data ?? [],
        isLoading: query.isLoading,
        isFetching: query.isFetching,
    };
};