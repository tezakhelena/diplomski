import { notification } from "antd";
import axios from "axios";

export const getErrorDescription = (error: unknown, fallback: string): string => {
    if (!axios.isAxiosError(error)) return fallback;
    const backendError = error.response?.data?.message ?? error.response?.data;
    return typeof backendError === "string" ? backendError : fallback;
};

export const showErrorNotification = (title: string, error: unknown, fallback: string) => {
    notification.error({ message: title, description: getErrorDescription(error, fallback) });
};

export const showSuccessNotification = (title: string, description: string) => {
    notification.success({ message: title, description });
};