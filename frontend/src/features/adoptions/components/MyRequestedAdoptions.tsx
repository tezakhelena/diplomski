import { Empty, Space } from "antd";
import { Inbox, PawPrint, Send } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePagination } from "../../../hooks/usePagination";
import { AntSpin } from "../../../reusable/AntSpin";
import { AppPagination } from "../../../reusable/AppPagination";
import { FastFilter } from "../../../reusable/filter-page/FastFilter";
import { ContentCard } from "../../../reusable/two-column-page/ContentCard";
import { PageTabs } from "../../../reusable/two-column-page/PageTabs";
import { QuickStatsCard } from "../../../reusable/two-column-page/QuickStatsCard";
import { SideIntroCard } from "../../../reusable/two-column-page/SideIntroCard";
import { TwoColumnPageLayout } from "../../../reusable/two-column-page/TwoColumnPageLayout";
import { AttributeSelect } from "../../attributes/components/AttributeSelect";
import { AdoptionRequestsResponse } from "../types/response-types";
import { AdoptionRequestCard } from "./AdoptionRequestCard";
import { useTranslation } from "react-i18next";

interface Props {
    zaprimljeni: AdoptionRequestsResponse[];
    podneseni: AdoptionRequestsResponse[];
    isLoading?: boolean;
    filters: any;
    updateFilters: (values: any) => void;
}

export const MyRequestedAdoptions = ({ zaprimljeni, podneseni, isLoading = false, filters, updateFilters }: Props) => {
    const { t } = useTranslation('adoption');

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<"received" | "sent">("sent");

    const currentList = activeTab === "received" ? zaprimljeni : podneseni;

    const { currentData, pageCount, currentPage, handlePageChange, setCurrentPage } = usePagination(currentList, 6);

    const resetPage = () => {
        updateFilters({ searchInput: "", activeSearch: "" });
        setCurrentPage(0);
    };

    return (
        <TwoColumnPageLayout
            title={<SideIntroCard icon={<PawPrint size={30} />} title={t('adoption.list.title')} description={t('adoption.list.description')} />}
            side={
                <QuickStatsCard
                    items={[
                        { icon: <Inbox size={24} />, title: t('adoption.list.received'), description: t('adoption.list.receivedDescription'), value: zaprimljeni.length },
                        { icon: <Send size={24} />, title: t('adoption.list.sent'), description: t('adoption.list.sentDescription'), value: podneseni.length }
                    ]}
                />
            }
            sideWidth={6}
            contentWidth={18}
        >
            <ContentCard>
                <Space direction="vertical" size={24} className="app-full">
                    <PageTabs
                        activeKey={activeTab}
                        onChange={(tab) => { setCurrentPage(0); setActiveTab(tab); }}
                        items={[
                            { key: "received", label: t('adoption.list.received'), icon: <Inbox size={20} />, count: zaprimljeni.length },
                            { key: "sent", label: t('adoption.list.sent'), icon: <Send size={20} />, count: podneseni.length }
                        ]}
                    />

                    <FastFilter
                        search={filters.searchInput}
                        onSearchChange={(val) => updateFilters({ searchInput: val })}
                        onSearch={() => { setCurrentPage(0); updateFilters({ activeSearch: filters.searchInput }); }}
                        searchPlaceholder={t('adoption.list.searchPlaceholder')}
                        sortValue={filters.sortDirection}
                        onSortChange={(val) => { setCurrentPage(0); updateFilters({ sortDirection: val }); }}
                        resetPage={resetPage}
                        searchButtonLoading={isLoading}
                        searchInfoTooltip={t("searchInfoTooltip")}
                        additionalFilter={
                            <AttributeSelect
                                type="status"
                                statusType={6}
                                placeholder={t('adoption.list.allStatuses')}
                                value={filters.statusId}
                                onChange={(val) => {
                                    setCurrentPage(0);
                                    updateFilters({ statusId: val });
                                }}
                                style={{ width: 240 }}
                                name="status"
                                noForm
                            />
                        }
                    />

                    <AntSpin loading={isLoading}>
                        {currentData.length > 0 ? (
                            <Space direction="vertical" size={14} className="app-full">
                                {currentData.map((req) => (
                                    <AdoptionRequestCard
                                        key={req.adoptionId}
                                        request={req}
                                        onClick={() => navigate("/zahtjevi/detalji", { state: { adoptionId: req.adoptionId } })}
                                    />
                                ))}
                            </Space>
                        ) : <Empty description={t('adoption.list.empty')} />}
                        <AppPagination pageCount={pageCount} currentPage={currentPage} onPageChange={handlePageChange} />
                    </AntSpin>
                </Space>
            </ContentCard>
        </TwoColumnPageLayout>
    );
};