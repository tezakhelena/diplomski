import { Card, Col, Row, Select } from "antd";
import { UsersRound } from "lucide-react";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useFilterPage } from "../../hooks/useFilterPage";
import { usePagination } from "../../hooks/usePagination";
import { RootState } from "../../redux/store";
import { AppPagination } from "../../reusable/AppPagination";
import { ActiveFiltersCard } from "../../reusable/filter-page/ActiveFiltersCard";
import { FastFilter } from "../../reusable/filter-page/FastFilter";
import { FilterCard } from "../../reusable/filter-page/FilterCard";
import { FilterPageLayout } from "../../reusable/filter-page/FilterPageLayout";
import { SortDirection } from "../../types/values";
import { useBusinessTypes, useRoles, useStatuses } from "../attributes/hooks/useAttributes";
import { getAttributeLabel } from "../attributes/util/attributeUtils";
import { UsersOverviewFilterFields } from "./components/form-fields/UsersOverviewFilterFields";
import { UsersOverviewTable } from "./components/overview/UsersOverviewTable";
import { useUsers } from "./hooks/useUsersQuery";
import { UserFilterRequest } from "./types/request-types";

interface FilterState {
    searchInput: string;
    activeSearch: string;
    businessTypeId?: number;
    sortDirection: SortDirection;
}

export const UsersOverviewContainer = () => {
    const { t } = useTranslation("users");
    const filteri = useSelector((state: RootState) => state.filteri);
    const { data: businessTypes = [] } = useBusinessTypes();
    const { data: roles } = useRoles();
    const { data: statuses } = useStatuses(1);

    const [filters, setFilters] = useState<FilterState>({
        searchInput: "",
        activeSearch: "",
        businessTypeId: undefined,
        sortDirection: "DESC",
    });

    const updateFilters = (newValues: Partial<FilterState>) => {
        setFilters((prev) => ({ ...prev, ...newValues }));
    };

    const {
        form,
        request: filterRequest,
        applyFilters,
        clearFilters,
        removeFilter,
    } = useFilterPage<UserFilterRequest>({
        filterName: "usersFilter",
        filterValues: filteri.usersFilter,
    });

    const request = useMemo(
        () => ({
            ...filterRequest,
            businessTypeId: filters.businessTypeId,
            sortDirection: filters.sortDirection,
            search: filters.activeSearch.trim() || undefined,
        }),
        [filterRequest, filters.businessTypeId, filters.activeSearch, filters.sortDirection]
    );

    const { users, isLoading, refetch } = useUsers(request);

    const {
        currentData,
        pageCount,
        currentPage,
        handlePageChange,
        setCurrentPage,
    } = usePagination(users, 10);

    const activeFilterConfig = {
        firstName: { label: t("overview.activeFilters.firstName") },
        lastName: { label: t("overview.activeFilters.lastName") },
        username: { label: t("overview.activeFilters.username") },
        roleId: {
            label: t("overview.activeFilters.role"),
            getValueLabel: (value: string | number) => getAttributeLabel(roles, value),
        },
        statusId: {
            label: t("overview.activeFilters.status"),
            getValueLabel: (value: string | number) => getAttributeLabel(statuses, value),
        },
    };


    const resetPage = () => {
        updateFilters({ searchInput: "", activeSearch: "" })
        setCurrentPage(0)
    };
    return (
        <FilterPageLayout
            icon={<UsersRound size={26} />}
            title={t("overview.page.title")}
            pageType="filter"
            subtitle={t("overview.page.description")}
            filter={
                <FilterCard
                    form={form}
                    onFinish={() => {
                        setCurrentPage(0);
                        applyFilters();
                    }}
                    clearFilters={() => {
                        setCurrentPage(0);
                        clearFilters();
                    }}
                    resultCount={users.length}
                    resultLabel={t("overview.resultLabel")}
                >
                    <UsersOverviewFilterFields />
                </FilterCard>
            }
            content={
                <Card>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <FastFilter
                                search={filters.searchInput}
                                onSearchChange={(val) => updateFilters({ searchInput: val })}
                                onSearch={() => {
                                    setCurrentPage(0);
                                    updateFilters({ activeSearch: filters.searchInput });
                                }}
                                searchPlaceholder={t("overview.searchPlaceholder")}
                                sortValue={filters.sortDirection}
                                onSortChange={(val) => {
                                    setCurrentPage(0);
                                    updateFilters({ sortDirection: val });
                                }}
                                resetPage={resetPage}
                                searchButtonLoading={isLoading}
                                searchInfoTooltip={t("searchInfoTooltip")}
                                additionalFilter={
                                    <Select
                                        size="large"
                                        allowClear
                                        value={filters.businessTypeId}
                                        placeholder={t("overview.businessTypePlaceholder")}
                                        style={{ width: 220 }}
                                        options={businessTypes.map((item) => ({
                                            value: item.code,
                                            label: item.value,
                                        }))}
                                        onChange={(val) => {
                                            setCurrentPage(0);
                                            updateFilters({ businessTypeId: val });
                                        }}
                                    />
                                }
                            />
                        </Col>

                        <Col span={24}>

                            <UsersOverviewTable
                                data={currentData}
                                variant="overview"
                                refetch={refetch}
                                isLoading={isLoading}
                            />
                        </Col>
                    </Row>

                    <AppPagination
                        pageCount={pageCount}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />


                </Card>

            }
            activeFilters={
                <ActiveFiltersCard
                    filters={filteri.usersFilter}
                    config={activeFilterConfig}
                    removeFilter={(filterName) => {
                        setCurrentPage(0);
                        removeFilter(filterName);
                    }}
                    clearFilters={() => {
                        setCurrentPage(0);
                        clearFilters();
                    }}
                />
            }
        />
    );
};