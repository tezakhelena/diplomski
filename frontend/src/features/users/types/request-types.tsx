import { SortDirection } from "../../../types/values";

export interface UserFilterRequest {
    firstName: string;
    lastName: string;
    username: string;
    statusId: number;
    roleId: number;
    privateUser: boolean;
    businessTypeId: number;
    sortDirection?: SortDirection;
    search?: string;
}

export interface UpdateProfileRequest {
    userId: number;
    firstName: string;
    lastName: string;
    countyId: number;
    city: string;
    statusId: number;
    roleId: number;
    username: string;
    email: string;
    phoneNumber: string;
    oldPassword?: string;
    newPassword?: string;
    contactVisible: boolean;
    comment: string;
}

export interface UpdatePreferenceRequest {
    userId: number;
    type: number;
    receiveNotification: boolean;
}