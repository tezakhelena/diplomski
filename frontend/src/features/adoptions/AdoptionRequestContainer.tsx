import { Alert, Space } from "antd";
import { HeartHandshake } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../../redux/store";
import { ContentCard } from "../../reusable/two-column-page/ContentCard";
import { SideIntroCard } from "../../reusable/two-column-page/SideIntroCard";
import { TwoColumnPageLayout } from "../../reusable/two-column-page/TwoColumnPageLayout";
import { blockedStatuses, importantStatuses, mapToPetAdCard } from "../../utils/helperFunctions";
import { useStatuses } from "../attributes/hooks/useAttributes";
import { AdoptionContractTable } from "../contracts/components/AdoptionContractTable";
import { usePetAdDetails } from "../pet-ads/hooks/usePetAdQueries";
import { AdoptionActions } from "./components/AdoptionActions";
import AdoptionForm from "./components/AdoptionForm";
import { AdoptionProcessProgress } from "./components/AdoptionProcessProgress";
import { AdoptionSideDetails } from "./components/AdoptionSideDetails";
import { useAdoptionDetails } from "./hooks/useAdoptionQueries";
import { AdoptionProcessStatus } from "../../enums/processEnums";

export const AdoptionRequestContainer = () => {
    const { t } = useTranslation('adoption');
    const { state } = useLocation();
    const { userId } = useSelector((state: RootState) => state.auth);

    const { adoptionId, petAdId, adOwnerId } = state || {};
    const isDetailMode = !!adoptionId;

    const { details, refetch } = useAdoptionDetails(adoptionId, userId);
    const { data: statuses } = useStatuses(6);

    const currentPetAdId = isDetailMode ? details?.petAdId : petAdId;
    const { petAdDetails } = usePetAdDetails(currentPetAdId);

    const petCardDetails = useMemo(() => petAdDetails ? mapToPetAdCard(petAdDetails) : null, [petAdDetails]);

    if (!isDetailMode && (!petAdId || !adOwnerId)) {
        return <Navigate to="/" replace />;
    }

    const isImportant = importantStatuses.includes(details?.statusId ?? 0);
    const isBlocked = blockedStatuses.includes(details?.statusId ?? 0);

    return (
        <TwoColumnPageLayout
            title={
                <SideIntroCard
                    icon={<HeartHandshake size={30} />}
                    title={t('adoption.container.title')}
                    description={isDetailMode
                        ? t('adoption.container.descDetail')
                        : t('adoption.container.descCreate')
                    }
                />
            }
            side={
                <AdoptionSideDetails
                    pet={petCardDetails!}
                    userId={isDetailMode ? details?.userId : userId}
                    adOwnerId={isDetailMode ? details?.adOwnerId : adOwnerId}
                />
            }
            sideWidth={8}
            contentWidth={16}
        >
            <Space direction="vertical" size={16} className="app-full">
                <ContentCard>
                    <AdoptionForm
                        {...(isDetailMode
                            ? { initialValues: details, disabled: true, podnositeljId: details?.userId ?? 0 }
                            : { petAdId, podnositeljId: userId ?? 0 }
                        )}
                    />

                    {isDetailMode && details && (
                        <AdoptionActions
                            adoptionId={adoptionId}
                            currentStatusId={details.statusId}
                            oglasivacId={details.adOwnerId}
                            podnositeljId={details.userId}
                            refetch={refetch}
                        />
                    )}
                </ContentCard>

                {isDetailMode && isBlocked && (
                    <Alert
                        message={details?.statusValue}
                        description={details?.reason}
                        type={details?.statusId === AdoptionProcessStatus.UdomljavanjeOdobreno ? "success" : "error"}
                        showIcon
                    />

                )}

                {isDetailMode && isImportant && details && (
                    <>
                        <AdoptionProcessProgress detalji={details} statusi={statuses ?? []} />
                        {details.contract && <AdoptionContractTable data={details} />}
                    </>
                )}
            </Space>
        </TwoColumnPageLayout>
    );
};