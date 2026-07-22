import { SortDirection } from "../../../types/values";

export interface InquiryRequest {
    inquiryId: number;
    userId: number;
    responderId: number;
    question: string;
    answer: string;
    type: number;
}

export interface InquiryFilterRequest {
    userId?: number;
    type?: number;
    sortDirection?: SortDirection;
    search?: string;
}