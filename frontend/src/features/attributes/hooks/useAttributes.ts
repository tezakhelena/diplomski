import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AttributeResponse } from "../types/response-types";
import { GET_BREEDS, GET_BUSINESS_TYPES, GET_CATEGORIES, GET_COUNTIES, GET_ROLES, GET_SPECIES, GET_STATUSES_BY_TYPE } from "../../../utils/constants";

const QUERY_CONFIG = {
    retry: 0,
    staleTime: 1000 * 60 * 30,
};

export const useCategories = () => useQuery({
    queryKey: ["attributes", "categories"],
    queryFn: async () => (await axios.get<AttributeResponse[]>(GET_CATEGORIES)).data,
    ...QUERY_CONFIG
});

export const useSpecies = () => useQuery({
    queryKey: ["attributes", "species"],
    queryFn: async () => (await axios.get<AttributeResponse[]>(GET_SPECIES)).data,
    ...QUERY_CONFIG
});

export const useCounties = () => useQuery({
    queryKey: ["attributes", "counties"],
    queryFn: async () => (await axios.get<AttributeResponse[]>(GET_COUNTIES)).data,
    ...QUERY_CONFIG
});

export const useBreeds = (speciesId?: number) => useQuery({
    queryKey: ["attributes", "breeds", speciesId],
    queryFn: async () => (await axios.get<AttributeResponse[]>(`${GET_BREEDS}${speciesId}`)).data,
    enabled: !!speciesId,
    ...QUERY_CONFIG
});

export const useStatuses = (statusType?: number) => useQuery({
    queryKey: ["attributes", "statuses", statusType],
    queryFn: async () => (await axios.get<AttributeResponse[]>(`${GET_STATUSES_BY_TYPE}${statusType}`)).data,
    enabled: !!statusType,
    ...QUERY_CONFIG
});

export const useRoles = () => useQuery({
    queryKey: ["attributes", "roles"],
    queryFn: async () => (await axios.get<AttributeResponse[]>(GET_ROLES)).data,
    ...QUERY_CONFIG
});

export const useBusinessTypes = () => useQuery({
    queryKey: ["attributes", "business-types"],
    queryFn: async () => (await axios.get<AttributeResponse[]>(GET_BUSINESS_TYPES)).data,
    ...QUERY_CONFIG
});