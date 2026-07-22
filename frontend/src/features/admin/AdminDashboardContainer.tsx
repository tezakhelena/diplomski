import { SettingOutlined } from "@ant-design/icons";
import { Card, Col, Row, StatisticProps, Tabs } from "antd";
import { AlertTriangle, Ban, CheckCircle, Clock, PawPrint, UserCheck, Users } from "lucide-react";
import { useMemo, useState } from "react";
import CountUp from "react-countup";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "../../redux/store";
import { BreadCrumbItems } from "../../reusable/BreadCrumbItems";
import { SideIntroCard } from "../../reusable/two-column-page/SideIntroCard";
import { PetAdsTable } from "../pet-ads/components/list-of-ads/PetAdsTable";
import { usePetAdMutations } from "../pet-ads/hooks/usePetAdMutations";
import { UsersOverviewTable } from "../users/components/overview/UsersOverviewTable";
import { AdminDetailsModal } from "./components/AdminDetailsModal";
import { RegionPieChart } from "./components/RegionPieChart";
import { StatCard } from "./components/StatCard";
import { useAdminCharts, useAdminStatistics } from "./hooks/useAdminDashboardQueries";
import { AdStatus } from "../../enums/processEnums";
import { AttributeManager } from "../attributes/components/AttributeManager";

export const AdminDashboardContainer = () => {
    const { t } = useTranslation('admin');
    const auth = useSelector((state: RootState) => state.auth);

    const formatter: StatisticProps["formatter"] = (value) => <CountUp end={value as number} separator="," />;
    const { data: statistics, refetch: refetchStatistics, isLoading: statisticsLoading } = useAdminStatistics();
    const { data: chartStatistics, isLoading: chartLoading } = useAdminCharts();
    const { changeAdStatus, isStatusChangingBoolean, isStatusChanging } = usePetAdMutations();

    const handleActivateAd = async (petAdId: number) => {
        await changeAdStatus({ petAdId, statusId: AdStatus.Aktivan, userId: auth.userId });
        refetchStatistics();
    };

    const [modalConfig, setModalConfig] = useState({ visible: false, petAdId: null as number | null, userId: null as number | null });
    const openReportedAds = (petAdId: number) => setModalConfig({ visible: true, petAdId, userId: null });
    const openUserAds = (userId: number) => setModalConfig({ visible: true, petAdId: null, userId });
    const closeModal = () => setModalConfig({ visible: false, petAdId: null, userId: null });

    const userStatistics = useMemo(() => [
        { title: t("admin.dashboard.stats.activeUsers"), value: statistics?.activeUsersCount, icon: <Users size={24} /> },
        { title: t("admin.dashboard.stats.pendingUsers"), value: statistics?.usersPendingCount, icon: <Clock size={24} /> },
        { title: t("admin.dashboard.stats.suspendedUsers"), value: statistics?.usersSuspendedCount, icon: <UserCheck size={24} /> },
    ], [statistics, t]);

    const adStatistics = useMemo(() => [
        { title: t("admin.dashboard.stats.activeAds"), value: statistics?.activeAdsCount, icon: <PawPrint size={24} /> },
        { title: t("admin.dashboard.stats.reportedAds"), value: statistics?.reportedAdsCount, icon: <AlertTriangle size={24} /> },
        { title: t("admin.dashboard.stats.blockedAds"), value: statistics?.blockedAdsCount, icon: <Ban size={24} /> },
        { title: t("admin.dashboard.stats.successAds"), value: statistics?.successfullAdsCount, icon: <CheckCircle size={24} /> },
    ], [statistics, t]);

    const chartsConfig = [
        { data: chartStatistics?.countyStatistics, title: t("admin.dashboard.charts.usersByCounty") },
        { data: chartStatistics?.businessUserStatistics, title: t("admin.dashboard.charts.usersByProfile") },
        { data: chartStatistics?.adsCountyStatistics, title: t("admin.dashboard.charts.adsByCounty") },
        { data: chartStatistics?.categoryStatistics, title: t("admin.dashboard.charts.adsByCategory") },
    ];

    return (
        <>
            <BreadCrumbItems />
            <Tabs defaultActiveKey="1" items={[
                {
                    key: '1', label: t("admin.dashboard.tabOverview"), children: (
                        <Row gutter={[24, 24]}>
                            <Col span={24}>
                                <SideIntroCard
                                    icon={<SettingOutlined size={26} />}
                                    title={t("admin.dashboard.title")}
                                    description={t("admin.dashboard.description")}
                                />
                            </Col>
                            <Col xs={24} xl={12}>
                                <Card title={t("admin.dashboard.userStats")}>
                                    <Row gutter={[16, 16]}>
                                        {userStatistics.map((item) =>
                                            <Col xs={24} sm={8} key={item.title}>
                                                <StatCard loading={statisticsLoading} {...item} formatter={formatter} />
                                            </Col>)}
                                    </Row>
                                </Card>
                            </Col>
                            <Col xs={24} xl={12}>
                                <Card title={t("admin.dashboard.adStats")}>
                                    <Row gutter={[16, 16]}>
                                        {adStatistics.map((item) =>
                                            <Col xs={24} sm={12} md={6} key={item.title}>
                                                <StatCard loading={statisticsLoading} {...item} formatter={formatter} />
                                            </Col>)}
                                    </Row>
                                </Card>
                            </Col>
                            {chartsConfig.map((chart) =>
                                <Col xs={24} md={12} key={chart.title}>
                                    <RegionPieChart loading={chartLoading} data={chart.data} title={chart.title} />
                                </Col>)}
                        </Row>
                    )
                },
                {
                    key: '2', label: t("admin.dashboard.tabAttributes"), children: (
                        <Row gutter={[24, 24]}>
                            <Col span={24}>
                                <AttributeManager />
                            </Col>
                            <Col xs={24}>
                                <Card bordered={false} title={t("admin.dashboard.tables.suspendedTitle")}>
                                    <UsersOverviewTable
                                        data={statistics?.suspendedUsers ?? []}
                                        variant="suspended"
                                        refetch={refetchStatistics}
                                        isLoading={statisticsLoading}
                                        onOpenUserAds={openUserAds} />
                                </Card>
                            </Col>
                            <Col xs={24}>
                                <Card bordered={false} title={t("admin.dashboard.tables.blockedTitle")}>
                                    <PetAdsTable
                                        data={statistics?.blockedAds ?? []}
                                        onActivateAd={handleActivateAd}
                                        loading={isStatusChangingBoolean}
                                        variant="blocked"
                                        activatingAdId={isStatusChanging} />
                                </Card>
                            </Col>
                            <Col xs={24}>
                                <Card bordered={false} title={t("admin.dashboard.tables.reportedTitle")}>
                                    <PetAdsTable
                                        data={statistics?.reportedAds ?? []}
                                        variant="reported"
                                        onOpenReports={openReportedAds} />
                                </Card>
                            </Col>
                        </Row>
                    )
                }
            ]} />
            <AdminDetailsModal
                visible={modalConfig.visible}
                onClose={closeModal}
                petAdId={modalConfig.petAdId}
                userId={modalConfig.userId}
            />
        </>
    );
};