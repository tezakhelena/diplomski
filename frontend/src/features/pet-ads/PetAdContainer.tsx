import { Col, Row, Space } from "antd";
import { Heart } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useFilterPage } from "../../hooks/useFilterPage";
import { usePagination } from "../../hooks/usePagination";
import { RootState } from "../../redux/store";
import { AntSpin } from "../../reusable/AntSpin";
import { AppPagination } from "../../reusable/AppPagination";
import { ActiveFiltersCard } from "../../reusable/filter-page/ActiveFiltersCard";
import { FastFilter } from "../../reusable/filter-page/FastFilter";
import { FilterCard } from "../../reusable/filter-page/FilterCard";
import { FilterPageLayout } from "../../reusable/filter-page/FilterPageLayout";
import { gender, maturity, SortDirection } from "../../types/values";
import { mapToPetAdCard } from "../../utils/helperFunctions";
import { useBreeds, useCategories, useCounties, useSpecies } from "../attributes/hooks/useAttributes";
import { getAttributeLabel } from "../attributes/util/attributeUtils";
import { PetAdCard } from "./components/list-of-ads/PetAdCard";
import { PetAdFilter } from "./components/list-of-ads/PetAdFilter";
import { usePetAds } from "./hooks/usePetAdQueries";
import { FilterAdsRequest } from "./types/request-types";

interface FilterState {
    searchInput: string;
    activeSearch: string;
    sortDirection: SortDirection;
}

export const PetAdContainer = () => {
    const { t } = useTranslation("petAd");
    const location = useLocation();
    const filteri = useSelector((state: RootState) => state.filteri);

    const [filters, setFilters] = useState<FilterState>({
        searchInput: "",
        activeSearch: "",
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
    } = useFilterPage<FilterAdsRequest>({
        filterName: "adsFilter",
        filterValues: filteri.adsFilter,
    });

    const { data: categories } = useCategories();
    const { data: species } = useSpecies();
    const { data: counties } = useCounties();
    const { data: breeds } = useBreeds(filteri.adsFilter?.speciesId);

    useEffect(() => {
        if (!location.state) return;
        const valuesFromState: Partial<FilterAdsRequest> = {};
        if (location.state?.speciesId) valuesFromState.speciesId = location.state.speciesId;
        if (location.state?.countyId) valuesFromState.countyId = location.state.countyId;
        if (Object.keys(valuesFromState).length === 0) return;
        form.setFieldsValue(valuesFromState);
        applyFilters();
    }, [location.state]);

    const request = useMemo(
        () => ({
            ...filterRequest,
            search: filters.activeSearch.trim() || undefined,
            sortDirection: filters.sortDirection
        }),
        [filterRequest, filters.activeSearch, filters.sortDirection]
    );

    const { data = [], isLoading } = usePetAds(request);

    const {
        currentData,
        pageCount,
        currentPage,
        handlePageChange,
        setCurrentPage,
    } = usePagination(data, 6);

    const handleApplyFilters = () => {
        setCurrentPage(0);
        applyFilters();
    };

    const handleClearFilters = () => {
        setCurrentPage(0);
        clearFilters();
        updateFilters({ searchInput: "", activeSearch: "" });
    };

    const activeFilterConfig = {
        speciesId: {
            label: t("list.filters.species"),
            getValueLabel: (v: any) => getAttributeLabel(species, v)
        },
        categoryId: {
            label: t("list.filters.category"),
            getValueLabel: (v: any) => getAttributeLabel(categories, v)
        },
        countyId: {
            label: t("list.filters.location"),
            getValueLabel: (v: any) => getAttributeLabel(counties, v)
        },
        breedId: {
            label: t("list.filters.breed"),
            getValueLabel: (v: any) => getAttributeLabel(breeds, v)
        },
        gender: {
            label: t("list.filters.gender"),
            getValueLabel: (v: any) => gender.find((g) => g.value === v)?.label ?? String(v)
        },
        maturity: {
            label: t("list.filters.maturity"),
            getValueLabel: (v: any) => maturity.find((m) => m.value === v)?.label ?? String(v)
        },
    };

    return (
        <FilterPageLayout
            icon={<Heart size={26} />}
            title={t("list.page.title")}
            pageType="filter"
            subtitle={t("list.page.description")}
            filter={
                <FilterCard
                    form={form}
                    onFinish={handleApplyFilters}
                    clearFilters={handleClearFilters}
                    resultCount={data.length}
                    resultLabel={t("list.resultLabel")}
                >
                    <PetAdFilter filteri={filteri} form={form} />
                </FilterCard>
            }
            content={
                <Space direction="vertical" size={24} className="app-full">
                    <FastFilter
                        search={filters.searchInput}
                        onSearchChange={(val) => updateFilters({ searchInput: val })}
                        onSearch={() => {
                            setCurrentPage(0);
                            updateFilters({ activeSearch: filters.searchInput });
                        }}
                        searchPlaceholder={t("list.searchPlaceholder")}
                        sortValue={filters.sortDirection}
                        onSortChange={(val) => {
                            setCurrentPage(0);
                            updateFilters({ sortDirection: val });
                        }}
                        resetPage={() => {
                            setCurrentPage(0);
                            updateFilters({ searchInput: "", activeSearch: "" });
                        }}
                        searchButtonLoading={isLoading}
                        searchInfoTooltip={t("searchInfoTooltip")}
                    />

                    <AntSpin loading={isLoading}>
                        <Row gutter={[22, 24]}>
                            {currentData.map((pet) => (
                                <Col xs={24} sm={12} xl={8} key={pet.petAdId}>
                                    <PetAdCard pet={mapToPetAdCard(pet)} />
                                </Col>
                            ))}
                        </Row>
                        <AppPagination
                            pageCount={pageCount}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </AntSpin>
                </Space>
            }
            activeFilters={
                <ActiveFiltersCard
                    filters={filteri.adsFilter}
                    config={activeFilterConfig}
                    removeFilter={(name) => {
                        setCurrentPage(0);
                        removeFilter(name);
                    }}
                    clearFilters={handleClearFilters}
                />
            }
        />
    );
};