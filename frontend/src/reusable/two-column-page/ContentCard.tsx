import { Card, Space } from "antd";
import React from "react";

interface Props {
    children: React.ReactNode;
}

export const ContentCard = ({ children }: Props) => {
    return (
        <Card bordered={false}>
            <Space direction="vertical" size={20} className="app-full">
                {children}
            </Space>
        </Card>
    );
};