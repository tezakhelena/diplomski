import { Avatar, Image, Space, Tag, Typography } from "antd";
import { BaseRequestCard } from "../../../reusable/BaseRequestCard";
import { getFirstPetImage } from "../../../utils/helperFunctions";
import { usePetAdDetails } from "../../pet-ads/hooks/usePetAdQueries";
import style from "../style/AdoptionRequests.module.css";
import { AdoptionRequestsResponse } from "../types/response-types";
import { MapPin } from "lucide-react";
import { formatMomentDate } from "../../../utils/dateUtils";
import { getImage } from "../../../utils/urlUtils";
import { getTagColorByStatusId } from "../../../utils/uiUtils/styling";
import { useTranslation } from "react-i18next";

interface AdoptionRequestCardProps {
    request: AdoptionRequestsResponse;
    onClick: () => void;
}

export const AdoptionRequestCard = ({ request, onClick }: AdoptionRequestCardProps) => {
    const { petAdDetails } = usePetAdDetails(request.petAdId);
    const { t } = useTranslation('adoption');

    return (
        <BaseRequestCard
            onClick={onClick}
            image={<Image src={getImage(getFirstPetImage(petAdDetails))} preview={false} className={style.petImage} />}
            content={
                <Space direction="vertical" size={4} className="app-full">
                    <Typography.Text strong style={{ margin: 0 }}>
                        {t('adoption.list.adCode')} {petAdDetails?.generatedTitle}
                    </Typography.Text>

                    <Space size={8} wrap>
                        <Tag bordered={false} color="purple">{petAdDetails?.petDetails.species}</Tag>
                        {petAdDetails?.petDetails.breed && (
                            <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
                                {petAdDetails.petDetails.breed}
                            </Typography.Text>
                        )}
                    </Space>

                    <Space size={16} style={{ marginTop: '8px' }}>
                        <Space size={4} className={style.infoRow}>
                            <MapPin size={14} className="text-secondary" />
                            <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
                                {petAdDetails?.city || t('adoption.list.unknown')}
                            </Typography.Text>
                        </Space>

                        <Space size={4}>
                            <Avatar size={18} src={getImage(request.applicantProfilePicture)} />
                            <Typography.Text style={{ fontSize: '12px' }}>
                                {request.applicantUsername}
                            </Typography.Text>
                        </Space>
                    </Space>
                </Space>
            }
            status={
                <Space direction="vertical" size={8} align="end">
                    <Tag color={getTagColorByStatusId(request.statusId)} style={{ marginRight: 0 }}>
                        {request.statusValue}
                    </Tag>
                    <Typography.Text type="secondary" style={{ fontSize: '11px' }}>
                        {formatMomentDate(request.createdAt)}
                    </Typography.Text>
                </Space>
            }
        />
    );
};