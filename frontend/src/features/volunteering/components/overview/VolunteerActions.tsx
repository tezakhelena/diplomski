import { Alert, Button, Space, Tooltip } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { VolunteerStatus } from "../../../../enums/processEnums";
import { RootState } from "../../../../redux/store";
import { VolunteerModal } from "./VolunteerModal";
import { AccountStatus } from "../../../../enums/userEnums";

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
                        <Tooltip title={t('actions.userBlocked')}>
                            <Space>
                                <Button disabled={auth.statusId == AccountStatus.Obustavljen} onClick={() => changeAdoptionStatus(VolunteerStatus.PrijavaPrihvacena)} color="primary" variant="outlined">{t("actions.approveButton")}</Button>
                                <Button disabled={auth.statusId == AccountStatus.Obustavljen} onClick={() => changeAdoptionStatus(VolunteerStatus.PrijavaOdbijena)} color="danger" variant="outlined">{t("actions.rejectButton")}</Button>
                            </Space>
                        </Tooltip>
                    )}

                    {currentStatusId === VolunteerStatus.PrijavaPrihvacena && (
                        <Alert type="success" description={t("actions.acceptedMessage")} />
                    )}

                    {currentStatusId === VolunteerStatus.PrijavaOdbijena && (
                        <Alert type="error" description={t("actions.rejectedTag")} />
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