import { Card, Space, Steps } from "antd";
import { Camera, MapPin, PawPrint } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FirstStep } from "./FirstStep";
import { SecondStep } from "./SecondStep";
import { ThirdStep } from "./ThirdStep";

interface Props {
    fileList: File[];
    onFileUpload: (files: File[]) => void;
    onSubmit: () => void;
    isLoading: boolean;
}

export const NewAdSteps = ({
    fileList,
    onFileUpload,
    onSubmit,
    isLoading
}: Props) => {
    const { t } = useTranslation("petAd");
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        {
            title: t("newAd.steps.speciesAndCategory"),
            icon: <PawPrint size={22} />,
            content: <FirstStep nextStep={() => setCurrentStep(1)} />,
        },
        {
            title: t("newAd.steps.locationAndBasicData"),
            icon: <MapPin size={22} />,
            content: (
                <SecondStep
                    onNext={() => setCurrentStep(2)}
                    prevStep={() => setCurrentStep(0)}
                />
            ),
        },
        {
            title: t("newAd.steps.imagesAndDescription"),
            icon: <Camera size={22} />,
            content: (
                <ThirdStep
                    fileList={fileList}
                    onFileUpload={onFileUpload}
                    onSubmit={onSubmit}
                    prevStep={() => setCurrentStep(1)}
                    isLoading={isLoading}
                />
            ),
        },
    ];

    return (
        <Space direction="vertical" size={24} className="app-full">
            <Card>
                <Steps
                    current={currentStep}
                    labelPlacement="vertical"
                    responsive
                    items={steps.map(({ title, icon }) => ({ title, icon }))}
                />
            </Card>

            {steps[currentStep]?.content}
        </Space>
    );
};