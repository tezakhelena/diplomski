import { Space } from "antd"
import { PetAdCard } from "../../pet-ads/components/list-of-ads/PetAdCard"
import { UserCard } from "../../../reusable/UserCard"
import { PetAdCardData } from "../../pet-ads/types/view-types"
import { useTranslation } from "react-i18next";

interface Props {
    pet: PetAdCardData;
    userId?: number;
    adOwnerId?: number;
}

export const AdoptionSideDetails = ({pet, userId, adOwnerId}: Props) => {
    const { t } = useTranslation('adoption');

    return (
        <Space direction="vertical" size={16} className="app-full">
            {pet && <PetAdCard pet={pet} />}
            <UserCard userId={userId} title={t('adoption.sideDetails.applicant')} navigateTo="/zahtjevi/profil" />
            <UserCard userId={adOwnerId} title={t('adoption.sideDetails.adOwner')} navigateTo="/zahtjevi/profil" />
        </Space>
    )
}