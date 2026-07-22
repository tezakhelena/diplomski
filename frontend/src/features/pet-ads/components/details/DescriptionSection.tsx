import { Card, Typography } from "antd";
import { AlignLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SectionTitle } from "../../../../reusable/two-column-page/SectionTitle";

interface DescriptionSectionProps {
    notes?: string;
}

export const DescriptionSection = ({ notes }: DescriptionSectionProps) => {
    const { t } = useTranslation("petAd");

    return (
        <Card
            bordered={false}
            title={
                <SectionTitle icon={<AlignLeft size={20} />}>
                    {t("details.description.title")}
                </SectionTitle>
            }
        >
            <Typography.Paragraph>
                {notes?.trim() || t("details.description.empty")}
            </Typography.Paragraph>
        </Card>
    );
};