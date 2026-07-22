import { Col, Empty, Row, Select, Space, Typography } from "antd";
import { Building2, PawPrint, ShieldCheck, Stethoscope } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { usePagination } from "../../../hooks/usePagination";
import { AntSpin } from "../../../reusable/AntSpin";
import { AppPagination } from "../../../reusable/AppPagination";
import { FastFilter } from "../../../reusable/filter-page/FastFilter";
import { ContentCard } from "../../../reusable/two-column-page/ContentCard";
import { QuickStatsCard } from "../../../reusable/two-column-page/QuickStatsCard";
import { SideIntroCard } from "../../../reusable/two-column-page/SideIntroCard";
import { TwoColumnPageLayout } from "../../../reusable/two-column-page/TwoColumnPageLayout";
import { UserCard } from "../../../reusable/UserCard";
import { SortDirection } from "../../../types/values";
import { useBusinessTypes } from "../../attributes/hooks/useAttributes";
import { UsersResponse } from "../../users/types/response-types";

interface Props {
    data?: UsersResponse[];
    isLoading: boolean;
    searchInput: string;
    setSearchInput: (value: string) => void;
    onSearch: () => void;
    onClearSearch: () => void;
    businessTypeId?: number;
    setBusinessTypeId: (value?: number) => void;
    sortDirection: SortDirection;
    setSortDirection: (value: SortDirection) => void;
}

export const BusinessUsers = ({
    data = [],
    isLoading,
    searchInput,
    setSearchInput,
    onSearch,
    onClearSearch,
    businessTypeId,
    setBusinessTypeId,
    sortDirection,
    setSortDirection,
}: Props) => {
    const { t } = useTranslation('businessUsers');
    const { data: businessTypes = [] } = useBusinessTypes();

    const { currentData, pageCount, currentPage, handlePageChange, setCurrentPage } = usePagination(data, 8);

    const organizationStatistics = useMemo(() => {
        const getCount = (name: string) => {
            const type = businessTypes.find((item) => item.value === name);
            return type ? data.filter((item) => item.businessTypeId === type.code).length : 0;
        };

        return {
            shelterCount: getCount("Udruga/Azil za ljubimce"),
            vetCount: getCount("Veterinarska stanica"),
            salonCount: getCount("Saloni za njegu životinja"),
        };
    }, [data, businessTypes]);

    const resetPage = () => {
        onClearSearch();
        setCurrentPage(0);
    };

    return (
        <TwoColumnPageLayout
            sideWidth={6}
            contentWidth={18}
            title={
                <SideIntroCard
                    icon={<Building2 size={30} />}
                    title={t("title")}
                    description={t("description")}
                />
            }
            side={
                <QuickStatsCard
                    items={[
                        { icon: <Building2 size={23} />, title: t("stats.all.title"), description: t("stats.all.desc"), value: data.length },
                        { icon: <PawPrint size={23} />, title: t("stats.shelter.title"), description: t("stats.shelter.desc"), value: organizationStatistics.shelterCount },
                        { icon: <Stethoscope size={23} />, title: t("stats.vet.title"), description: t("stats.vet.desc"), value: organizationStatistics.vetCount },
                        { icon: <ShieldCheck size={23} />, title: t("stats.salon.title"), description: t("stats.salon.desc"), value: organizationStatistics.salonCount },
                    ]}
                />
            }
        >
            <ContentCard>
                <Space direction="vertical" size={24} className="app-full">
                    <Space direction="vertical" size={4}>
                        <Typography.Title level={2} style={{ margin: 0 }}>{t("header.title")}</Typography.Title>
                        <Typography.Text type="secondary">{t("header.subtitle")}</Typography.Text>
                    </Space>

                    <FastFilter
                        search={searchInput}
                        onSearchChange={setSearchInput}
                        searchPlaceholder={t("searchPlaceholder")}
                        sortValue={sortDirection}
                        resetPage={resetPage}
                        onSortChange={(value) => { setCurrentPage(0); setSortDirection(value); }}
                        onSearch={() => { setCurrentPage(0); onSearch(); }}
                        searchButtonLoading={isLoading}
                        searchInfoTooltip={t("searchInfoTooltip")}
                        additionalFilter={
                            <Select
                                size="large"
                                allowClear
                                value={businessTypeId}
                                placeholder={t("filterPlaceholder")}
                                style={{ width: 220 }}
                                options={businessTypes.map((item) => ({ value: item.code, label: item.value }))}
                                onChange={(value) => { setCurrentPage(0); setBusinessTypeId(value); }}
                            />
                        }
                    />

                    <AntSpin loading={isLoading}>
                        {currentData.length ? (
                            <Row gutter={[18, 18]}>
                                {currentData.map((organization) => (
                                    <Col xs={24} sm={12} xl={8} key={organization.userId}>
                                        <UserCard
                                            userId={organization.userId}
                                            navigateTo="/organizacije/profil"
                                            organizationView
                                            showVolunteerButton
                                        />
                                    </Col>
                                ))}
                            </Row>
                        ) : (
                            <Empty description={t("empty")} />
                        )}

                        <AppPagination
                            pageCount={pageCount}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </AntSpin>
                </Space>
            </ContentCard>
        </TwoColumnPageLayout>
    );
};