import { Button, Space, Tag } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { AdoptionProcessStatus } from "../../../enums/processEnums";
import { RootState } from "../../../redux/store";
import { getTagColorByStatusId } from "../../../utils/uiUtils/styling";
import { AdoptionModal } from "./AdoptionModal";

interface Props {
    adoptionId: number;
    currentStatusId: number;
    podnositeljId: number;
    oglasivacId: number;
    refetch?: () => void;
}

export const AdoptionActions = ({ adoptionId, currentStatusId, podnositeljId, oglasivacId, refetch }: Props) => {
    const { t } = useTranslation('adoption');
    const { userId } = useSelector((state: RootState) => state.auth);
    const [modal, setModal] = useState({ visible: false, statusId: 0 });

    const isOwner = userId === oglasivacId;
    const isApplicant = userId === podnositeljId;

    const ACTIONS: Record<number, { id: number; label: string; color: "primary" | "danger" }[]> = {
        [AdoptionProcessStatus.ZahtjevZaprimljen]: [
            { id: AdoptionProcessStatus.ZahtjevOdobren, label: t('adoption.actions.approve'), color: "primary" },
            { id: AdoptionProcessStatus.ZahtjevOdbijen, label: t('adoption.actions.reject'), color: "danger" }
        ],
        [AdoptionProcessStatus.URazmatranju]: [
            { id: AdoptionProcessStatus.ZahtjevOdobren, label: t('adoption.actions.approve'), color: "primary" },
            { id: AdoptionProcessStatus.ZahtjevOdbijen, label: t('adoption.actions.reject'), color: "danger" }
        ],
        [AdoptionProcessStatus.ZahtjevOdobren]: [
            { id: AdoptionProcessStatus.RezultatProcjeneUTijeku, label: t('adoption.actions.assessmentDone'), color: "primary" }
        ],
        [AdoptionProcessStatus.RezultatProcjeneUTijeku]: [
            { id: AdoptionProcessStatus.UdomljavanjeOdobreno, label: t('adoption.actions.approveAdoption'), color: "primary" },
            { id: AdoptionProcessStatus.UdomljavanjeOdbijeno, label: t('adoption.actions.reject'), color: "danger" }
        ],
        [AdoptionProcessStatus.UdomljavanjeOdobreno]: [
            { id: AdoptionProcessStatus.PotpisivanjeUgovora, label: t('adoption.actions.signContract'), color: "primary" }
        ],
        [AdoptionProcessStatus.PotpisivanjeUgovora]: [
            { id: AdoptionProcessStatus.ProcesZavrsen, label: t('adoption.actions.finishProcess'), color: "primary" }
        ]
    };

    return (
        <Space wrap>
            {isOwner && ACTIONS[currentStatusId]?.map(a => (
                <Button key={a.id} type={a.color === "primary" ? "primary" : "default"} danger={a.color === "danger"} onClick={() => setModal({ visible: true, statusId: a.id })}>
                    {a.label}
                </Button>
            ))}
            {isApplicant && [
                AdoptionProcessStatus.ZahtjevZaprimljen,
                AdoptionProcessStatus.URazmatranju,
                AdoptionProcessStatus.ZahtjevOdobren
            ].includes(currentStatusId) && (
                    <Button danger onClick={() => setModal({ visible: true, statusId: AdoptionProcessStatus.ZahtjevOtkazan })}>{t('adoption.actions.cancelRequest')}</Button>
                )}
            {currentStatusId === AdoptionProcessStatus.ProcesZavrsen && <Tag bordered={false} color={getTagColorByStatusId(currentStatusId)}>{t('adoption.actions.adopted')}</Tag>}

            {modal.visible && <AdoptionModal visible={modal.visible} handleModal={(v: any) => setModal({ ...modal, visible: v })} adoptionId={adoptionId} refetch={refetch} statusId={modal.statusId} />}
        </Space>
    );
};