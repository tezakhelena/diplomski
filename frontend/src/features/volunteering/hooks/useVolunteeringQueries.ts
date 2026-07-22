import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { GET_VOLUNTEERING } from "../../../utils/constants";
import { showErrorNotification } from "../../../utils/notificationUtils";
import {
    AdoptionFilterRequest,
    VolunteerApplicationDetailsResponse,
    VolunteerApplicationResponse,
} from "../types/request-types";
import { removeEmptyFilters } from "../../../utils/formatters";

interface UseVolunteeringOptions {
    enabled?: boolean;
}

export const useVolunteerApplications = (
    filters?: Partial<AdoptionFilterRequest>,
    options?: UseVolunteeringOptions,
) => {
    const { t } = useTranslation("volunteer");
    const activeFilters = useMemo(() => removeEmptyFilters(filters), [filters]);

    const query = useQuery({
        queryKey: ["volunteerApplications", activeFilters],
        queryFn: async (): Promise<VolunteerApplicationResponse[]> => {
            try {
                const response = await axios.post<VolunteerApplicationResponse[]>(
                    GET_VOLUNTEERING,
                    activeFilters,
                );
                return response.data;
            } catch (error) {
                showErrorNotification(
                    t("notifications.fetchApplications.title"),
                    error,
                    t("notifications.fetchApplications.description"),
                );
                throw error;
            }
        },
        enabled: options?.enabled ?? true,
        retry: 0,
    });

    return {
        applications: query.data ?? [],
        isLoading: query.isLoading,
        isFetching: query.isFetching,
        isError: query.isError,
        error: query.error,
        refetch: query.refetch,
        activeFilters,
    };
};

export const useVolunteerApplicationDetails = (
    volunteeringId?: number,
    options?: UseVolunteeringOptions,
) => {
    const { t } = useTranslation("volunteer");

    const query = useQuery({
        queryKey: ["volunteerApplicationDetails", volunteeringId],
        queryFn: async (): Promise<VolunteerApplicationDetailsResponse> => {
            try {
                const response = await axios.get<VolunteerApplicationDetailsResponse>(
                    `${GET_VOLUNTEERING}/${volunteeringId}`,
                );
                return response.data;
            } catch (error) {
                showErrorNotification(
                    t("notifications.fetchDetails.title"),
                    error,
                    t("notifications.fetchDetails.description"),
                );
                throw error;
            }
        },
        enabled: (options?.enabled ?? true) && !!volunteeringId,
        retry: 0,
        refetchOnWindowFocus: false,
    });

    return {
        details: query.data,
        isLoading: query.isLoading,
        isFetching: query.isFetching,
        refetchDetails: query.refetch,
    };
};