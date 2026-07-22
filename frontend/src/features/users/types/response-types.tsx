import { Moment } from "moment";

export interface Role {
    id: number;
    name: string;
}

export interface UserHistory {
    id: number;
    userId: number;
    content: string;
    createdAt: Moment;
    createdBy: number;
    notification: string;
    isRead: number;
    type: number;
    petAdId: number;
}

export interface UserDetailsResponse {
    userId: number;
    username: string;
    firstName: string;
    lastName: string;
    status: string;
    role: string;
    roleId: number;
    registrationDate: Moment;
    privateUser: boolean;
    profilePictureUrl: string;
    city: string;
    county: string;
    countyId: number;
    lastLogin: Moment;
    userHistory: UserHistory[];
    email: string;
    phoneNumber: string;
    emailVerified: boolean;
    contactVisible: boolean;
    businessUserType: string;
    businessTypeId: number;
    oib: string;
    website: string;
    statusId: number;
}

export interface UsersResponse{
    userId: number;
    firstName: string;
    lastName: string;
    username: string;
    roleName: string;
    status: string;
    profilePictureUrl: string;
    registrationDate: Moment;
    reason: string;
    statusId: number;
    privateUser: boolean;
    businessTypeId: number;
    website: string;
    email: string;
}