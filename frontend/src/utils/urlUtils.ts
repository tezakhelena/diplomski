import { backendBaseUrl } from "./constants";

export const getPdf = (pdfName?: string) => `${backendBaseUrl}/contracts/${pdfName}`;

export const getImage = (imageName?: string): string | undefined => {
    if (!imageName) return undefined;
    return `${backendBaseUrl}/images/${imageName}`;
};