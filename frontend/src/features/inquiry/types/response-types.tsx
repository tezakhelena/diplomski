import { Moment } from "moment";

export interface InquiryResponse {
    inquiryId: number;
    userId: number;
    username: string;
    userProfilePicture: string;
    responderId: number;
    responderUsername: string;
    responderProfilePicture: string;
    question: string;
    answer: string;
    type: number;
    typeValue: string;
    createdAt: Moment;
    repliedAt: Moment;
}