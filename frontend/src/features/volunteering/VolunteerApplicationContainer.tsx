import { Space, Typography } from "antd";
import { HeartHandshake } from "lucide-react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { RootState } from "../../redux/store";
import { ContentCard } from "../../reusable/two-column-page/ContentCard";
import { SideIntroCard } from "../../reusable/two-column-page/SideIntroCard";
import { TwoColumnPageLayout } from "../../reusable/two-column-page/TwoColumnPageLayout";
import { UserCard } from "../../reusable/UserCard";
import { VolunteerApplicationForm } from "./components/application/VolunteerApplicationForm";
import { useVolunteerApplicationDetails } from "./hooks/useVolunteeringQueries";
import { formatMomentDate } from "../../utils/dateUtils";

export const VolunteerApplicationContainer = () => {
    const { t } = useTranslation("volunteer");
    const { state } = useLocation();
    const auth = useSelector((state: RootState) => state.auth);

    const volontiranjeId = state?.volontiranjeId;
    const poduzeceId = state?.poduzeceId;

    const { details, refetchDetails } = useVolunteerApplicationDetails(volontiranjeId);

    const isDetailMode = !!volontiranjeId;

    if (!volontiranjeId && !poduzeceId) {
        return <Navigate to="/prijave-za-volontiranje" replace />;
    }

    return (
        <>
            <TwoColumnPageLayout
                title={
                    <SideIntroCard
                        icon={<HeartHandshake size={30} />}
                        title={t("application.page.title")}
                        description={t("application.page.description")}
                    />
                }
                side={
                    <Space direction="vertical" size={16} className="app-full">
                        <UserCard
                            userId={isDetailMode ? details?.organizationId : poduzeceId}
                            title={t("application.recipientCardTitle")}
                            navigateTo="/prijave-za-volontiranje/profil"
                            showVolunteerButton={false}
                        />
                        <UserCard userId={isDetailMode ? details?.applicantId : auth.userId} title={t("application.applicantCardTitle")} navigateTo="/prijave-za-volontiranje/profil" footer={
                            isDetailMode && details?.appliedAtDate ? (
                                <Typography.Text>
                                    <strong>{t("application.submittedAt")}</strong>{" "}
                                    {formatMomentDate(details.appliedAtDate)}
                                </Typography.Text>
                            ) : undefined
                        } />
                    </Space>
                }
                sideWidth={8}
                contentWidth={16}
            >
                <ContentCard>
                    <VolunteerApplicationForm
                        {...(isDetailMode ? {
                            initialValues: details,
                            disabled: true,
                            refetch: refetchDetails,
                            volontiranjeId
                        } : {
                            userId: auth?.userId,
                            poduzeceId
                        })}
                    />
                </ContentCard>
            </TwoColumnPageLayout>
        </>
    );
};