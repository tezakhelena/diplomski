import { Flex, Space, Typography } from "antd";
import type { ReactNode } from "react";
import style from "../style/TwoColumnPageLayout.module.css";

interface Props {
    icon: ReactNode;
    children: ReactNode;
}

export const SectionTitle = ({ icon, children }: Props) => (
    <Space size={12} align="center" className={style.sectionTitle}>
        <Flex align="center" justify="center" className={style.titleIcon}>
            {icon}
        </Flex>

        <Typography.Text strong className={style.sectionTitleText}>
            {children}
        </Typography.Text>
    </Space>
);