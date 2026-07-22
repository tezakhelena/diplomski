import { Flex, Input, Select, Tooltip } from "antd";
import { Search, Info } from "lucide-react";
import { ReactNode } from "react";
import { SortDirection, sortOptionsSelect } from "../../types/values";
import style from "../style/FilterPageLayout.module.css";

interface SortOption<T extends string = string> {
    value: T;
    label: string;
}

interface Props<T extends string = SortDirection> {
    search: string;
    onSearchChange: (value: string) => void;
    sortValue?: T;
    onSortChange?: (value: T) => void;
    searchPlaceholder?: string;
    sortOptions?: SortOption<T>[];
    additionalFilter?: ReactNode;
    onSearch?: () => void;
    searchButtonLoading?: boolean;
    resetPage?: () => void;
    searchInfoTooltip?: string;
}

export const FastFilter = <T extends string = SortDirection>({
    search,
    onSearchChange,
    sortValue,
    onSortChange,
    searchPlaceholder = "Pretraži...",
    sortOptions,
    additionalFilter,
    onSearch,
    searchButtonLoading = false,
    resetPage,
    searchInfoTooltip,
}: Props<T>) => {
    const showSort = sortValue !== undefined && onSortChange !== undefined;
    const resolvedSortOptions = sortOptions ?? (sortOptionsSelect as SortOption<T>[]);

    return (
        <Flex gap={16} wrap="wrap" className={style.toolbar} align="center">
            <Flex align="center" gap={8} style={{ flex: 1, minWidth: 260 }}>
                {searchInfoTooltip && (
                    <Tooltip title={searchInfoTooltip} placement="top">
                        <Info size={20} color="blue" />
                    </Tooltip>
                )}
                <Input.Search
                    size="large"
                    allowClear
                    placeholder={searchPlaceholder}
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onSearch={() => {
                        if (onSearch) onSearch();
                    }}
                    loading={searchButtonLoading}
                    enterButton={<Search size={18} />}
                    className={style.searchInput}
                    onClear={() => {
                        onSearchChange("");
                        if (resetPage) resetPage();
                    }}
                />
            </Flex>

            {additionalFilter}

            {showSort && (
                <Select
                    size="large"
                    value={sortValue}
                    onChange={onSortChange}
                    className={style.sortSelect}
                    options={resolvedSortOptions}
                />
            )}
        </Flex>
    );
};