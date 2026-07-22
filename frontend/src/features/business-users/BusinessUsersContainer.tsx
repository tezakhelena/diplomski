import { useMemo, useState } from "react";
import { SortDirection } from "../../types/values";
import { useUsers } from "../users/hooks/useUsersQuery";
import { BusinessUsers } from "./components/BusinessUsers";

interface FilterState {
    searchInput: string;
    activeSearch: string;
    businessTypeId?: number;
    sortDirection: SortDirection;
}

export const BusinessUsersContainer = () => {
    const [filters, setFilters] = useState<FilterState>({
        searchInput: "",
        activeSearch: "",
        businessTypeId: undefined,
        sortDirection: "DESC",
    });

    const updateFilters = (newValues: Partial<FilterState>) => {
        setFilters((prev) => ({ ...prev, ...newValues }));
    };

    const request = useMemo(() => ({
        privateUser: false,
        search: filters.activeSearch.trim() || undefined,
        businessTypeId: filters.businessTypeId,
        sortDirection: filters.sortDirection,
    }), [filters.activeSearch, filters.businessTypeId, filters.sortDirection]);

    const { users, isLoading } = useUsers(request);

    return (
        <BusinessUsers
            data={users}
            isLoading={isLoading}
            searchInput={filters.searchInput}
            setSearchInput={(val) => updateFilters({ searchInput: val })}
            onSearch={() => updateFilters({ activeSearch: filters.searchInput })}
            onClearSearch={() => updateFilters({ searchInput: "", activeSearch: "" })}
            businessTypeId={filters.businessTypeId}
            setBusinessTypeId={(val) => updateFilters({ businessTypeId: val })}
            sortDirection={filters.sortDirection}
            setSortDirection={(val) => updateFilters({ sortDirection: val })}
        />
    );
};