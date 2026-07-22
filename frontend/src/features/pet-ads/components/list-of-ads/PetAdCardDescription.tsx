import { ExclamationCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { Space, Tag, Typography } from "antd";
import { Frown } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import { PetAdResponse } from "../../types/response-types";
import { PetCategory } from "../../../../enums/petEnums";

interface Props {
    data: PetAdResponse;
}

export const PetAdCardDescription = ({ data }: Props) => {
    const isMobile = useMediaQuery({ maxWidth: 700 });

    const tagColor = data.categoryId === PetCategory.TraziSe ? "red" : (data.categoryId === PetCategory.Pronadjen ? "geekblue" : "volcano");
    const tagIcon = data.categoryId === PetCategory.TraziSe ? <SearchOutlined /> : (data.categoryId === PetCategory.Pronadjen ? <ExclamationCircleOutlined /> : <Frown size={14}/>)

    return (
        !isMobile ? (
            <Space direction="vertical" size={2}>
                <Typography.Text style={{ textTransform: 'uppercase', fontWeight: 'bold' }}><strong>{data?.breed}</strong></Typography.Text>
                <Tag color={tagColor} icon={tagIcon}>{data.category}</Tag>
                <Typography.Text type="secondary" style={{ fontSize: '12px' }}>{data.county} </Typography.Text>
            </Space>
        ) : (
            <Space direction="vertical" size={2}>
                <Typography.Text style={{ fontSize: '12px', textTransform: 'uppercase', fontWeight: 'bold' }}><strong>{data?.breed}</strong></Typography.Text>
                <Tag bordered={false} style={{ borderRadius: '20px', backgroundColor: '#7c65ff', color: '#fff' }}>{data.category}</Tag>
                <Typography.Text type="secondary" style={{ fontSize: '12px' }}>{data.county} </Typography.Text>
            </Space>
        )
    )
}