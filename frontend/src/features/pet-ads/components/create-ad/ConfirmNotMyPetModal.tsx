import { InfoCircleOutlined } from "@ant-design/icons";
import { Alert, Col, Row } from "antd";
import { ShieldAlert } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AppModal } from "../../../../reusable/AppModal";
import { mapToPetAdCard } from "../../../../utils/helperFunctions";
import { PetAdResponse } from "../../types/response-types";
import { PetAdCard } from "../list-of-ads/PetAdCard";

interface Props {
    visible: boolean;
    similarAds: PetAdResponse[];
    onProceed: () => void;
    onCancel: () => void;
    isLoading: boolean;
}

export const ConfirmNotMyPetModal = ({
    visible,
    similarAds,
    onProceed,
    onCancel,
    isLoading
}: Props) => {
    const { t } = useTranslation("petAd");

    return (
        <AppModal
            open={visible}
            title={t("newAd.similarAdsModal.title")}
            description={t("newAd.similarAdsModal.description")}
            icon={<ShieldAlert size={24} />}
            width={920}
            confirmText={t("newAd.similarAdsModal.confirmButton")}
            cancelText={t("newAd.similarAdsModal.cancelButton")}
            onConfirm={onProceed}
            onCancel={onCancel}
            loading={isLoading}
        >
            <Row gutter={[18, 18]}>
                {(similarAds ?? []).slice(0, 4).map((ad) => (
                    <Col xs={24} sm={12} lg={8} key={ad.petAdId}>
                        <PetAdCard pet={mapToPetAdCard(ad)} />
                    </Col>
                ))}
            </Row>

            <Alert
                message={t("newAd.similarAdsModal.info")}
                type="info"
                showIcon
                icon={<InfoCircleOutlined />}
            />
        </AppModal>
    );
};