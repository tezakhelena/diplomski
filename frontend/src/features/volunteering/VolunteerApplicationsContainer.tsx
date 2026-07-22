import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { SortDirection } from "../../types/values";
import { useVolunteerApplications } from "./hooks/useVolunteeringQueries";
import { VolunteerApplicationsOverview } from "./components/overview/VolunteerApplicationsOverview";

interface FilterState {
    searchInput: string;
    activeSearch: string;
    statusId?: number;
    sortDirection: SortDirection;
    volunteerType?: number;
}

export const VolunteerApplicationsContainer = () => {
    const { userId } = useSelector((state: RootState) => state.auth);
    const [filters, setFilters] = useState<FilterState>({
        searchInput: "",
        activeSearch: "",
        statusId: undefined,
        sortDirection: "DESC",
        volunteerType: undefined
    });

    const updateFilters = (newValues: Partial<FilterState>) => {
        setFilters((prev) => ({ ...prev, ...newValues }));
    };

    const requestParams = useMemo(() => ({
        userId,
        sortDirection: filters.sortDirection,
        statusId: filters.statusId,
        volunteerType: filters.volunteerType,
        search: filters.activeSearch.trim() || undefined,
    }), [userId, filters.sortDirection, filters.statusId, filters.activeSearch, filters.volunteerType]);

    const { applications: zaprimljeno, isLoading: isLoadingZaprimljeno } =
        useVolunteerApplications({ ...requestParams, filterBy: "poduzece" }, { enabled: !!userId });

    const { applications: poslano, isLoading: isLoadingPoslano } =
        useVolunteerApplications({ ...requestParams, filterBy: "podnositelj" }, { enabled: !!userId });

    return (
        <VolunteerApplicationsOverview
            poslano={poslano || []}
            zaprimljeno={zaprimljeno || []}
            isLoading={isLoadingZaprimljeno || isLoadingPoslano}
            filters={filters}
            updateFilters={updateFilters}
        />
    );
};