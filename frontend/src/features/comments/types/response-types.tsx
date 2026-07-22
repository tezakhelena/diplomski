import { Moment } from "moment";

export interface CommentResponse {
    commentId: number;
    content: string;
    username: string;
    profilePictureUrl: string;
    createdAt: Moment;
}