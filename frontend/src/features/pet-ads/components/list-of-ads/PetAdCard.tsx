import { Alert, Card, Flex, Image, Space, Tag, Typography } from "antd";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getAdStatusColor, getAdStatusLabel, getAdultAvatarConfig, getSexAvatarConfig } from "../../../../utils/helperFunctions";
import style from "../../style/PetAdCard.module.css";
import { PetAdCardData } from "../../types/view-types";
import { formatDate } from "../../../../utils/dateUtils";
import { getImage } from "../../../../utils/urlUtils";
import { getTagColorByStatusId } from "../../../../utils/uiUtils/styling";
import { AdStatus } from "../../../../enums/processEnums";

interface Props {
    pet: PetAdCardData;
}

export const PetAdCard = ({ pet }: Props) => {
    const { t } = useTranslation("petAd");
    const gender = getSexAvatarConfig(pet.gender).text;
    const maturity = getAdultAvatarConfig(pet.maturity).maturity;
    const infoTags = [gender, maturity].filter(Boolean);

    return (
        <Link to="/oglasi/detalji" state={{ petAdId: pet.petAdId }} className={style.cardLink}>
            <Card
                hoverable
                className={style.adCard}
                styles={{ body: { padding: 18 } }}
                cover={
                    <Flex className={style.imageWrapper}>
                        <Image
                            preview={false}
                            src={getImage(pet.primaryImage)}
                            alt={pet.breed || t("list.card.imageAlt")}
                            width="100%"
                            className={style.adImage}
                        />

                        <Tag bordered={false} color={getTagColorByStatusId(pet.categoryId)} className={`${style.statusBadge}`}>
                            {pet.category}
                        </Tag>
                    </Flex>
                }
            >
                <Space direction="vertical" size={12} className="app-full">
                    <Typography.Text strong className={style.petName}>{pet.breed || t("list.card.unknownBreed")}</Typography.Text>
                    <Typography.Text>{pet.generatedTitle || t("list.card.unknownBreed")}</Typography.Text>

                    <Flex justify="space-between" align="center" gap={8} wrap>
                        <Space size={5}>
                            <MapPin size={14} />
                            <Typography.Text type="secondary">{pet.county || t("list.card.locationUnavailable")}</Typography.Text>
                        </Space>

                        <Typography.Text type="secondary" className={style.timeAgo}>{formatDate(pet.createdAt)}</Typography.Text>
                    </Flex>

                    {
                        pet.statusId === AdStatus.UspjesnoRjeseno &&
                        <Alert message={getAdStatusLabel(pet.statusId)} type={getAdStatusColor(pet.statusId)} showIcon />
                    }



                    {infoTags.length > 0 && (
                        <Space wrap size={8}>
                            {infoTags.map((tag) => <Tag bordered={false} color="purple" key={tag}>{tag}</Tag>)}
                        </Space>
                    )}
                </Space>
            </Card>
        </Link>
    );
};