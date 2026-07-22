import { Col, Row, Space } from "antd";
import type { ReactNode } from "react";
import { BreadCrumbItems } from "../BreadCrumbItems";

interface Props {
    side: ReactNode;
    children: ReactNode;
    title?: ReactNode;
    sideWidth?: number;
    contentWidth?: number;
    dontShowHeader?: boolean;
}

export const TwoColumnPageLayout = ({
    side,
    children,
    title,
    sideWidth = 7,
    contentWidth = 17,
    dontShowHeader = false,
}: Props) => (
    <Space direction="vertical" size={24} className="app-full">
        {!dontShowHeader && (
            <Space direction="vertical" size={18} className="app-full">
                <BreadCrumbItems />
                {title}
            </Space>
        )}

        <Row gutter={[22, 22]} align="top">
            <Col xs={24} lg={sideWidth}>
                <Space direction="vertical" size={18} className="app-full">
                    {side}
                </Space>
            </Col>

            <Col xs={24} lg={contentWidth}>
                {children}
            </Col>
        </Row>
    </Space>
);