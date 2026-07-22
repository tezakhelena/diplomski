import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { INQUIRIES } from "../../../utils/constants";
import { showErrorNotification } from "../../../utils/notificationUtils";
import { InquiryFilterRequest } from "../types/request-types";
import { InquiryResponse } from "../types/response-types";
import { removeEmptyFilters } from "../../../utils/formatters";

interface UseInquiriesOptions {
    enabled?: boolean;
}

export const useInquiries = (filters?: Partial<InquiryFilterRequest>, options?: UseInquiriesOptions) => {
    const { t } = useTranslation("inquiries");
    const activeFilters = useMemo(() => removeEmptyFilters(filters), [filters]);

    const query = useQuery({
        queryKey: ["inquiries", activeFilters],
        queryFn: async (): Promise<InquiryResponse[]> => {
            try {
                const response = await axios.post<InquiryResponse[]>(INQUIRIES, activeFilters);
                return response.data;
            } catch (error) {
                showErrorNotification(t("notifications.error.fetchInquiriesTitle"), error, t("notifications.error.fetchInquiries"));
                throw error;
            }
        },
        enabled: options?.enabled ?? true,
        retry: 0,
    });

    return {
        inquiries: query.data ?? [],
        isLoading: query.isLoading,
        isFetching: query.isFetching,
        isError: query.isError,
        error: query.error,
        refetch: query.refetch,
        activeFilters,
    };
};