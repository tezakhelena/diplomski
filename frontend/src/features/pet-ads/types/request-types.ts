import { Moment } from "moment";
import { SortDirection } from "../../../types/values";

export interface FilterAdsRequest {
    statusId: number;
    categoryId: number;
    speciesId: number;
    countyId: number;
    petAdId: number;
    userId: number;
    gender: string;
    maturity: string;
    breedId: number;
    sortDirection?: SortDirection;
}

export interface SaveAdRequest {
    petAdId: number;
    categoryId: number;
    countyId: number;
    speciesId: number;
    forceCreate: boolean;
    city: string;
    missingDate: Moment;
    statusId: number;
    notes: string;
    userId: number;
    gender: string;
    maturity: string;
    breedId: number;
    petName: string;
    furColor: string;
    reward: number;
}

export interface ReportAdRequest {
    petAdId: number;
    comment: string;
    statusId: number;
    userId: number;
}

export interface ChangeAdStatusRequest {
    petAdId: number;
    reasonCode: number;
    userId: number;
    rate: number;
    statusId: number;
    comment: string;
}