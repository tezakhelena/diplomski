import { Avatar, Card, Col, Row, Space, Typography } from "antd";
import { FilePlus, Heart, Users } from "lucide-react";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface Step {
    key: string;
    icon: ReactNode;
    title: string;
    description: string;
}

export const HowItWorksCard = () => {
    const { t } = useTranslation('homePage');

    const steps: Step[] = [
        {
            key: "publish",
            icon: <FilePlus size={28} />,
            title: t("howItWorks.steps.publish.title"),
            description: t("howItWorks.steps.publish.description"),
        },
        {
            key: "community",
            icon: <Users size={28} />,
            title: t("howItWorks.steps.community.title"),
            description: t("howItWorks.steps.community.description"),
        },
        {
            key: "success",
            icon: <Heart size={28} />,
            title: t("howItWorks.steps.success.title"),
            description: t("howItWorks.steps.success.description"),
        },
    ];

    return (
        <Card
            bordered={false}
            title={t("howItWorks.title")}
            style={{ height: "100%", boxShadow: "0 14px 40px rgba(24, 31, 56, 0.07)", border: "1px solid rgba(238, 240, 247, 0.9)" }}
        >
            <Row gutter={[18, 24]}>
                {steps.map((step) => (
                    <Col xs={24} sm={8} xl={24} xxl={8} key={step.key}>
                        <Space direction="vertical" align="center" size={12} style={{ width: "100%", textAlign: "center" }}>
                            <Avatar size={66} icon={step.icon} style={{ background: "#f0edff", color: "#6c5cff" }} />
                            <Typography.Text strong>{step.title}</Typography.Text>
                            <Typography.Text type="secondary">{step.description}</Typography.Text>
                        </Space>
                    </Col>
                ))}
            </Row>
        </Card>
    );
};