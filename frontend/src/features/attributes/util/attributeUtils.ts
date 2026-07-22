import { AttributeResponse } from "../types/response-types";

export const toSelectOptions = (items?: AttributeResponse[]) => {
    return (items ?? []).map((item) => ({
        value: item.code,
        label: item.value,
        count: item.count
    }));
};

export const getAttributeLabel = (
    items: AttributeResponse[] | undefined,
    code: number | string | null | undefined
) => {
    if (code === null || code === undefined || code === "") return "";

    return items?.find((item) => item.code === Number(code))?.value ?? String(code);
};