import { Space, Typography } from "antd";
import { PawPrint } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import style from "../style/Notifications.module.css";

interface Props {
    description: string;
    visible: boolean;
    fromApp: boolean;
    goToDetails?: boolean;
    petAdId?: number;
    procitano?: number;
}

export const NotificationDescription = ({ description, visible, fromApp, goToDetails, petAdId }: Props) => {
    const { t } = useTranslation("notifications");

    return (
        <Space direction="vertical" size={6}>
            <Typography.Text type="secondary" className={style.descriptionText}>
                {description}
            </Typography.Text>

            {goToDetails && (
                <Link className={style.notificationLink} to="/oglasi/detalji" state={{ petAdId }}>
                    {t("description.detailsLink")}
                </Link>
            )}

            {visible && (
                <Link className={style.notificationLink} to="/uvjeti">
                    {t("description.moreInfo")}
                </Link>
            )}

            {fromApp && (
                <>
                    <Typography.Text type="secondary">
                        {t("description.appFooter")}
                    </Typography.Text>

                    <Typography.Text strong className={style.teamText}>
                        <Space>
                            <PawPrint size={17} />
                            {t("description.team")}
                        </Space>
                    </Typography.Text>
                </>
            )}
        </Space>
    );
};[]