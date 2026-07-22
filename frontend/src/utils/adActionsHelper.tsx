import { AdStatus } from "../enums/processEnums";

// Logike za provjeru ostaju iste (ne trebaju prijevod)
export const isEditDisabled = (statusId: number): boolean => {
    return [AdStatus.Blokiran, AdStatus.UspjesnoRjeseno].includes(statusId);
};

export const isDeleteDisabled = (statusId: number): boolean => {
    return statusId === AdStatus.UProcesuUdomljavanja;
};

export const isAdoptDisabled = (isAuthenticated: boolean, statusId: number): boolean => {
    return !isAuthenticated || [AdStatus.Blokiran, AdStatus.UspjesnoRjeseno, AdStatus.UProcesuUdomljavanja].includes(statusId);
};

export const isContactDisabled = (isAuthenticated: boolean, statusId: number): boolean => {
    return !isAuthenticated || [AdStatus.Blokiran, AdStatus.UspjesnoRjeseno].includes(statusId);
};

export const isReportDisabled = (isAuthenticated: boolean, statusId: number): boolean => {
    return !isAuthenticated || [AdStatus.UspjesnoRjeseno, AdStatus.UProcesuUdomljavanja].includes(statusId);
};

export const isBlockDisabled = (isAuthenticated: boolean, statusId: number): boolean => {
    return !isAuthenticated || [AdStatus.UspjesnoRjeseno, AdStatus.UProcesuUdomljavanja, AdStatus.Blokiran].includes(statusId);
};

// Funkcije za tooltipove sada primaju 't' funkciju kao prvi argument
export const getEditTooltip = (t: (key: string) => string, statusId: number): string => {
    if (statusId === AdStatus.Blokiran) return t("details.actions.tooltips.edit.blocked");
    if (statusId === AdStatus.UspjesnoRjeseno) return t("details.actions.tooltips.edit.resolved");
    return "";
};

export const getReunitedTooltip = (t: (key: string) => string, statusId: number): string => {
    if (statusId === AdStatus.Blokiran) return t("details.actions.tooltips.reunited.blocked");
    if (statusId === AdStatus.UspjesnoRjeseno) return t("details.actions.tooltips.reunited.resolved");
    return "";
};

export const getDeleteTooltip = (t: (key: string) => string, statusId: number): string => {
    if (statusId === AdStatus.UProcesuUdomljavanja) return t("details.actions.tooltips.delete.inProgress");
    return "";
};

export const getAdoptTooltip = (t: (key: string) => string, isAuthenticated: boolean, statusId: number): string => {
    if (!isAuthenticated) return t("details.actions.tooltips.adopt.notAuthenticated");
    if (statusId === AdStatus.Blokiran) return t("details.actions.tooltips.adopt.blocked");
    if (statusId === AdStatus.UspjesnoRjeseno) return t("details.actions.tooltips.adopt.resolved");
    if (statusId === AdStatus.UProcesuUdomljavanja) return t("details.actions.tooltips.adopt.inProgress");
    return "";
};

export const getContactTooltip = (t: (key: string) => string, isAuthenticated: boolean, statusId: number): string => {
    if (!isAuthenticated) return t("details.actions.tooltips.contact.notAuthenticated");
    if (statusId === AdStatus.Blokiran) return t("details.actions.tooltips.contact.blocked");
    if (statusId === AdStatus.UspjesnoRjeseno) return t("details.actions.tooltips.contact.resolved");
    return "";
};

export const getReportTooltip = (t: (key: string) => string, isAuthenticated: boolean, statusId: number): string => {
    if (!isAuthenticated) return t("details.actions.tooltips.report.notAuthenticated");
    if (statusId === AdStatus.UspjesnoRjeseno) return t("details.actions.tooltips.report.resolved");
    if (statusId === AdStatus.UProcesuUdomljavanja) return t("details.actions.tooltips.report.inProgress");
    return "";
};

export const getBlockTooltip = (t: (key: string) => string, isAuthenticated: boolean, statusId: number): string => {
    if (!isAuthenticated) return t("details.actions.tooltips.block.notAuthenticated");
    if (statusId === AdStatus.Blokiran || statusId === AdStatus.Blokiran) return t("details.actions.tooltips.block.blocked");
    if (statusId === AdStatus.UspjesnoRjeseno) return t("details.actions.tooltips.block.resolved");
    if (statusId === AdStatus.UProcesuUdomljavanja) return t("details.actions.tooltips.block.inProgress");
    return "";
};