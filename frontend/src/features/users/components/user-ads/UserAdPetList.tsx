import { Button, Card, Flex, Image, List, Space, Tag, Typography } from "antd";
import { CalendarDays, Eye, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PetAdResponse } from "../../../pet-ads/types/response-types";
import { formatDate } from "../../../../utils/dateUtils";
import { getImage } from "../../../../utils/urlUtils";
import { AdStatus } from "../../../../enums/processEnums";

interface Props {
    data: PetAdResponse[];
}

export const UserPetAdList = ({ data }: Props) => {
    const { t } = useTranslation("users");
    const navigate = useNavigate();

    const succesfullStatuses = [AdStatus.Aktivan, AdStatus.UspjesnoRjeseno]

    return (
        <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={data}
            renderItem={(ad) => (
                <List.Item>
                    <Card bordered={false} style={{ borderRadius: 24, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
                        <Flex align="center" gap={20} wrap="wrap">
                            <Image
                                src={getImage(ad.primaryImage)}
                                preview={false}
                                width={80}
                                height={80}
                                style={{ borderRadius: 16, objectFit: "cover" }}
                            />
                            <Flex vertical flex={1} gap={4}>
                                <Typography.Title level={4} style={{ margin: 0 }}>{ad.breed}</Typography.Title>
                                <Space split={<span style={{ color: "#d9d9d9" }}>|</span>}>
                                    <Space size={6} style={{ color: "#667085" }}>
                                        <CalendarDays size={16} />
                                        <Typography.Text type="secondary">{t("ads.published", { date: formatDate(ad.createdAt) })}</Typography.Text>
                                    </Space>
                                </Space>
                            </Flex>

                            <Tag color={succesfullStatuses.includes(ad.statusId) ? "green" : ad.statusId === AdStatus.UProcesuUdomljavanja ? "blue" : "red"} style={{ borderRadius: 999, padding: "4px 12px" }}>
                                {ad.status ?? t("ads.activeStatus")}
                            </Tag>

                            <Space size={20} style={{ padding: "0 10px" }}>
                                <Space size={6} style={{ color: "#5b4dff" }}>
                                    <Eye size={17} />
                                    <Typography.Text strong>{ad.views ?? 0}</Typography.Text>
                                </Space>
                            </Space>

                            <Button
                                type="default"
                                icon={<MoreHorizontal size={17} />}
                                onClick={() => navigate("/oglasi/detalji", { state: { petAdId: ad.petAdId } })}
                            >
                                {t("ads.detailsButton")}
                            </Button>
                        </Flex>
                    </Card>
                </List.Item>
            )}
        />
    );
};