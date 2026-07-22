export const getReportCountLabel = (count: number) => {
    if (count === 1) return "1 prijava";
    if (count >= 2 && count <= 4) return `${count} prijave`;
    return `${count} prijava`;
};

export const formatReward = (amount: number | undefined | null, currency: string = "EUR"): string => {
    if (amount === null || amount === undefined) return "Nema nagrade";
    if (amount === 0) return "Oglašivač ne dijeli nagradu";
    return new Intl.NumberFormat("hr-HR", { style: "currency", currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
};

export const removeEmptyFilters = <T extends object>(filters?: Partial<T>): Partial<T> => {
    return Object.fromEntries(
        Object.entries(filters ?? {}).filter(([, value]) => 
            value !== undefined && value !== null && value !== "" && !(Array.isArray(value) && value.length === 0)
        )
    ) as Partial<T>;
};