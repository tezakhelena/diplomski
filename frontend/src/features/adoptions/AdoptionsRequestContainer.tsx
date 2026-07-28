import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { SortDirection } from "../../types/values";
import { MyRequestedAdoptions } from "./components/MyRequestedAdoptions";
import { useAdoptionRequests } from "./hooks/useAdoptionQueries";
import useKorisnik from "../../hooks/useKorisnik";

interface FilterState {
    searchInput: string;
    activeSearch: string;
    statusId?: number;
    sortDirection: SortDirection;
}

export const AdoptionsRequestContainer = () => {
    const { userId } = useSelector((state: RootState) => state.auth);
    const { isAdmin } = useKorisnik();

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

    const commonRequestParams = useMemo(() => ({
        sortDirection: filters.sortDirection,
        statusId: filters.statusId,
        search: filters.activeSearch.trim() || undefined,
    }), [filters.sortDirection, filters.statusId, filters.activeSearch]);

    const { requests: zaprimljeni, isLoading: isZaprimljeniLoading } = useAdoptionRequests(
        { ...requestParams, filterBy: "owner" },
    );

    const { requests: podneseni, isLoading: isPodneseniLoading } = useAdoptionRequests(
        { ...requestParams, filterBy: "applicant" },
    );

    const { requests: sviZahtjevi, isLoading: isAdminLoading } = useAdoptionRequests(commonRequestParams, { enabled: isAdmin() });

    return (
        <MyRequestedAdoptions
            isAdmin={isAdmin()}
            sviZahtjevi={sviZahtjevi || []}
            zaprimljeni={zaprimljeni || []}
            podneseni={podneseni || []}
            isLoading={isZaprimljeniLoading || isPodneseniLoading || isAdminLoading}
            filters={filters}
            updateFilters={updateFilters}
        />
    );
};