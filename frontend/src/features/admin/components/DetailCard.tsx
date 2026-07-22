import { Avatar, Card, Space, Tag, Typography } from "antd";
import { getImage } from "../../../utils/urlUtils";

interface Props {
    imgSrc: string;
    title: string;
    subtitle: React.ReactNode;
    tag?: string;
    tagColor?: string
}

export const DetailCard = ({
    imgSrc,
    title,
    subtitle,
    tag,
    tagColor = "default"
}: Props) => (
    <Card bordered={false}>
        <Space align="start" size={16}>
            <Avatar size={46} src={getImage(imgSrc)} />
            <Space direction="vertical" size={4}>
                <Typography.Text strong>{title}</Typography.Text>
                {tag && <Tag color={tagColor}>{tag}</Tag>}
                <Typography.Text type="secondary">{subtitle}</Typography.Text>
            </Space>
        </Space>
    </Card>
);