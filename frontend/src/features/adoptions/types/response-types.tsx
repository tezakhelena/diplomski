import { Moment } from "moment";
import { AdoptionContractResponse } from "../../contracts/types/response-types";

export interface AdoptionRequestsResponse {
    adoptionId: number;
    petAdId: number;
    createdAt: Moment;

    applicantId: number;
    applicantUsername: string;
    applicantProfilePicture: string;

    adOwnerId: number;
    adOwnerUsername: string;
    adOwnerProfilePicture: string;

    statusId: number;
    statusValue: string;
}

export interface AdoptionRequestDetailResponse {
    id: number;
    userId: number;
    petAdId: number;
    adOwnerId: number;
    createdAt: Moment;
    environment: string;
    reason: string;
    experience: string;
    householdMembers: string;
    schedule: string;
    allergies: string;
    address: string;
    statusId: number;
    statusValue: string;
    contract: AdoptionContractResponse;
}