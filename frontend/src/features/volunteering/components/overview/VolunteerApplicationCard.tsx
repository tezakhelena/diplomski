import { Avatar, Space, Tag, Typography } from "antd";
import { Briefcase, MapPin, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BaseRequestCard } from "../../../../reusable/BaseRequestCard";
import style from "../../../../reusable/style/UserCard.module.css";
import { VolunteerApplicationResponse } from "../../types/request-types";
import { formatMomentDate } from "../../../../utils/dateUtils";
import { getImage } from "../../../../utils/urlUtils";
import { getTagColorByStatusId } from "../../../../utils/uiUtils/styling";

interface Props {
    application: VolunteerApplicationResponse;
    displayMode: "received" | "sent";
}

export const VolunteerApplicationCard = ({
    application,
    displayMode,
}: Props) => {
    const navigate = useNavigate();

    const isReceived = displayMode === "received";

    const displayedUser = isReceived
        ? {
            id: application.applicantId,
            username: application.applicantUsername,
            profilePicture: application.applicantProfilePicture,
            city: application.applicantCity
        }
        : {
            id: application.organizationId,
            username: application.organizationUsername,
            profilePicture: application.organizationProfilePicture,
            city: application.organizationCity
        };

    const openDetails = () => {
        navigate("/prijave-za-volontiranje/detalji-prijave", {
            state: { volontiranjeId: application.volunteerId },
        });
    };

    return (
        <BaseRequestCard
            onClick={() => openDetails()}
            image={
                <Avatar
                    size={74}
                    src={getImage(displayedUser.profilePicture)}
                    icon={<UserRound />}
                />
            }
            content={
                <Space direction="vertical" size={2}>
                    <Typography.Text strong style={{ fontSize: '16px' }}>
                        {displayedUser.username}
                    </Typography.Text>

                    <Space direction="vertical" size={4} className={style.info}>
                        <Space size={9} className={style.infoRow}>
                            <Briefcase size={17} className="text-secondary" />
                            <Typography.Text type="secondary" ellipsis>
                                {application.volunteerType}
                            </Typography.Text>
                        </Space>

                        {displayedUser.city && (
                            <Space size={9} className={style.infoRow}>
                                <MapPin size={17} className="text-secondary" />
                                <Typography.Text type="secondary" ellipsis>
                                    {displayedUser.city}
                                </Typography.Text>
                            </Space>
                        )}
                    </Space>
                </Space>
            }
            status={
                <Space direction="vertical" align="end" size={8}>
                    <Tag color={getTagColorByStatusId(application.statusId)} style={{ margin: 0 }}>
                        {application.status}
                    </Tag>
                    <Typography.Text type="secondary" style={{ fontSize: '11px' }}>
                        {formatMomentDate(application.appliedAtDate)}
                    </Typography.Text>
                </Space>
            }
        />
    );
};