import { Flex, Space, Typography } from "antd";
import { ReactNode } from "react";
import style from "../style/TwoColumnPageLayout.module.css";

interface InfoItemProps {
    label: string;
    value?: ReactNode;
    icon?: ReactNode;
}

export const InfoItem = ({ label, value, icon }: InfoItemProps) => (
    <Flex align="center" gap={12} className={style.infoItem}>
        {icon && (
            <Flex align="center" justify="center" className={style.infoItemIcon}>
                {icon}
            </Flex>
        )}

        <Space direction="vertical" size={2}>
            <Typography.Text type="secondary">{label}</Typography.Text>
            <Typography.Text strong>{value ?? "-"}</Typography.Text>
        </Space>
    </Flex>
);