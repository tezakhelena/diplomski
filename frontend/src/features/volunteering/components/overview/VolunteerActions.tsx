import { Button, Space, Tag, Typography } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "../../../../redux/store";
import { VolunteerModal } from "./VolunteerModal";
import { VolunteerStatus } from "../../../../enums/processEnums";

interface Props {
    volontiranjeId?: number;
    currentStatusId: number;
    poduzeceId: number;
    refetch?: () => void;
}

export const VolunteerActions = ({ poduzeceId, currentStatusId, volontiranjeId, refetch }: Props) => {
    const { t } = useTranslation("volunteer");
    const auth = useSelector((state: RootState) => state.auth);
    const [visible, setVisible] = useState(false);
    const [statusId, setStatusId] = useState<number | null>(null);

    const handleModal = (value: boolean) => {
        setVisible(value);
    }

    const changeAdoptionStatus = (statusId: number) => {
        handleModal(true);
        setStatusId(statusId);
    }
    return (
        <>
            {(auth.userId === poduzeceId) &&
                <>
                    {currentStatusId === VolunteerStatus.PrijavaPoslana && (
                        <Space>
                            <Button onClick={() => changeAdoptionStatus(VolunteerStatus.PrijavaPrihvacena)} color="primary" variant="outlined">{t("actions.approveButton")}</Button>
                            <Button onClick={() => changeAdoptionStatus(VolunteerStatus.PrijavaOdbijena)} color="danger" variant="outlined">{t("actions.rejectButton")}</Button>
                        </Space>
                    )}

                    {currentStatusId === VolunteerStatus.PrijavaPrihvacena && (
                        <Typography.Text>{t("actions.acceptedMessage")}</Typography.Text>
                    )}

                    {currentStatusId === VolunteerStatus.PrijavaOdbijena && (
                        <Tag color="green" bordered>{t("actions.rejectedTag")}</Tag>
                    )}

                </>

            }

            <VolunteerModal
                visible={visible}
                handleModal={handleModal}
                volontiranjeId={volontiranjeId}
                refetch={refetch}
                statusId={statusId!}
            />
        </>
    )
}