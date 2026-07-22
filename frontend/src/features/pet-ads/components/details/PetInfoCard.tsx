import { Card, Col, Row } from "antd";
import {
    BadgeInfo,
    CalendarDays,
    Dna,
    Palette,
    PawPrint,
    ShieldCheck,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { InfoItem } from "../../../../reusable/two-column-page/InfoItem";
import { SectionTitle } from "../../../../reusable/two-column-page/SectionTitle";
import { getSexAvatarConfig } from "../../../../utils/helperFunctions";
import { PetAdDetailResponse } from "../../types/response-types";

interface Props {
    petAd: PetAdDetailResponse;
}

export const PetInfoCard = ({ petAd }: Props) => {
    const { t } = useTranslation("petAd");
    const { text: gender } = getSexAvatarConfig(petAd.petDetails?.gender);

    const maturity =
        petAd.petDetails?.maturity === "O"
            ? t("details.petInfo.maturityValues.adult")
            : petAd.petDetails?.maturity === "M"
                ? t("details.petInfo.maturityValues.young")
                : undefined;

    const items = [
        {
            icon: <PawPrint size={19} />,
            label: t("details.petInfo.species"),
            value: petAd.petDetails?.species,
        },
        {
            icon: <Dna size={19} />,
            label: t("details.petInfo.breed"),
            value: petAd.petDetails?.breed,
        },
        {
            icon: <BadgeInfo size={19} />,
            label: t("details.petInfo.gender"),
            value: gender,
        },
        {
            icon: <CalendarDays size={19} />,
            label: t("details.petInfo.maturity"),
            value: maturity,
        },
        {
            icon: <Palette size={19} />,
            label: t("details.petInfo.furColor"),
            value: petAd.petDetails?.furColor,
        },
        {
            icon: <ShieldCheck size={19} />,
            label: t("details.petInfo.status"),
            value: petAd.petDetails?.status,
        },
    ];

    return (
        <Card
            bordered={false}
            title={
                <SectionTitle icon={<PawPrint size={20} />}>
                    {t("details.petInfo.title")}
                </SectionTitle>
            }
        >
            <Row gutter={[18, 18]}>
                {items.map((item) => (
                    <Col xs={24} sm={12} md={8} key={item.label}>
                        <InfoItem {...item} />
                    </Col>
                ))}
            </Row>
        </Card>
    );
};