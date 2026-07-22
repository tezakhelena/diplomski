import { Button, Card, Col, Flex, Form, Row, Space } from "antd";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SectionTitle } from "../../../../reusable/two-column-page/SectionTitle";
import { NewAdForm } from "./NewAdForm";
import { NewAdLocation } from "./NewAdLocation";

interface Props {
    onNext: () => void;
    prevStep: () => void;
}

export const SecondStep = ({ onNext, prevStep }: Props) => {
    const { t } = useTranslation("petAd");
    const [form] = Form.useForm();

    const handleNext = async () => {
        await form.validateFields();
        onNext();
    };

    return (
        <Card>
            <Space direction="vertical" size={28} className="app-full">
                <SectionTitle icon={<MapPin size={20} />}>
                    {t("newAd.secondStep.title")}
                </SectionTitle>

                <Row gutter={[32, 24]} align="stretch">
                    <Col xs={24} lg={10}>
                        <NewAdLocation formNew={form} />
                    </Col>

                    <Col xs={24} lg={14}>
                        <NewAdForm formNew={form} />
                    </Col>
                </Row>

                <Flex justify="space-between" gap={14} wrap>
                    <Button
                        size="large"
                        icon={<ArrowLeft size={18} />}
                        onClick={prevStep}
                    >
                        {t("newAd.secondStep.backButton")}
                    </Button>

                    <Button
                        type="primary"
                        size="large"
                        icon={<ArrowRight size={18} />}
                        iconPosition="end"
                        onClick={handleNext}
                    >
                        {t("newAd.secondStep.nextButton")}
                    </Button>
                </Flex>
            </Space>
        </Card>
    );
};