import { FilterAdsRequest } from "../../features/pet-ads/types/request-types";
import { UserFilterRequest } from "../../features/users/types/request-types";

export const adsFilter: Partial<FilterAdsRequest> = {
    categoryId: undefined,
    speciesId: undefined,
    countyId: undefined,
    maturity: undefined,
    gender: undefined,
    breedId: undefined,
}

export const usersFilter: Partial<UserFilterRequest> = {
    firstName: undefined,
    lastName: undefined,
    username: undefined,
    statusId: undefined,
    roleId: undefined,
    privateUser: undefined,
    businessTypeId: undefined,
    search: undefined,
}