import { SortDirection } from "../../../types/values";

export interface AdoptionRequest{
    filterBy: string;
    userId: number;
    sortDirection?: SortDirection;
    statusId?: number;
    search?: string;
}

export interface AdoptionSubmissionRequest{
    userId: number;
    environment: string;
    reason: string;
    experience: string;
    petAdId: number;
    householdMembers: string;
    schedule: string;
    allergies: string;
    address: string;
}

export interface AdoptionChangeStatusRequest{
    statusId: number;
    adoptionId: number;
    reason: string;
    signViaApp: boolean;
}