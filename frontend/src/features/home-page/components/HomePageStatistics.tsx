import { Card, Col, Flex, Row, Space, Spin, Typography } from "antd";
import { Heart, PawPrint, ShieldCheck, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import style from '../style/HomePage.module.css';
import { HomePageResponse } from "../../admin/types/response-types";

interface Props {
    statistics?: HomePageResponse;
    loading: boolean;
}

export const HomePageStatistics = ({ statistics, loading }: Props) => {
    const { Text } = Typography;
    const { t } = useTranslation('homePage');

    return (
        <Spin spinning={loading} size="large" tip={t("statistics.loading")}>
            <Card bordered={false} className={style.stats}>
                <Row gutter={[24, 24]}>
                    <Col xs={24} sm={12} lg={6}>
                        <Flex align="center" gap={14}>
                            <PawPrint size={30} />
                            <Space direction="vertical" size={0}>
                                <strong>{statistics?.countActiveUsers}</strong>
                                <Text type="secondary">{t("statistics.activeUsers")}</Text>
                            </Space>
                        </Flex>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Flex align="center" gap={14}>
                            <Heart size={30} />
                            <Space direction="vertical" size={0}>
                                <strong>{statistics?.countSuccessfullAds}</strong>
                                <Text type="secondary">{t("statistics.successAds")}</Text>
                            </Space>
                        </Flex>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Flex align="center" gap={14}>
                            <ShieldCheck size={30} />
                            <Space direction="vertical" size={0}>
                                <strong>100%</strong>
                                <Text type="secondary">{t("statistics.safeCommunity")}</Text>
                            </Space>
                        </Flex>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Flex align="center" gap={14}>
                            <Star size={30} />
                            <Space direction="vertical" size={0}>
                                <strong>{statistics?.averageReview}/5</strong>
                                <Text type="secondary">{t("statistics.rating")}</Text>
                            </Space>
                        </Flex>
                    </Col>
                </Row>
            </Card>
        </Spin>
    )
}