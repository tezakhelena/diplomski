import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { HOME_PAGE_STATISTICS, REVIEWS } from "../../../utils/constants";
import { showErrorNotification } from "../../../utils/notificationUtils";
import { HomePageResponse, HomepageReviewResponse } from "../../admin/types/response-types";

interface UseHomePageOptions {
    enabled?: boolean;
}

export const useHomePageReviews = (options?: UseHomePageOptions) => {
    const { t } = useTranslation('homePage');

    const query = useQuery({
        queryKey: ["homePageReviews"],
        queryFn: async (): Promise<HomepageReviewResponse[]> => {
            try {
                const response = await axios.get<HomepageReviewResponse[]>(REVIEWS);
                return response.data;
            } catch (error) {
                showErrorNotification(t("errors.reviewsFetchTitle"), error, t("errors.reviewsFetch"));
                throw error;
            }
        },
        enabled: options?.enabled ?? true,
        retry: 0,
    });

    return {
        reviews: query.data ?? [],
        isLoadingReviews: query.isLoading,
        isFetchingReviews: query.isFetching,
        refetchReviews: query.refetch,
    };
};

export const useHomePageStatistics = (options?: UseHomePageOptions) => {
    const { t } = useTranslation('homePage');

    const query = useQuery({
        queryKey: ["homePageStatistics"],
        queryFn: async (): Promise<HomePageResponse> => {
            try {
                const response = await axios.get<HomePageResponse>(HOME_PAGE_STATISTICS);
                return response.data;
            } catch (error) {
                showErrorNotification(t("errors.statsFetchTitle"), error, t("errors.statsFetch"));
                throw error;
            }
        },
        enabled: options?.enabled ?? true,
        retry: 0,
    });

    return {
        statistics: query.data,
        isLoadingStatistics: query.isLoading,
        isFetchingStatistics: query.isFetching,
        refetchStatistics: query.refetch,
    };
};