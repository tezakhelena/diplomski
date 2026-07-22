import { Moment } from "moment";

export interface PetAdCardData {
    petAdId: number;
    primaryImage?: string;
    county?: string;
    city?: string;
    gender?: string;
    maturity?: string;
    breed?: string;
    category?: string;
    categoryId?: number;
    createdAt: Moment;
    generatedTitle?: string;
    statusId: number;
}