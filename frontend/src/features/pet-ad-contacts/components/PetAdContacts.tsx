import { Empty, Space } from "antd";
import { Inbox, Mail, Send } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
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
import { SortDirection } from "../../../types/values";
import { PetAdContactResponse } from "../types/response-types";
import { PetAdContactCard } from "./PetAdContactCard";

type TabKey = "received" | "sent";

interface FilterState { searchInput: string; activeSearch: string; sortDirection: SortDirection; }

interface Props {
    receivedContacts: PetAdContactResponse[];
    sentContacts: PetAdContactResponse[];
    isLoading?: boolean;
    filters: FilterState;
    updateFilters: (values: Partial<FilterState>) => void;
}

export const PetAdContacts = ({ receivedContacts, sentContacts, isLoading = false, filters, updateFilters }: Props) => {
    const { t } = useTranslation("petAdContact");
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<TabKey>("received");

    const currentList = activeTab === "received" ? receivedContacts : sentContacts;
    const { currentData, pageCount, currentPage, handlePageChange, setCurrentPage } = usePagination(currentList, 6);

    const resetPage = () => {
        updateFilters({ searchInput: "", activeSearch: "" });
        setCurrentPage(0);
    };

    const handleTabChange = (tab: TabKey) => {
        setCurrentPage(0);
        setActiveTab(tab);
    };

    return (
        <TwoColumnPageLayout
            title={<SideIntroCard icon={<Mail size={30} />} title={t("list.title")} description={t("list.description")} />}
            side={
                <QuickStatsCard
                    items={[
                        { icon: <Inbox size={24} />, title: t("list.stats.received"), description: t("list.stats.receivedDesc"), value: receivedContacts.length },
                        { icon: <Send size={24} />, title: t("list.stats.sent"), description: t("list.stats.sentDesc"), value: sentContacts.length },
                    ]}
                />
            }
        >
            <ContentCard>
                <Space direction="vertical" size={24} className="app-full">
                    <PageTabs<TabKey>
                        activeKey={activeTab}
                        onChange={handleTabChange}
                        items={[
                            { key: "received", label: t("list.tabs.received"), icon: <Inbox size={20} />, count: receivedContacts.length },
                            { key: "sent", label: t("list.tabs.sent"), icon: <Send size={20} />, count: sentContacts.length },
                        ]}
                    />

                    <FastFilter
                        search={filters.searchInput}
                        onSearchChange={(value) => updateFilters({ searchInput: value })}
                        onSearch={() => { setCurrentPage(0); updateFilters({ activeSearch: filters.searchInput }); }}
                        searchPlaceholder={t("list.filterPlaceholder")}
                        sortValue={filters.sortDirection}
                        onSortChange={(value) => { setCurrentPage(0); updateFilters({ sortDirection: value }); }}
                        resetPage={resetPage}
                        searchButtonLoading={isLoading}
                        searchInfoTooltip={t("searchInfoTooltip")}
                    />

                    <AntSpin loading={isLoading}>
                        {currentData.length > 0 ? (
                            <Space direction="vertical" size={14} className="app-full">
                                {currentData.map((contact) => (
                                    <PetAdContactCard
                                        key={contact.contactId}
                                        contact={contact}
                                        type={activeTab}
                                        onClick={() => navigate("/contacts/details", { state: { contactId: contact.contactId } })}
                                    />
                                ))}
                            </Space>
                        ) : (
                            <Empty description={t("list.empty")} />
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