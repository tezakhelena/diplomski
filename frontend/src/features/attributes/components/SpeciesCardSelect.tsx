import { Button, Card, Col, Flex, Row, Typography } from "antd";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSpecies } from "../hooks/useAttributes";
import { petTypeIconsHomePage } from "../../../utils/uiUtils/icons";

export const SpeciesCardSelect = () => {
    const navigate = useNavigate();
    const { data: species = [] } = useSpecies();

    const handleSpeciesSelect = (speciesId: number) => {
        navigate("/oglasi", { state: { speciesId } });
    };

    return (
        <Row gutter={[18, 18]}>
            {species.map((item) => (
                <Col xs={24} sm={12} md={6} key={item.code}>
                    <Card
                        bordered={false}
                        hoverable
                        onClick={() => handleSpeciesSelect(item.code)}
                    >
                        <Flex align="center" gap={16}>
                            <Flex
                                align="center"
                                justify="center"
                                style={{
                                    width: 56,
                                    height: 56,
                                    borderRadius: 18,
                                    backgroundColor: "#f0edff",
                                    color: "#5b4dff",
                                    fontSize: 24,
                                    flexShrink: 0,
                                }}
                            >
                                {petTypeIconsHomePage[item.code]}
                            </Flex>

                            <Flex flex={1} align="center" justify="space-between">
                                <Flex vertical justify="center">
                                    <Typography.Text strong style={{ fontSize: 16, color: "#172033" }}>
                                        {item.value}
                                    </Typography.Text>
                                    <Typography.Text type="secondary" style={{ fontSize: 13 }}>
                                        {item.count ?? 0} oglasa
                                    </Typography.Text>
                                </Flex>

                                <Button
                                    type="text"
                                    shape="circle"
                                    icon={<ArrowRight size={18} />}
                                    style={{ backgroundColor: "#f9f8ff", color: "#5b4dff" }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleSpeciesSelect(item.code);
                                    }}
                                />
                            </Flex>
                        </Flex>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};