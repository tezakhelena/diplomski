import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { SortDirection } from "../../types/values";
import { usePetAdContacts } from "./hooks/usePetAdContactQueries";
import { PetAdContacts } from "./components/PetAdContacts";

interface FilterState {
    searchInput: string;
    activeSearch: string;
    sortDirection: SortDirection;
}

export const PetAdContactsContainer = () => {
    const { userId } = useSelector((state: RootState) => state.auth);
    
    const [filters, setFilters] = useState<FilterState>({
        searchInput: "",
        activeSearch: "",
        sortDirection: "DESC",
    });

    const updateFilters = (newValues: Partial<FilterState>) => {
        setFilters((prev) => ({ ...prev, ...newValues }));
    };

    const requestParams = useMemo(() => ({
        userId,
        sortDirection: filters.sortDirection,
        search: filters.activeSearch.trim() || undefined,
    }), [userId, filters.sortDirection, filters.activeSearch]);

    const { contacts: receivedContacts, isLoading: isReceivedLoading } = usePetAdContacts({
        ...requestParams,
        filterBy: "zaprimljeno",
    });

    const { contacts: sentContacts, isLoading: isSentLoading } = usePetAdContacts({
        ...requestParams,
        filterBy: "poslano",
    });

    return (
        <PetAdContacts
            receivedContacts={receivedContacts}
            sentContacts={sentContacts}
            filters={filters}
            updateFilters={updateFilters}
            isLoading={isReceivedLoading || isSentLoading}
        />
    );
};