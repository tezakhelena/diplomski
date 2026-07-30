import { AdStatus } from "../enums/processEnums";
import { AccountStatus } from "../enums/userEnums";

export const isUserAccountBlocked = (statusId: number, userBlocked: boolean): boolean => {
    return userBlocked || [AccountStatus.Obustavljen].includes(statusId);
}

export const isEditDisabled = (statusId: number, userBlocked: boolean): boolean => {
    return userBlocked || [AdStatus.Blokiran, AdStatus.UspjesnoRjeseno].includes(statusId);
};

export const isDeleteDisabled = (statusId: number, userBlocked: boolean): boolean => {
    return userBlocked || statusId === AdStatus.UProcesuUdomljavanja;
};

export const isAdoptDisabled = (isAuthenticated: boolean, statusId: number, userBlocked: boolean): boolean => {
    return !isAuthenticated || userBlocked || [AdStatus.Blokiran, AdStatus.UspjesnoRjeseno, AdStatus.UProcesuUdomljavanja].includes(statusId);
};

export const isContactDisabled = (isAuthenticated: boolean, statusId: number, userBlocked: boolean): boolean => {
    return !isAuthenticated || userBlocked || [AdStatus.Blokiran, AdStatus.UspjesnoRjeseno].includes(statusId);
};

export const isReportDisabled = (isAuthenticated: boolean, statusId: number, userBlocked: boolean): boolean => {
    return !isAuthenticated || userBlocked || [AdStatus.UspjesnoRjeseno, AdStatus.UProcesuUdomljavanja].includes(statusId);
};

export const isBlockDisabled = (isAuthenticated: boolean, statusId: number): boolean => {
    return !isAuthenticated || [AdStatus.UspjesnoRjeseno, AdStatus.UProcesuUdomljavanja, AdStatus.Blokiran].includes(statusId);
};

export const getEditTooltip = (t: (key: string) => string, statusId: number, userBlocked: boolean): string => {
    if (statusId === AdStatus.Blokiran) return t("details.actions.tooltips.edit.blocked");
    if (statusId === AdStatus.UspjesnoRjeseno) return t("details.actions.tooltips.edit.resolved");
    if (userBlocked) return t("details.actions.tooltips.userBlocked");
    return "";
};

export const getReunitedTooltip = (t: (key: string) => string, statusId: number, userBlocked: boolean): string => {
    if (statusId === AdStatus.Blokiran) return t("details.actions.tooltips.reunited.blocked");
    if (statusId === AdStatus.UspjesnoRjeseno) return t("details.actions.tooltips.reunited.resolved");
    if (userBlocked) return t("details.actions.tooltips.userBlocked");
    return "";
};

export const getDeleteTooltip = (t: (key: string) => string, statusId: number, userBlocked: boolean): string => {
    if (statusId === AdStatus.UProcesuUdomljavanja) return t("details.actions.tooltips.delete.inProgress");
    if (userBlocked) return t("details.actions.tooltips.userBlocked");
    return "";
};

export const getAdoptTooltip = (t: (key: string) => string, isAuthenticated: boolean, statusId: number, userBlocked: boolean): string => {
    if (!isAuthenticated) return t("details.actions.tooltips.adopt.notAuthenticated");
    if (statusId === AdStatus.Blokiran) return t("details.actions.tooltips.adopt.blocked");
    if (statusId === AdStatus.UspjesnoRjeseno) return t("details.actions.tooltips.adopt.resolved");
    if (statusId === AdStatus.UProcesuUdomljavanja) return t("details.actions.tooltips.adopt.inProgress");
    if (userBlocked) return t("details.actions.tooltips.userBlocked");
    return "";
};

export const getContactTooltip = (t: (key: string) => string, isAuthenticated: boolean, statusId: number, userBlocked: boolean): string => {
    if (!isAuthenticated) return t("details.actions.tooltips.contact.notAuthenticated");
    if (statusId === AdStatus.Blokiran) return t("details.actions.tooltips.contact.blocked");
    if (statusId === AdStatus.UspjesnoRjeseno) return t("details.actions.tooltips.contact.resolved");
    if (userBlocked) return t("details.actions.tooltips.userBlocked");
    return "";
};

export const getReportTooltip = (t: (key: string) => string, isAuthenticated: boolean, statusId: number, userBlocked: boolean): string => {
    if (!isAuthenticated) return t("details.actions.tooltips.report.notAuthenticated");
    if (statusId === AdStatus.UspjesnoRjeseno) return t("details.actions.tooltips.report.resolved");
    if (statusId === AdStatus.UProcesuUdomljavanja) return t("details.actions.tooltips.report.inProgress");
    if (userBlocked) return t("details.actions.tooltips.userBlocked");
    return "";
};

export const getBlockTooltip = (t: (key: string) => string, isAuthenticated: boolean, statusId: number, userBlocked: boolean): string => {
    if (!isAuthenticated) return t("details.actions.tooltips.block.notAuthenticated");
    if (statusId === AdStatus.Blokiran || statusId === AdStatus.Blokiran) return t("details.actions.tooltips.block.blocked");
    if (statusId === AdStatus.UspjesnoRjeseno) return t("details.actions.tooltips.block.resolved");
    if (statusId === AdStatus.UProcesuUdomljavanja) return t("details.actions.tooltips.block.inProgress");
    if (userBlocked) return t("details.actions.tooltips.userBlocked");
    return "";
};