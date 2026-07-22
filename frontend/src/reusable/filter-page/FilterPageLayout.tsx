import { Col, Flex, Row, Space, Typography } from "antd";
import React from "react";
import { BreadCrumbItems } from "../BreadCrumbItems";
import style from "../style/FilterPageLayout.module.css";

const { Title, Text } = Typography;

interface Props {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    filter: React.ReactNode;
    content: React.ReactNode;
    activeFilters?: React.ReactNode;
    actions?: React.ReactNode;
    pageType?: "filter" | "page";
}

export const FilterPageLayout = ({
    icon,
    title,
    subtitle,
    filter,
    content,
    activeFilters,
    actions,
    pageType,
}: Props) => {
    return (
        <Flex vertical>
            <BreadCrumbItems />

            <Flex justify="space-between" align="center" className={style.header}>
                <Space direction="vertical" size={8}>
                    <Space size={12}>
                        <div className={style.headerIcon}>
                            {icon}
                        </div>

                        <Title className={style.title}>
                            {title}
                        </Title>
                    </Space>

                    <Text className={style.subtitle}>
                        {subtitle}
                    </Text>
                </Space>

                {actions}
            </Flex>

            <Row gutter={[24, 24]} align="top">
                <Col xs={24} lg={pageType === "filter" ? 6 : 7}>
                    {filter}
                </Col>

                <Col xs={24} lg={pageType === "filter" ? 13 : 12}>
                    {content}
                </Col>

                {activeFilters && (
                    <Col xs={24} lg={5}>
                        {activeFilters}
                    </Col>
                )}
            </Row>
        </Flex>
    );
};