import { LoadingOutlined } from "@ant-design/icons";
import { Card, Flex, Steps } from "antd";
import { filterAndOrderStatuses } from "../../../utils/helperFunctions";
import { AdoptionRequestDetailResponse } from "../types/response-types";
import { AttributeResponse } from "../../attributes/types/response-types";
import { getAdoptionProcessIconByTypeId } from "../../../utils/uiUtils/icons";
import { useTranslation } from "react-i18next";

interface Props {
    detalji: AdoptionRequestDetailResponse;
    statusi: AttributeResponse[];
}

export const AdoptionProcessProgress = ({ detalji, statusi }: Props) => {
    const { t } = useTranslation('adoption');
    const steps = filterAndOrderStatuses(statusi);
    const currentIndex = steps.findIndex(s => Number(s.code) === detalji.statusId);
    const isLoadingOnNext = currentIndex !== -1 && currentIndex < steps.length - 1;

    const renderIcon = (typeId: number, isCurrent: boolean) => {
        if (isCurrent) return <LoadingOutlined style={{ fontSize: 24, color: "#5b4dff" }} />;

        return (
            <Flex
                align="center"
                justify="center"
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: "#f0edff",
                    color: "#5b4dff",
                }}
            >
                {getAdoptionProcessIconByTypeId(typeId)}
            </Flex>
        );
    };

    if (!steps.length) return null;

    return (
        <Card title={t('adoption.progress.title')}>
            <Steps
                current={currentIndex}
                labelPlacement="vertical"
                items={steps.map((s, i) => ({
                    title: s.value,
                    icon: (isLoadingOnNext && i === currentIndex + 1)
                        ? <LoadingOutlined style={{ fontSize: 24, color: "#5b4dff" }} />
                        : renderIcon(Number(s.code), false)
                }))}
            />
        </Card>
    );
};