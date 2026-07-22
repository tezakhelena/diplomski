import { Button, Empty, Flex, Space } from "antd";
import { Bell, Circle, Inbox, Trash2 } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AntSpin } from "../../../reusable/AntSpin";
import { AppModal } from "../../../reusable/AppModal";
import { ContentCard } from "../../../reusable/two-column-page/ContentCard";
import { PageTabs } from "../../../reusable/two-column-page/PageTabs";
import { QuickStatsCard } from "../../../reusable/two-column-page/QuickStatsCard";
import { SideIntroCard } from "../../../reusable/two-column-page/SideIntroCard";
import { TwoColumnPageLayout } from "../../../reusable/two-column-page/TwoColumnPageLayout";
import { NotificationResponse } from "../types/response-types";
import { NotificationItem } from "./NotificationItem";

interface Props {
    data: NotificationResponse[];
    unreadNotifications?: NotificationResponse[];
    handleProcitaj: () => Promise<void>;
    handleDeleteAll: () => Promise<void>;
    isLoading?: boolean;
    isMarkingAsRead?: boolean;
    isDeletingNotifications?: boolean;
}

type TabKey = "all" | "unread";

export const Notifications = ({
    data,
    unreadNotifications = [],
    handleProcitaj,
    handleDeleteAll,
    isLoading = false,
    isMarkingAsRead = false,
    isDeletingNotifications = false,
}: Props) => {
    const { t } = useTranslation("notifications");
    const [activeTab, setActiveTab] = useState<TabKey>("all");
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [openedUnreadNotifications, setOpenedUnreadNotifications] = useState<NotificationResponse[]>([]);

    const currentList = activeTab === "all" ? data : openedUnreadNotifications;

    const handleTabChange = async (tab: TabKey) => {
        setActiveTab(tab);
        if (tab !== "unread") return;
        setOpenedUnreadNotifications(unreadNotifications);
        if (unreadNotifications.length > 0) {
            await handleProcitaj();
        }
    };

    const confirmDeleteAll = async () => {
        await handleDeleteAll();
        setOpenedUnreadNotifications([]);
        setActiveTab("all");
        setDeleteModalVisible(false);
    };

    return (
        <>
            <TwoColumnPageLayout
                sideWidth={7}
                contentWidth={17}
                title={
                    <SideIntroCard
                        icon={<Bell size={30} />}
                        title={t("page.title")}
                        description={t("page.description")}
                    />
                }
                side={
                    <QuickStatsCard
                        items={[
                            { icon: <Inbox size={24} />, title: t("page.stats.allTitle"), description: t("page.stats.allDesc"), value: data.length },
                            { icon: <Circle size={24} />, title: t("page.stats.unreadTitle"), description: t("page.stats.unreadDesc"), value: unreadNotifications.length },
                        ]}
                    />
                }
            >
                <ContentCard>
                    <Space direction="vertical" size={20} className="app-full">
                        <Flex justify="space-between" align="center" gap={16} wrap>
                            <PageTabs<TabKey>
                                activeKey={activeTab}
                                onChange={handleTabChange}
                                items={[
                                    { key: "all", label: t("page.tabs.all"), icon: <Inbox size={20} />, count: data.length },
                                    { key: "unread", label: t("page.tabs.unread"), icon: <Circle size={20} />, count: unreadNotifications.length },
                                ]}
                            />
                            <Button danger icon={<Trash2 size={17} />} disabled={data.length === 0 || isDeletingNotifications} onClick={() => setDeleteModalVisible(true)}>
                                {t("page.deleteButton")}
                            </Button>
                        </Flex>

                        <AntSpin loading={isLoading || isMarkingAsRead || isDeletingNotifications}>
                            {currentList.length > 0 ? (
                                <Space direction="vertical" size={14} className="app-full">
                                    {currentList.map((n) => <NotificationItem key={n.notificationId} notif={n} />)}
                                </Space>
                            ) : (
                                <Empty description={t("page.empty")} />
                            )}
                        </AntSpin>
                    </Space>
                </ContentCard>
            </TwoColumnPageLayout>

            <AppModal
                open={deleteModalVisible}
                title={t("modal.title")}
                description={t("modal.description")}
                icon={<Trash2 size={24} />}
                danger
                confirmText={t("modal.confirm")}
                loading={isDeletingNotifications}
                onConfirm={confirmDeleteAll}
                onCancel={() => setDeleteModalVisible(false)}
            />
        </>
    );
};