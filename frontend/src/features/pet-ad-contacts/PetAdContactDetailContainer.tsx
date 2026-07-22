import { Space } from "antd";
import { Mail } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../../redux/store";
import { AntSpin } from "../../reusable/AntSpin";
import { ContentCard } from "../../reusable/two-column-page/ContentCard";
import { SideIntroCard } from "../../reusable/two-column-page/SideIntroCard";
import { TwoColumnPageLayout } from "../../reusable/two-column-page/TwoColumnPageLayout";
import { UserCard } from "../../reusable/UserCard";
import { mapToPetAdCard } from "../../utils/helperFunctions";
import { PetAdCard } from "../pet-ads/components/list-of-ads/PetAdCard";
import { usePetAdDetails } from "../pet-ads/hooks/usePetAdQueries";
import { PetAdContactDetailContent } from "./components/PetAdContactDetailContent";
import { usePetAdContactDetail } from "./hooks/usePetAdContactQueries";

interface LocationState { contactId?: number; }

export const PetAdContactDetailContainer = () => {
    const { t } = useTranslation("petAdContact");
    const location = useLocation();
    const { userId } = useSelector((state: RootState) => state.auth);
    const { contactId } = (location.state as LocationState | null) ?? {};

    const { details, isLoading, refetch } = usePetAdContactDetail(contactId, userId);
    const { petAdDetails } = usePetAdDetails(details?.petAdId);

    const petCardDetails = useMemo(() => (petAdDetails ? mapToPetAdCard(petAdDetails) : null), [petAdDetails]);

    if (!contactId) return <Navigate to="/kontakt" replace />;

    const isReceiver = details?.receiverId === userId;
    const otherUserId = details?.senderId === userId ? details?.receiverId : details?.senderId;

    return (
        <TwoColumnPageLayout
            sideWidth={8}
            contentWidth={16}
            title={<SideIntroCard icon={<Mail size={30} />} title={t("container.title")} description={t("container.description")} />}
            side={
                <Space direction="vertical" size={16} className="app-full">
                    {petCardDetails && <PetAdCard pet={petCardDetails} />}
                    {otherUserId && (
                        <UserCard
                            userId={otherUserId}
                            title={isReceiver ? t("container.sender") : t("container.receiver")}
                            navigateTo="/contacts/profil"
                        />
                    )}
                </Space>
            }
        >
            <ContentCard>
                <AntSpin loading={isLoading}>
                    {details && (
                        <PetAdContactDetailContent
                            details={details}
                            isReceiver={isReceiver}
                            refetch={refetch}
                        />
                    )}
                </AntSpin>
            </ContentCard>
        </TwoColumnPageLayout>
    );
};