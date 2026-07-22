import { Avatar, Button, Card, Col, Flex, Row, Space, Typography } from "antd";
import { ArrowRight, PawPrint } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getImage } from "../../../utils/urlUtils";
import { HomePageResponse } from "../../admin/types/response-types";
import style from '../style/HomePage.module.css';

interface Props {
    statistics?: HomePageResponse;
}

export const BusinessUsers = ({ statistics }: Props) => {
    const { Title, Text } = Typography;
    const navigate = useNavigate();
    const { t } = useTranslation('homePage');

    return (
        <Card bordered={false} className={style.panelCard}>
            <Flex justify="space-between" align="center" className={style.panelHeader}>
                <Title level={4}>{t("businessUsers.title")}</Title>
                <Button type="link" onClick={() => navigate("/organizacije")}>
                    <Space size={4}>
                        {t("businessUsers.viewAll")}
                        <ArrowRight size={15} />
                    </Space>
                </Button>
            </Flex>

            <Row gutter={[14, 14]}>
                {statistics?.businessUsers?.map((partner) => (
                    <Col xs={12} key={partner.subjectId}>
                        <Card bordered={false} className={style.partnerCard}>
                            <Space>
                                <Avatar
                                    size={42}
                                    src={getImage(partner.profilePictureUrl)}
                                    className={style.partnerAvatar}
                                    icon={<PawPrint size={20} />}
                                />
                                <Space direction="vertical">
                                    <Text strong>{partner.subject}</Text>
                                    <Text type="secondary">{partner.businessUserType}</Text>
                                </Space>
                            </Space>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Card>
    )
}