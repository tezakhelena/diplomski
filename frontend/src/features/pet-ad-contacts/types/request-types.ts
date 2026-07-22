import { SortDirection } from "../../../types/values";

export type PetAdContactFilterBy = "zaprimljeno" | "poslano";

export interface PetAdContactFilterRequest {
    userId: number;
    filterBy: PetAdContactFilterBy;
    sortDirection: SortDirection;
    search?: string;
}

export interface SendPetAdContactRequest {
    contactId?: number;

    petAdId?: number;
    senderId?: number;
    receiverId?: number;

    subject?: string;
    message?: string;
    answer?: string;
}