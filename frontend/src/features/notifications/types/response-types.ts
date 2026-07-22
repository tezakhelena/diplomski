import { Moment } from "moment";

export interface NotificationResponse{
    notificationId: number;
    notification: string;
    userId: number;
    isRead: number;
    type: number;
    createdAt: Moment;
    content: string;
    petAdId: number;
}