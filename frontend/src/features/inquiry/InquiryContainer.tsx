import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { SortDirection } from "../../types/values";
import { useInquiries } from "./hooks/useInquiryQueries";
import { Inquiries } from "./components/Inquiries";

interface FilterState {
    searchInput: string;
    activeSearch: string;
    typeFilter?: number;
    sortDirection: SortDirection;
}

export const InquiryContainer = () => {
    const auth = useSelector((state: RootState) => state.auth);

    const [filters, setFilters] = useState<FilterState>({
        searchInput: "",
        activeSearch: "",
        typeFilter: undefined,
        sortDirection: "DESC",
    });

    const updateFilters = (newValues: Partial<FilterState>) => {
        setFilters((prev) => ({ ...prev, ...newValues }));
    };

    const request = useMemo(
        () => ({
            type: filters.typeFilter,
            sortDirection: filters.sortDirection,
            search: filters.activeSearch.trim() || undefined
        }),
        [filters.activeSearch, filters.typeFilter, filters.activeSearch, filters.sortDirection]
    );

    const { inquiries: mojiUpiti, isLoading: isLoadingMojiUpiti } = useInquiries(
        {
            userId: auth.userId,
            ...request
        },
    );

    const { inquiries: upiti, isLoading: isLoadingUpiti } = useInquiries(request);

    return (
        <Inquiries
            upiti={upiti}
            mojiUpiti={mojiUpiti}
            userId={auth.userId}
            privateUser={auth.privateUser}
            filters={filters}
            updateFilters={updateFilters}
            isLoading={isLoadingUpiti || isLoadingMojiUpiti}
        />
    );
};