import { Button, Card, Col, Empty, Row } from "antd";
import { ArrowRight, PawPrint } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { SectionTitle } from "../../../../reusable/two-column-page/SectionTitle";
import { mapToPetAdCard } from "../../../../utils/helperFunctions";
import { PetAdResponse } from "../../types/response-types";
import { PetAdCard } from "../list-of-ads/PetAdCard";

interface Props {
    data: PetAdResponse[];
}

export const SimilarAdsSection = ({ data }: Props) => {
    const { t } = useTranslation("petAd");
    const navigate = useNavigate();

    return (
        <Card
            bordered={false}
            title={
                <SectionTitle icon={<PawPrint size={20} />}>
                    {t("details.similarAds.title")}
                </SectionTitle>
            }
            extra={
                <Button
                    type="link"
                    icon={<ArrowRight size={15} />}
                    iconPosition="end"
                    onClick={() => navigate("/oglasi")}
                >
                    {t("details.similarAds.viewAll")}
                </Button>
            }
        >
            {data.length === 0 ? (
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={t("details.similarAds.empty")}
                />
            ) : (
                <Row gutter={[18, 18]}>
                    {data.map((pet) => (
                        <Col xs={24} sm={12} lg={6} key={pet.petAdId}>
                            <PetAdCard pet={mapToPetAdCard(pet)} />
                        </Col>
                    ))}
                </Row>
            )}
        </Card>
    );
};