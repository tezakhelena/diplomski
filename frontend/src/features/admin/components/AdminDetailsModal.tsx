import { Empty, Typography } from "antd";
import { Calendar, Flag, MessageSquare, PawPrint } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AntSpin } from "../../../reusable/AntSpin";
import { AppModal } from "../../../reusable/AppModal";
import { useBlockedUserAds, useReportedAdUsers } from "../hooks/useAdminDashboardQueries";
import { DetailCard } from "./DetailCard";
import { formatDate } from "../../../utils/dateUtils";
import { AdStatus } from "../../../enums/processEnums";

interface Props { visible: boolean; onClose: () => void; petAdId?: number | null; userId?: number | null; }

export const AdminDetailsModal = ({ visible, onClose, petAdId, userId }: Props) => {
    const { t } = useTranslation('admin');
    const { data: reportedAdUsers = [], isLoading: isReportedLoading } = useReportedAdUsers(petAdId || undefined);
    const { data: blockedUserAds = [], isLoading: isBlockedLoading } = useBlockedUserAds(userId || undefined);
    const isReportMode = !!petAdId;
    const isLoading = isReportMode ? isReportedLoading : isBlockedLoading;

    return (
        <AppModal
            open={visible}
            title={isReportMode ? t("admin.modal.reportTitle") : t("admin.modal.blockedUserAdsTitle")}
            icon={isReportMode ? <Flag size={24} /> : <PawPrint size={24} />}
            hideFooter width={750}
            onCancel={onClose}
        >
            <AntSpin loading={isLoading}>
                {isReportMode ? (
                    reportedAdUsers.length === 0 ? <Empty description={t("admin.modal.noReports")} /> : (
                        reportedAdUsers.map((item) => (
                            <DetailCard
                                key={`${item.petAdId}-${item.user.userId}`}
                                imgSrc={item.user.profilePictureUrl}
                                title={item.user.username}
                                tag={item.reason}
                                tagColor="error"
                                subtitle={<Typography.Text type="secondary"><MessageSquare size={14} style={{ marginRight: 6 }} />{item.comment}</Typography.Text>}
                            />
                        ))
                    )
                ) : (
                    blockedUserAds.length === 0 ? <Empty description={t("admin.modal.noAds")} /> : (
                        blockedUserAds.map((ad) => (
                            <DetailCard
                                key={ad.petAdId}
                                imgSrc={ad.primaryImage}
                                title={ad.generatedName}
                                tag={ad.statusValue}
                                tagColor={ad.statusId === AdStatus.Aktivan ? "green" : "red"}
                                subtitle={<Typography.Text type="secondary"><Calendar size={14} style={{ marginRight: 6 }} />{t("admin.modal.lastChange")}{formatDate(ad.latestChangeDate)}</Typography.Text>}
                            />
                        ))
                    )
                )}
            </AntSpin>
        </AppModal>
    );
};