import { Empty, Flex, Space } from "antd";
import { Inbox, PawPrint, Send } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { usePagination } from "../../../../hooks/usePagination";
import { RootState } from "../../../../redux/store";
import { AntSpin } from "../../../../reusable/AntSpin";
import { AppPagination } from "../../../../reusable/AppPagination";
import { FastFilter } from "../../../../reusable/filter-page/FastFilter";
import { ContentCard } from "../../../../reusable/two-column-page/ContentCard";
import { PageTabs } from "../../../../reusable/two-column-page/PageTabs";
import { QuickStatsCard } from "../../../../reusable/two-column-page/QuickStatsCard";
import { SideIntroCard } from "../../../../reusable/two-column-page/SideIntroCard";
import { TwoColumnPageLayout } from "../../../../reusable/two-column-page/TwoColumnPageLayout";
import { AttributeSelect } from "../../../attributes/components/AttributeSelect";
import { VolunteerApplicationResponse } from "../../types/request-types";
import { VolunteerApplicationCard } from "./VolunteerApplicationCard";
import { BusinessType } from "../../../../enums/userEnums";

interface Props {
    poslano: VolunteerApplicationResponse[];
    zaprimljeno: VolunteerApplicationResponse[];
    isLoading?: boolean;
    filters: any;
    updateFilters: (values: any) => void;
    isAdmin?: boolean;
    sviZahtjevi: VolunteerApplicationResponse[];
}

type TabKey = "received" | "sent";

export const VolunteerApplicationsOverview = ({
    poslano = [],
    zaprimljeno = [],
    isLoading = false,
    filters,
    updateFilters,
    isAdmin,
    sviZahtjevi
}: Props) => {
    const { t } = useTranslation("volunteer");
    const auth = useSelector((state: RootState) => state.auth);
    const canViewReceivedApplications = auth.businessTypeId === BusinessType.UdrugaAzil;

    const [activeTab, setActiveTab] = useState<"received" | "sent">(auth.privateUser ? "sent" : "received");

    const currentList = isAdmin ? sviZahtjevi : activeTab === "received" ? zaprimljeno : poslano;

    const { currentData, pageCount, currentPage, handlePageChange, setCurrentPage } = usePagination(currentList, 6);

    const resetFilters = () => {
        updateFilters({ searchInput: "", activeSearch: "", statusId: undefined, volunteerType: undefined });
        setCurrentPage(0);
    };


    return (
        <TwoColumnPageLayout
            sideWidth={7}
            contentWidth={17}
            title={
                <SideIntroCard
                    icon={<PawPrint size={30} />}
                    title={t("overview.page.title")}
                    description={t("overview.page.description")}
                />
            }
            side={
                <QuickStatsCard
                    items={isAdmin ? [
                        { icon: <Send size={24} />, title: t('overview.statistics.all.title'), description: t('overview.statistics.all.description'), value: sviZahtjevi.length },

                    ] : [
                        {
                            icon: <Inbox size={24} />,
                            title: t("overview.statistics.received.title"),
                            description: t("overview.statistics.received.description"),
                            value: zaprimljeno.length,
                        },
                        {
                            icon: <Send size={24} />,
                            title: t("overview.statistics.sent.title"),
                            description: t("overview.statistics.sent.description"),
                            value: poslano.length,
                        },
                    ]}
                />
            }
        >
            <ContentCard>
                <Space
                    direction="vertical"
                    size={24}
                    className="app-full"
                >
                    {!isAdmin && (
                        <PageTabs<TabKey>
                            activeKey={activeTab}
                            onChange={(tab) => { setCurrentPage(0); setActiveTab(tab as any); }}
                            items={[
                                ...(canViewReceivedApplications
                                    ? [
                                        {
                                            key: "received" as TabKey,
                                            label: t("overview.tabs.received"),
                                            icon: <Inbox size={20} />,
                                            count: zaprimljeno.length,
                                        },
                                    ]
                                    : []),
                                {
                                    key: "sent",
                                    label: t("overview.tabs.sent"),
                                    icon: <Send size={20} />,
                                    count: poslano.length,
                                },
                            ]}
                        />
                    )}

                    <FastFilter
                        search={filters.searchInput}
                        onSearchChange={(val) => updateFilters({ searchInput: val })}
                        onSearch={() => { setCurrentPage(0); updateFilters({ activeSearch: filters.searchInput }); }}
                        searchPlaceholder={t("overview.filters.searchPlaceholder")}
                        sortValue={filters.sortDirection}
                        onSortChange={(val) => { setCurrentPage(0); updateFilters({ sortDirection: val }); }}
                        searchButtonLoading={isLoading}
                        searchInfoTooltip={t("searchInfoTooltip")}
                        additionalFilter={
                            <Flex gap={8} wrap="wrap">
                                <AttributeSelect
                                    type="status"
                                    statusType={7}
                                    placeholder={t("overview.filters.allStatuses")}
                                    value={filters.statusId}
                                    onChange={(val) => { setCurrentPage(0); updateFilters({ statusId: val }); }}
                                    style={{ width: 220 }}
                                    name="statusId"
                                    noForm
                                />
                                <AttributeSelect
                                    type="status"
                                    statusType={10}
                                    placeholder={t("overview.filters.volunteerType")}
                                    value={filters.volunteerType}
                                    onChange={(val) => { setCurrentPage(0); updateFilters({ volunteerType: val }); }}
                                    style={{ width: 220 }}
                                    name="volunteerType"
                                    noForm
                                />
                            </Flex>
                        }
                        resetPage={resetFilters}
                    />

                    <AntSpin loading={isLoading}>
                        {currentData.length > 0 ? (
                            <Space
                                direction="vertical"
                                size={14}
                                className="app-full"
                            >
                                {currentData.map((application) => (
                                    <VolunteerApplicationCard
                                        key={application.volunteerId}
                                        application={application}
                                        displayMode={activeTab}
                                    />
                                ))}
                            </Space>
                        ) : (
                            <Empty description={t("overview.empty")} />
                        )}

                        <AppPagination
                            pageCount={pageCount}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </AntSpin>
                </Space>
            </ContentCard>
        </TwoColumnPageLayout >
    );
};