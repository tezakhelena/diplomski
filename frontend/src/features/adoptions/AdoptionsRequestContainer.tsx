import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { SortDirection } from "../../types/values";
import { MyRequestedAdoptions } from "./components/MyRequestedAdoptions";
import { useAdoptionRequests } from "./hooks/useAdoptionQueries";

interface FilterState {
    searchInput: string;
    activeSearch: string;
    statusId?: number;
    sortDirection: SortDirection;
}

export const AdoptionsRequestContainer = () => {
    const { userId } = useSelector((state: RootState) => state.auth);
    const [filters, setFilters] = useState<FilterState>({
        searchInput: "",
        activeSearch: "",
        statusId: undefined,
        sortDirection: "DESC",
    });

    const updateFilters = (newValues: Partial<FilterState>) => {
        setFilters((prev) => ({ ...prev, ...newValues }));
    };

    const requestParams = useMemo(() => ({
        userId,
        sortDirection: filters.sortDirection,
        statusId: filters.statusId,
        search: filters.activeSearch.trim() || undefined,
    }), [userId, filters.sortDirection, filters.statusId, filters.activeSearch]);

    const { requests: zaprimljeni, isLoading: isZaprimljeniLoading } = useAdoptionRequests(
        { ...requestParams, filterBy: "owner" },
    );

    const { requests: podneseni, isLoading: isPodneseniLoading } = useAdoptionRequests(
        { ...requestParams, filterBy: "applicant" },
    );

    return (
        <MyRequestedAdoptions
            zaprimljeni={zaprimljeni || []}
            podneseni={podneseni || []}
            isLoading={isZaprimljeniLoading || isPodneseniLoading}
            filters={filters}
            updateFilters={updateFilters}
        />
    );
};