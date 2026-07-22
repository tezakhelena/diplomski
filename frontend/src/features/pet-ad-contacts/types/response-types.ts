import { Moment } from "moment";

export interface PetAdContactResponse {
    contactId: number;
    petAdId: number;

    senderId: number;
    receiverId: number;

    subject: string;
    message: string;

    answer?: string;
    createdAt: Moment;
    repliedAt?: Moment;

    isRead: boolean;

    contactUserId: number;
    contactUsername: string;
    contactUserProfilePicture?: string;

    petAdTitle: string;
}

export interface PetAdContactDetailResponse {
    id: number;
    petAdId: number;

    senderId: number;
    receiverId: number;

    subject: string;
    message: string;

    createdAt: Moment;

    answer?: string;
    repliedAt?: Moment;

    isRead: boolean;
}