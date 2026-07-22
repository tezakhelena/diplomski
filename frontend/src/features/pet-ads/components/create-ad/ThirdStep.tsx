import { Button, Card, Col, Flex, Row, Space } from "antd";
import { ArrowLeft, SendHorizontal } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SectionTitle } from "../../../../reusable/two-column-page/SectionTitle";
import { NewAdPetDetails } from "./NewAdPetDetails";
import { NewAdUploadImages } from "./NewAdUploadImages";

interface Props {
    fileList: File[];
    onFileUpload: (files: File[]) => void;
    onSubmit: () => void;
    prevStep: () => void;
    isLoading: boolean;
}

export const ThirdStep = ({
    fileList,
    onFileUpload,
    onSubmit,
    prevStep,
    isLoading
}: Props) => {
    const { t } = useTranslation("petAd");

    return (
        <Card>
            <Space direction="vertical" size={28} className="app-full">
                <SectionTitle icon={<SendHorizontal size={20} />}>
                    {t("newAd.thirdStep.title")}
                </SectionTitle>

                <Row gutter={[32, 24]} align="stretch">
                    <Col xs={24} lg={12}>
                        <NewAdUploadImages
                            fileList={fileList}
                            onFileUpload={onFileUpload}
                        />
                    </Col>

                    <Col xs={24} lg={12}>
                        <NewAdPetDetails />
                    </Col>
                </Row>

                <Flex justify="space-between" gap={14} wrap>
                    <Button
                        size="large"
                        icon={<ArrowLeft size={18} />}
                        onClick={prevStep}
                        disabled={isLoading}
                    >
                        {t("newAd.thirdStep.backButton")}
                    </Button>

                    <Button
                        type="primary"
                        size="large"
                        icon={<SendHorizontal size={18} />}
                        onClick={onSubmit}
                        loading={isLoading}
                    >
                        {t("newAd.thirdStep.publishButton")}
                    </Button>
                </Flex>
            </Space>
        </Card>
    );
};