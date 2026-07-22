import { Card, Col, Row } from "antd";
import { CalendarDays, MapPinned, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { InfoItem } from "../../../../reusable/two-column-page/InfoItem";
import { SectionTitle } from "../../../../reusable/two-column-page/SectionTitle";
import { PetAdDetailResponse } from "../../types/response-types";
import { formatDate } from "../../../../utils/dateUtils";
import { PetCategory } from "../../../../enums/petEnums";

interface Props {
    petAd: PetAdDetailResponse;
}

export const MissingInfoSection = ({ petAd }: Props) => {
    const { t } = useTranslation("petAd");
    const isLostAd = petAd.categoryId === PetCategory.TraziSe;
    const sectionTitle = isLostAd
        ? t("details.missingInfo.lostTitle")
        : t("details.missingInfo.foundTitle");
    const dateLabel = isLostAd
        ? t("details.missingInfo.lostDate")
        : t("details.missingInfo.foundDate");
    const location = [petAd.city, petAd.county].filter(Boolean).join(", ");

    const items = [
        {
            icon: <MapPinned size={19} />,
            label: t("details.missingInfo.location"),
            value: location || undefined,
        },
        {
            icon: <ShieldCheck size={19} />,
            label: t("details.missingInfo.petStatus"),
            value: petAd.petDetails?.status,
        },
        {
            icon: <CalendarDays size={19} />,
            label: dateLabel,
            value: petAd.petDetails?.missingDate
                ? formatDate(petAd.petDetails.missingDate)
                : undefined,
        },
    ];

    return (
        <Card
            bordered={false}
            title={
                <SectionTitle icon={<MapPinned size={20} />}>
                    {sectionTitle}
                </SectionTitle>
            }
        >
            <Row gutter={[18, 18]}>
                {items.map((item) => (
                    <Col xs={24} md={8} key={item.label}>
                        <InfoItem {...item} />
                    </Col>
                ))}
            </Row>
        </Card>
    );
};