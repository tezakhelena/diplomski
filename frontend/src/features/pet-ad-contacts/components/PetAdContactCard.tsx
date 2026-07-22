import { Avatar, Space, Tag, Typography } from "antd";
import { Mail, MailOpen } from "lucide-react";
import { useTranslation } from "react-i18next";
import { BaseRequestCard } from "../../../reusable/BaseRequestCard";
import { PetAdContactResponse } from "../types/response-types";
import style from "../styles/PetAdContactCard.module.css";
import { getImage } from "../../../utils/urlUtils";
import { formatMomentDate } from "../../../utils/dateUtils";

interface Props {
    contact: PetAdContactResponse;
    type: "received" | "sent";
    onClick: () => void;
}

export const PetAdContactCard = ({ contact, type, onClick }: Props) => {
    const { t } = useTranslation("petAdContact");
    const isReceived = type === "received";
    const isUnread = isReceived && !contact.isRead;

    const statusText = contact.answer
        ? t("card.status.answered")
        : isReceived ? t("card.status.pendingYourAnswer") : t("card.status.pending");

    const statusClass = contact.answer ? style.statusAnswered : style.statusPending;

    return (
        <BaseRequestCard
            onClick={onClick}
            image={
                <Avatar size={54} src={contact.contactUserProfilePicture ? getImage(contact.contactUserProfilePicture) : undefined}>
                    {contact.contactUsername?.charAt(0).toUpperCase()}
                </Avatar>
            }
            content={
                <Space direction="vertical" size={2} className="app-full">
                    <Space size={8} align="center" className={style.infoRow}>
                        {isUnread ? <Mail size={16} className="text-primary" /> : <MailOpen size={16} className="text-secondary" />}
                        <Typography.Text strong className={style.username}>
                            {contact.contactUsername}
                        </Typography.Text>
                        {isUnread && <Tag className={style.newTag}>{t("card.new")}</Tag>}
                    </Space>

                    <div style={{ marginTop: '4px' }}>
                        <Typography.Text className={style.petAdTitle} style={{ display: 'block' }}>
                            {contact.petAdTitle}
                        </Typography.Text>
                        <Typography.Text strong>{contact.subject}</Typography.Text>
                        <Typography.Text type="secondary" ellipsis={true} className={style.message} style={{ display: 'block' }}>
                            {contact.message}
                        </Typography.Text>
                    </div>
                </Space>
            }
            status={
                <Space direction="vertical" size={4} align="end">
                    <Typography.Text type="secondary" className={style.date} style={{ fontSize: '12px' }}>
                        {formatMomentDate(contact.createdAt)}
                    </Typography.Text>
                    <Tag className={`${style.statusTag} ${statusClass}`} style={{ margin: 0 }}>
                        {statusText}
                    </Tag>
                </Space>
            }
        />
    );
};