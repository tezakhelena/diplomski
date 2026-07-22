import { Flex, Space, Typography } from "antd";
import type { ReactNode } from "react";
import style from "../style/TwoColumnPageLayout.module.css";

interface Props {
    icon: ReactNode;
    title: string;
    description: ReactNode;
}

export const SideIntroCard = ({ icon, title, description }: Props) => (
    <Space direction="vertical" size={8} className="app-full">
        <Space size={12} align="center">
            <Flex align="center" justify="center" className={style.headerIcon}>
                {icon}
            </Flex>

            <Typography.Title level={2} className={style.title}>
                {title}
            </Typography.Title>
        </Space>

        <Typography.Text className={style.subtitle}>
            {description}
        </Typography.Text>
    </Space>
);