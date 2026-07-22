import { Card, Flex, Space, Typography } from "antd";
import { PawPrint, ShieldCheck, Users } from "lucide-react";
import React from "react";
import style from "../../features/authentication/style/Authentication.module.css";

const { Title, Text, Paragraph } = Typography;

interface Props {
    children: React.ReactNode;
}

export const AuthLayout = ({ children }: Props) => {
    const features = [
        {
            icon: <PawPrint size={22} />,
            title: "Pronađi izgubljene ljubimce",
            description: "Brzo i jednostavno prijavi ili pronađi izgubljenog ljubimca.",
        },
        {
            icon: <Users size={22} />,
            title: "Udomi i spasi život",
            description: "Pruži dom ljubimcu kojem je potrebna ljubav i briga.",
        },
        {
            icon: <ShieldCheck size={22} />,
            title: "Sigurna zajednica",
            description: "Provjeravamo korisnike kako bismo osigurali sigurnost svih.",
        },
    ];

    return (
        <Flex align="center" justify="center" className={style.page}>
            <Card bordered={false} className={style.authCard}>
                <Flex className={style.authLayout}>
                    <Flex vertical className={style.leftPanel}>
                        <Space size={10} className={style.brand}>
                            <PawPrint size={32} />
                            <Text strong>LostPaw</Text>
                        </Space>

                        <Space direction="vertical" size={16} className={style.heroText}>
                            <Title level={1} className={style.title}>
                                Dobrodošli u <br />
                                <span>LostPaw</span>
                            </Title>

                            <Text className={style.subtitle}>
                                Zajedno možemo pomoći izgubljenim ljubimcima da pronađu svoj put kući.
                            </Text>
                        </Space>

                        <Space direction="vertical" size={18} className={style.features}>
                            {features.map((feature) => (
                                <Flex key={feature.title} gap={14} align="flex-start">
                                    <Flex align="center" justify="center" className={style.featureIcon}>
                                        {feature.icon}
                                    </Flex>

                                    <Space direction="vertical" size={2}>
                                        <Text strong>{feature.title}</Text>
                                        <Paragraph className={style.featureText}>
                                            {feature.description}
                                        </Paragraph>
                                    </Space>
                                </Flex>
                            ))}
                        </Space>
                    </Flex>

                    <Flex vertical className={style.rightPanel}>
                        <Flex vertical justify="center" className={style.actionContent}>
                            {children}

                            <Text className={style.footer}>
                                © 2026 LostPaw. Sva prava pridržana.
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Card>
        </Flex>
    );
};