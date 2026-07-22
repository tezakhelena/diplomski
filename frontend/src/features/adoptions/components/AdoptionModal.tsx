import { Form, Input } from "antd";
import { CheckCircle, XCircle } from "lucide-react";
import { AppForm } from "../../../reusable/AppForm";
import { AppModal } from "../../../reusable/AppModal";
import { getStatusMessage } from "../../../utils/helperFunctions";
import { AdoptionAddContractModal } from "../../contracts/components/AddContractToAdoptionModal";
import { useAdoptionMutations } from "../hooks/useAdoptionMutations";
import { AdoptionProcessStatus } from "../../../enums/processEnums";
import { useTranslation } from "react-i18next";

interface Props {
    visible: boolean;
    handleModal: (visible: boolean) => void;
    refetch?: () => void;
    adoptionId: number;
    statusId: number;
}

export const AdoptionModal = ({ visible, handleModal, refetch, adoptionId, statusId }: Props) => {
    const { t } = useTranslation('adoption');
    const [form] = Form.useForm();
    const { changeStatus, isStatusChanging } = useAdoptionMutations({ onSuccess: () => { refetch?.(); handleModal(false); } });

    if (statusId === AdoptionProcessStatus.PotpisivanjeUgovora) return <AdoptionAddContractModal visible={visible} handleModal={handleModal} adoptionId={adoptionId} refetch={refetch} statusId={statusId} changeAdoptionStatus={(s) => changeStatus({ statusId, adoptionId, signViaApp: s })} />;

    const isDanger = [
        AdoptionProcessStatus.ZahtjevOtkazan,
        AdoptionProcessStatus.ZahtjevOdbijen,
        AdoptionProcessStatus.UdomljavanjeOdbijeno
    ].includes(statusId);

    return (
        <AppModal
            open={visible}
            title={t('adoption.modal.title')}
            onCancel={() => handleModal(false)}
            onConfirm={() =>
                changeStatus({
                    statusId,
                    adoptionId,
                    reason: form.getFieldValue("razlog"),
                })
            }
            icon={
                isDanger
                    ? <XCircle color="red" />
                    : <CheckCircle color="green" />
            }
            danger={isDanger}
            loading={isStatusChanging}
            confirmDescription={getStatusMessage(statusId)}
        >
            {isDanger && (
                <AppForm form={form}>
                    <Form.Item name="razlog">
                        <Input.TextArea placeholder={t('adoption.modal.placeholder')} />
                    </Form.Item>
                </AppForm>
            )}
        </AppModal>
    );
};