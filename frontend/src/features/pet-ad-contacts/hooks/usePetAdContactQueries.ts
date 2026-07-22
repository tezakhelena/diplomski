import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { PET_AD_CONTACTS } from "../../../utils/constants";
import { removeEmptyFilters } from "../../../utils/formatters";
import { showErrorNotification } from "../../../utils/notificationUtils";
import { PetAdContactFilterRequest } from "../types/request-types";
import { PetAdContactDetailResponse, PetAdContactResponse } from "../types/response-types";

interface UseContactOptions { enabled?: boolean; }

export const usePetAdContacts = (params: Partial<PetAdContactFilterRequest>, options?: UseContactOptions) => {
    const { t } = useTranslation("petAdContact");
    const activeFilters = useMemo(() => removeEmptyFilters(params), [params]);
    const query = useQuery({
        queryKey: ["contacts", activeFilters],
        queryFn: async (): Promise<PetAdContactResponse[]> => {
            try {
                const { data } = await axios.post<PetAdContactResponse[]>(PET_AD_CONTACTS, params);
                return data;
            } catch (error) {
                showErrorNotification(t("notifications.error.fetchMessage"), error, t("notifications.error.fetchMessageDesc"));
                throw error;
            }
        },
        enabled: options?.enabled ?? true,
        retry: 0,
    });
    return { contacts: query.data ?? [], isLoading: query.isLoading, isFetching: query.isFetching, isError: query.isError, refetch: query.refetch };
};

export const usePetAdContactDetail = (contactId?: number, userId?: number, options?: UseContactOptions) => {
    const { t } = useTranslation("petAdContact");
    const query = useQuery({
        queryKey: ["contact-detail", contactId, userId],
        queryFn: async (): Promise<PetAdContactDetailResponse> => {
            try {
                const { data } = await axios.get<PetAdContactDetailResponse>(`${PET_AD_CONTACTS}/${contactId}/${userId}`);
                return data;
            } catch (error) {
                showErrorNotification(t("notifications.error.fetchDetail"), error, t("notifications.error.fetchDetailDesc"));
                throw error;
            }
        },
        enabled: (options?.enabled ?? true) && !!contactId && !!userId,
        retry: 0,
        refetchOnWindowFocus: false,
    });
    return { details: query.data, isLoading: query.isLoading, isFetching: query.isFetching, refetch: query.refetch };
};