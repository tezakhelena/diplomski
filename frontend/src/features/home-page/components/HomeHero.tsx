import { Button, Col, Flex, Image, Row, Space, Tag, Typography } from "antd";
import { Heart, PawPrint, Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import backgroundImage from "../../../assets/background1.jpg";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

export const HomeHero = () => {
    const navigate = useNavigate();
    const { t } = useTranslation('homePage');
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    const navigateTo = () => {
        if (isAuthenticated) {
            navigate("/oglasi/dodaj");
        } else {
            navigate("/authenticate");
        }
    }

    return (
        <Row gutter={[48, 32]} align="middle">
            <Col xs={24} lg={12}>
                <Space direction="vertical" size={24} style={{ width: "100%" }}>
                    <Tag bordered={false} icon={<Heart size={20} />} color="purple">
                        {t("hero.tag")}
                    </Tag>

                    <Typography.Title
                        level={1}
                        style={{ margin: 0, fontSize: "clamp(38px, 5vw, 58px)", lineHeight: 1.12, fontWeight: 850, color: "#0b1026" }}
                    >
                        {t("hero.title.main")}{" "}
                        <Typography.Text style={{ fontSize: "inherit", fontWeight: "inherit", color: "#6c5cff" }}>
                            {t("hero.title.highlight")}
                        </Typography.Text>
                    </Typography.Title>

                    <Typography.Paragraph type="secondary" style={{ margin: 0, maxWidth: 620, fontSize: 18, lineHeight: 1.8 }}>
                        {t("hero.description")}
                    </Typography.Paragraph>

                    <Space size={14} wrap>
                        <Button type="primary" size="large" icon={<Search size={18} />} onClick={() => navigate("/oglasi")}>
                            {t("hero.btnSearch")}
                        </Button>
                        <Button size="large" icon={<Plus size={18} />} onClick={() => navigateTo()}>
                            {t("hero.btnAdd")}
                        </Button>
                    </Space>
                </Space>
            </Col>

            <Col xs={24} lg={12}>
                <Flex align="center" justify="center" style={{ position: "relative" }}>
                    <Image src={backgroundImage} preview={false} alt="Ljubimac" width="100%" style={{ maxHeight: 440, objectFit: "cover", borderRadius: "45% 38% 42% 36%", boxShadow: "0 28px 80px rgba(31, 41, 55, 0.12)" }} />
                    <Flex align="center" justify="center" style={{ position: "absolute", top: 40, right: 18, width: 78, height: 78, borderRadius: "50%", background: "rgba(255, 255, 255, 0.8)", color: "#6c5cff", boxShadow: "0 14px 40px rgba(31, 41, 55, 0.12)" }}>
                        <PawPrint size={34} />
                    </Flex>
                </Flex>
            </Col>
        </Row>
    );
};