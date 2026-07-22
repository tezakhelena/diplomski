import { Button, Space } from "antd";
import { BellRing, CircleUser, Info, MoreVertical, Settings, Sheet, UserPen, UsersRound } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useKorisnik from "../../hooks/useKorisnik";
import { RootState } from "../../redux/store";
import { ContentCard } from "../../reusable/two-column-page/ContentCard";
import { PageTabs } from "../../reusable/two-column-page/PageTabs";
import { SideIntroCard } from "../../reusable/two-column-page/SideIntroCard";
import { SideMenu } from "../../reusable/two-column-page/SideMenu";
import { TwoColumnPageLayout } from "../../reusable/two-column-page/TwoColumnPageLayout";
import { UserCard } from "../../reusable/UserCard";
import { UserAdsStatsCard } from "./components/side/UserAdsStatsCard";
import { UserSummaryCard } from "./components/side/UserSummaryCard";
import { UserAds } from "./components/user-ads/UserAds";
import { UserAccount } from "./components/user-details/UserAccount";
import { UserActivityModal } from "./components/user-details/UserActivityModal";
import { UserBasicData } from "./components/user-details/UserBasicData";
import { useUserDetails } from "./hooks/useUsersQuery";

export const UserDetailsContainer = () => {
    const { t } = useTranslation("users");
    const location = useLocation();
    const { userId } = location.state;

    const { userDetails: detalji } = useUserDetails(userId);

    const [activeTab, setActiveTab] = useState<"info" | "account" | "ads">("info");
    const [accountTab, setAccountTab] = useState("profile");
    const [activityOpen, setActivityOpen] = useState(false);

    const currentUserId = useSelector((state: RootState) => state.auth.userId);
    const { isAdmin } = useKorisnik();
    const showExtraView = currentUserId === detalji?.userId || isAdmin();

    const items = [
        { key: "profile", label: t("details.accountMenu.profile.title"), desc: t("details.accountMenu.profile.description"), icon: <UserPen size={20} /> },
        { key: "security", label: t("details.accountMenu.security.title"), desc: t("details.accountMenu.security.description"), icon: <Settings size={20} /> },
        { key: "notifications", label: t("details.accountMenu.notifications.title"), desc: t("details.accountMenu.notifications.description"), icon: <BellRing size={20} /> },
    ];

    const renderSide = () => {
        return (
            <Space direction="vertical" size={16} className="app-full">
                <UserCard userId={detalji?.userId} hideProfileButton />
                {showExtraView && (
                    <Button
                        block
                        type="default"
                        icon={<MoreVertical size={18} />}
                        onClick={() => setActivityOpen(true)}
                    >
                        {t("details.showActivityButton")}
                    </Button>
                )}
                {activeTab === "info" && <UserSummaryCard detaljiKorisnika={detalji!} />}
                {activeTab === "account" && showExtraView && (
                    <SideMenu selectedOption={accountTab} onSelect={setAccountTab} items={items} />
                )}
                {activeTab === "ads" && <UserAdsStatsCard userId={detalji!.userId} />

                }
            </Space>
        );
    };


    return (
        <>
            <TwoColumnPageLayout
                title={
                    <SideIntroCard
                        icon={<UsersRound size={26} />}
                        title={`${detalji?.firstName} ${detalji?.lastName ?? ""}`}
                        description={t("details.pageDescription")}
                    />
                }
                sideWidth={7} contentWidth={17} side={renderSide()}>
                <ContentCard>
                    <Space direction="vertical" size={20} className="app-full">
                        <PageTabs activeKey={activeTab} onChange={(k: any) => setActiveTab(k)} items={[
                            { key: "info", label: t("details.tabs.information"), icon: <Info size={20} /> },
                            ...(showExtraView ? [{ key: "account", label: t("details.tabs.account"), icon: <CircleUser size={20} /> }] : []),
                            { key: "ads", label: t("details.tabs.ads"), icon: <Sheet size={20} /> }
                        ]} />

                        {activeTab === "info" && <UserBasicData detaljiKorisnika={detalji!} />}
                        {activeTab === "ads" && <UserAds userId={detalji!.userId} />}
                        {activeTab === "account" && (
                            <UserAccount korisnik={detalji!} userId={detalji!.userId} selectedOption={accountTab} />
                        )}
                    </Space>
                </ContentCard>
            </TwoColumnPageLayout>
            <UserActivityModal open={activityOpen} onClose={() => setActivityOpen(false)} korisnikPovijest={detalji?.userHistory ?? []} />
        </>
    );
};