import { Card, Flex, Space, Typography } from "antd";
import { ChevronRight } from "lucide-react";
import React from "react";
import style from "../../features/authentication/style/Authentication.module.css";

const { Paragraph, Title } = Typography;

interface Props {
    title: string;
    description: string;
    icon: React.ReactNode;
    cardClass?: string;
    iconClass?: string;
    onClick?: () => void;
}

export const AuthOptionCard = ({
    title,
    description,
    icon,
    cardClass,
    iconClass,
    onClick,
}: Props) => {
    return (
        <Card
            bordered={false}
            hoverable
            className={`${style.optionCard} ${cardClass ?? ""}`}
            onClick={onClick}
        >
            <Flex align="center" gap={18}>
                <Flex
                    align="center"
                    justify="center"
                    className={`${style.optionIcon} ${iconClass ?? ""}`}
                >
                    {icon}
                </Flex>

                <Space direction="vertical" size={4} className={style.optionText}>
                    <Title level={4} className={style.optionTitle}>
                        {title}
                    </Title>

                    <Paragraph>
                        {description}
                    </Paragraph>
                </Space>

                <ChevronRight size={26} className={style.chevron} />
            </Flex>
        </Card>
    );
};