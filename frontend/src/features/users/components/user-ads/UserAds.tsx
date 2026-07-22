import { Empty, Space } from "antd";
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { SortDirection } from "../../../../types/values";
import { usePetAds } from "../../../pet-ads/hooks/usePetAdQueries";
import { FastFilter } from "../../../../reusable/filter-page/FastFilter";
import { AntSpin } from "../../../../reusable/AntSpin";
import { UserPetAdList } from "./UserAdPetList";

interface Props {
    userId?: number;
}

export const UserAds = ({ userId }: Props) => {
    const { t } = useTranslation("users");
    const [search, setSearch] = useState("");
    const [sortDirection, setSortDirection] = useState<SortDirection>("DESC");
    const { data = [], isLoading } = usePetAds({ userId, sortDirection });

    const filteredData = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();
        return data.filter((ad) =>
            ad.breed?.toLowerCase().includes(normalizedSearch) ||
            ad.category?.toLowerCase().includes(normalizedSearch) ||
            ad.county?.toLowerCase().includes(normalizedSearch)
        );
    }, [data, search]);

    return (
        <Space direction="vertical" size={22} className="app-full">
            <FastFilter
                search={search}
                onSearchChange={setSearch}
                sortValue={sortDirection}
                onSortChange={setSortDirection}
                searchPlaceholder={t("ads.searchPlaceholder")}
                searchInfoTooltip={t("searchInfoTooltipAds")}
            />
            <AntSpin loading={isLoading}>
                {filteredData.length > 0 ? <UserPetAdList data={filteredData} /> : <Empty />}
            </AntSpin>
        </Space>
    );
};