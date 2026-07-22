import { Moment } from "moment";
import { SortDirection } from "../../../types/values";

export interface VolunteerApplicationRequest {
    organizationId: number;
    applicantId: number;
    motivation: string;
    availability: string;
    volunteerType: number;
    experience: string;
}

export interface AdoptionFilterRequest {
    filterBy: string;
    userId: number;
    sortDirection: SortDirection;
    search?: string;
}

export interface VolunteeringChangeStatusRequest {
    volunteeringId: number;
    statusId: number;
}

export interface VolunteerApplicationDetailsResponse {
    organizationId: number;
    applicantId: number;
    availability: string;
    motivation: string;
    appliedAtDate: Moment;
    volunteerType: string;
    experience: string;
    statusId: number;
    status: string;
}

export interface VolunteerApplicationResponse {
    volunteerId: number;
    volunteerType: string;
    organizationId: number;
    applicantId: number;
    appliedAtDate: Moment;
    statusId: number;
    status: string;
    applicantUsername: string
    organizationUsername: string
    applicantProfilePicture: string
    organizationProfilePicture: string
    applicantCity: string;
    organizationCity: string;
}