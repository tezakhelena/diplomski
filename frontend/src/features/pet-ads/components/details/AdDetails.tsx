import { Alert, Card, Divider, Space, Tag, Typography } from "antd";
import { Clock, MapPin, PawPrint } from "lucide-react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "../../../../redux/store";
import { SideIntroCard } from "../../../../reusable/two-column-page/SideIntroCard";
import { TwoColumnPageLayout } from "../../../../reusable/two-column-page/TwoColumnPageLayout";
import { UserCard } from "../../../../reusable/UserCard";
import { PetAdComments } from "../../../comments/components/PetAdComments";
import { PetAdDetailResponse, PetAdResponse } from "../../types/response-types";
import { AdDetailsExtraButtons } from "./AdDetailsExtraButtons";
import { AdInfoCard } from "./AdInfoCard";
import { AdPictures } from "./AdPictures";
import { DescriptionSection } from "./DescriptionSection";
import { MissingInfoSection } from "./MissingInfoSection";
import { PetInfoCard } from "./PetInfoCard";
import { SimilarAdsSection } from "./SimilarAdsSection";
import { formatDate } from "../../../../utils/dateUtils";
import { formatReward } from "../../../../utils/formatters";
import { getTagColorByStatusId } from "../../../../utils/uiUtils/styling";
import { getAdStatusColor, getAdStatusLabel } from "../../../../utils/helperFunctions";

interface Props {
    petAd?: PetAdDetailResponse;
    refetch: () => void;
    data: PetAdResponse[];
}

export const AdDetails = ({ petAd, refetch, data }: Props) => {
    const { t } = useTranslation("petAd");
    const userId = useSelector((state: RootState) => state.auth.userId);

    if (!petAd) return null;

    const sameUserId = userId === petAd.userId;
    const userReported = petAd.userReportedIds?.includes(userId);
    const location = [petAd.city, petAd.county].filter(Boolean).join(", ");

    return (
        <Space direction="vertical" size={24} className="app-full">
            <TwoColumnPageLayout
                sideWidth={16}
                contentWidth={8}
                title={
                    <SideIntroCard
                        title={petAd.petDetails?.breed || petAd.generatedTitle}
                        description={
                            <Space wrap size={[14, 8]}>
                                <Tag color={getTagColorByStatusId(petAd.categoryId)}>{petAd.category}</Tag>
                                <Alert message={getAdStatusLabel(petAd.statusId)} type={getAdStatusColor(petAd.statusId)} showIcon />
                                <Space size={5}>
                                    <MapPin size={15} color="#5b4dff" />
                                    <Typography.Text type="secondary">
                                        {location || t("details.header.locationUnavailable")}
                                    </Typography.Text>
                                </Space>

                                <Space size={5}>
                                    <Clock size={15} color="#5b4dff" />
                                    <Typography.Text type="secondary">
                                        {t("details.header.published", {
                                            date: formatDate(petAd.createdAt)
                                        })}
                                    </Typography.Text>
                                </Space>
                                <Tag color="cyan">
                                    {t("details.header.reward", {
                                        reward: formatReward(petAd.reward)
                                    })}
                                </Tag>

                            </Space>
                        }
                        icon={<PawPrint />}
                    />
                }
                side={
                    <Space direction="vertical" size={18} className="app-full">
                        <Card styles={{ body: { padding: 8 } }}>
                            <AdPictures petAd={petAd} />
                        </Card>

                        <AdInfoCard petAd={petAd} />
                        <MissingInfoSection petAd={petAd} />
                        <DescriptionSection notes={petAd.notes} />
                        <PetInfoCard petAd={petAd} />
                    </Space>
                }
            >
                <Space direction="vertical" size={18} className={`app-full`}>
                    <UserCard
                        userId={petAd.userId}
                        title={t("details.ownerCardTitle")}
                        navigateTo="/oglasi/profil"
                    />

                    <AdDetailsExtraButtons
                        refetch={refetch}
                        petAd={petAd}
                        petAdId={petAd.petAdId}
                        sameUserId={sameUserId}
                        userReported={userReported}
                    />

                    <PetAdComments petAdId={petAd.petAdId} />
                </Space>
            </TwoColumnPageLayout>

            <Divider />

            <SimilarAdsSection data={data} />
        </Space>
    );
};