import { Avatar, Button, Card, Flex, Space, Tag, Typography } from "antd";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLatestPetAds } from "../../pet-ads/hooks/usePetAdQueries";
import { PetAdResponse } from "../../pet-ads/types/response-types";
import style from '../style/HomePage.module.css';
import { getImage } from "../../../utils/urlUtils";
import { AdStatus } from "../../../enums/processEnums";

export const LastPetAds = () => {
    const { Title, Text } = Typography;
    const navigate = useNavigate();
    const { t } = useTranslation('homePage');
    const { latestAds } = useLatestPetAds();

    return (
        <Card bordered={false} className={style.panelCard}>
            <Flex justify="space-between" align="center" className={style.panelHeader}>
                <Title level={4}>{t("latestAds.title")}</Title>
                <Button type="link" onClick={() => navigate("/oglasi")}>
                    <Space size={4}>
                        {t("latestAds.viewAll")}
                        <ArrowRight size={15} />
                    </Space>
                </Button>
            </Flex>

            <Space direction="vertical" size={14} className={style.latestList}>
                {latestAds?.map((pet: PetAdResponse) => (
                    <Flex key={pet.petAdId} align="center" gap={12} className={style.petListItem}>
                        <Avatar shape="square" size={56} src={getImage(pet.primaryImage)} className={style.petAvatar} />
                        <Space direction="vertical" size={2} className={style.petInfo}>
                            <Text strong>{pet.breed}</Text>
                            <Text type="secondary">{`${pet.city}, ${pet.county}`}</Text>
                            {pet.statusId === AdStatus.UspjesnoRjeseno && <Text type="success">{pet.status}</Text>}
                        </Space>
                        <Tag color="purple" bordered={false}>{pet.category}</Tag>
                    </Flex>
                ))}
            </Space>
        </Card>
    )
}