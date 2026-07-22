import { Card, Col, Row } from "antd";
import { ChevronRight } from "lucide-react";
import { ReactNode } from "react";
import style from "./style/BaseRequestCard.module.css";

interface BaseRequestCardProps {
    onClick: () => void;
    image: ReactNode;
    content: ReactNode;
    status: ReactNode;
}

export const BaseRequestCard = ({ onClick, image, content, status }: BaseRequestCardProps) => (
    <Card hoverable onClick={onClick} bordered={false}>
        <Row gutter={[18, 18]} align="middle">
            <Col flex="auto" style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                {image}
                {content}
            </Col>
            <Col>{status}</Col>
            <Col><ChevronRight size={22} className={style.chevron} /></Col>
        </Row>
    </Card>
);