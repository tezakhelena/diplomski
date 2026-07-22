import { Card, Flex, Space, Typography } from "antd";
import React from "react";
import style from "../style/TwoColumnPageLayout.module.css";

export interface QuickStatItemData {
    icon: React.ReactNode;
    title: string;
    description?: string;
    value: number;
}

interface Props {
    title?: string;
    items: QuickStatItemData[];
}

export const QuickStatsCard = ({ title = "Brzi pregled", items }: Props) => {
    return (
        <Card bordered={false}>
            <Space direction="vertical" size={16} className="app-full">
                <Typography.Title level={4} className={style.sectionTitle}>
                    {title}
                </Typography.Title>

                {items.map((item) => (
                    <Card bordered={false} key={item.title}>
                        <Flex align="center" justify="space-between" gap={14}>
                            <Space size={14}>
                                <div className={style.statIcon}>{item.icon}</div>

                                <Space direction="vertical" size={2}>
                                    <Typography.Text strong>{item.title}</Typography.Text>
                                    <Typography.Text type="secondary">
                                        {item.description}
                                    </Typography.Text>
                                </Space>
                            </Space>

                            <Typography.Text className={style.statValue}>
                                {item.value}
                            </Typography.Text>
                        </Flex>
                    </Card>
                ))}
            </Space>
        </Card>
    );
};