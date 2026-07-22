import { Card, Divider, Flex, List, Space, Typography } from "antd";
import { useTranslation } from "react-i18next";

interface RuleItem {
    title: string;
    description: string;
}

interface RuleSectionData {
    title: string;
    items: RuleItem[];
}

const RulesSection = ({ title, items }: RuleSectionData) => (
    <Space direction="vertical" size={12} className="app-full">
        <Typography.Title level={5} style={{ margin: 0 }}>{title}</Typography.Title>
        <List
            split={false}
            dataSource={items}
            renderItem={(item) => (
                <List.Item style={{ padding: "4px 0" }}>
                    <Typography.Text>
                        <Typography.Text strong>{item.title}: </Typography.Text>
                        {item.description}
                    </Typography.Text>
                </List.Item>
            )}
        />
    </Space>
);

export const PravilaPlatforme = () => {
    const { t } = useTranslation("rules");

    const platformRulesKeys = ["user-responsibilities", "privacy", "disclaimer", "prohibited-activities", "reports-and-suspension"];
    const blockedAdReasonsKeys = ["platform-violations", "animal-welfare", "security"];

    return (
        <Flex justify="center" style={{ padding: 25 }}>
            <Card style={{ width: "100%", maxWidth: 700 }}>
                <Space direction="vertical" size={24} className="app-full">
                    <Space direction="vertical" size={4}>
                        <Typography.Title level={4} style={{ margin: 0 }}>{t("title")}</Typography.Title>
                        <Typography.Text type="secondary">{t("lastUpdated")}</Typography.Text>
                    </Space>

                    <Typography.Paragraph style={{ margin: 0 }}>
                        {t("welcome")}
                    </Typography.Paragraph>

                    <Space direction="vertical" size={24} className="app-full">
                        {platformRulesKeys.map((key) => (
                            <RulesSection
                                key={key}
                                title={t(`sections.${key}.title`)}
                                items={t(`sections.${key}.items`, { returnObjects: true }) as RuleItem[]}
                            />
                        ))}
                    </Space>

                    <Divider />

                    <Typography.Title level={4} style={{ margin: 0 }}>{t("blockedReasonsTitle")}</Typography.Title>

                    <Space direction="vertical" size={24} className="app-full">
                        {blockedAdReasonsKeys.map((key) => (
                            <RulesSection
                                key={key}
                                title={t(`sections.${key}.title`)}
                                items={t(`sections.${key}.items`, { returnObjects: true }) as RuleItem[]}
                            />
                        ))}
                    </Space>
                </Space>
            </Card>
        </Flex>
    );
};