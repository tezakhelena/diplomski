import { Avatar, Card, Col, Flex, Rate, Row, Space, Spin, Typography } from "antd";
import { Heart, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useHomePageReviews } from "../hooks/useHomePage";
import style from '../style/HomePage.module.css';
import { getImage } from "../../../utils/urlUtils";

export const Reviews = () => {
    const { reviews, isLoadingReviews } = useHomePageReviews();
    const { t } = useTranslation('homePage');

    return (
        <Spin spinning={isLoadingReviews} size="large" tip={t("reviews.loading")}>
            <Card bordered={false} className={style.reviewsSection}>
                <Flex justify="space-between" align="center" className={style.reviewsHeader}>
                    <Space direction="vertical" size={4}>
                        <Space size={8}>
                            <Heart size={22} className={style.reviewsTitleIcon} />
                            <Typography.Title level={3}>{t("reviews.title")}</Typography.Title>
                        </Space>
                        <Typography.Text type="secondary">{t("reviews.description")}</Typography.Text>
                    </Space>
                </Flex>

                <Row gutter={[24, 24]}>
                    {reviews.slice(0, 3).map((review) => (
                        <Col xs={24} md={8} key={review.reviewId}>
                            <Card bordered={false} className={style.reviewCard}>
                                <Space direction="vertical" size={18} className="app-full">
                                    <Rate disabled value={review.rate} character={<Star size={17} />} className={style.reviewRate} />
                                    <Typography.Paragraph className={style.reviewText} ellipsis={{ rows: 3 }}>
                                        “{review.comment}”
                                    </Typography.Paragraph>
                                    <Flex justify="space-between" align="center">
                                        <Space size={12}>
                                            <Avatar size={48} src={getImage(review.user.profilePictureUrl)} />
                                            <Space direction="vertical" size={0}>
                                                <Typography.Text strong>{review.user.username}</Typography.Text>
                                                <Typography.Text type="secondary">{t("reviews.userRole")}</Typography.Text>
                                            </Space>
                                        </Space>
                                    </Flex>
                                </Space>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Card>
        </Spin>
    );
};