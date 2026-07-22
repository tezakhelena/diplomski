import { Card, Col, Row } from "antd";
import { CalendarDays, Eye, FileText } from "lucide-react";
import { useTranslation } from "react-i18next";
import { InfoItem } from "../../../../reusable/two-column-page/InfoItem";
import { SectionTitle } from "../../../../reusable/two-column-page/SectionTitle";
import { PetAdDetailResponse } from "../../types/response-types";
import { formatDate } from "../../../../utils/dateUtils";

interface Props {
    petAd: PetAdDetailResponse;
}

export const AdInfoCard = ({ petAd }: Props) => {
    const { t } = useTranslation("petAd");

    const items = [
        {
            icon: <FileText size={19} />,
            label: t("details.adInfo.code"),
            value: petAd.generatedTitle,
        },
        {
            icon: <CalendarDays size={19} />,
            label: t("details.adInfo.published"),
            value: formatDate(petAd.createdAt),
        },
        {
            icon: <Eye size={19} />,
            label: t("details.adInfo.views"),
            value: t("details.adInfo.viewsValue", {
                count: petAd.views ?? 0
            }),
        },
    ];

    return (
        <Card
            bordered={false}
            title={
                <SectionTitle icon={<CalendarDays size={20} />}>
                    {t("details.adInfo.title")}
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