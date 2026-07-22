import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterAdsRequest } from '../../features/pet-ads/types/request-types';
import { UserFilterRequest } from '../../features/users/types/request-types';
import { usersFilter, adsFilter } from './filteri';

export interface FiltersState {
    adsFilter: Partial<FilterAdsRequest>;
    usersFilter: Partial<UserFilterRequest>;
}

const initialState: FiltersState = {
    adsFilter: adsFilter,
    usersFilter: usersFilter
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilter<K extends keyof FiltersState>(
            state: FiltersState,
            action: PayloadAction<{ filterName: K; values: Partial<FiltersState[K]> }>
        ) {
            const { filterName, values } = action.payload;

            state[filterName] = {
                ...(state[filterName] ?? {}),
                ...values,
            };
        },
        resetFilter: () => initialState
    },
});

export const { resetFilter, setFilter } = filtersSlice.actions;

export default filtersSlice.reducer;
