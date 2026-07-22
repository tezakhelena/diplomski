import { CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AppModal } from "../../../../reusable/AppModal";
import { getStatusMessage } from "../../../../utils/helperFunctions";
import { useVolunteeringMutations } from "../../hooks/useVolunteeringMutations";

interface Props {
    visible: boolean;
    handleModal: (value: boolean) => void;
    refetch?: () => void | Promise<unknown>;
    volontiranjeId?: number;
    statusId: number;
}

export const VolunteerModal = ({
    visible,
    handleModal,
    refetch,
    volontiranjeId,
    statusId,
}: Props) => {
    const { t } = useTranslation("volunteer");
    const { changeApplicationStatus, isChangingStatus } = useVolunteeringMutations();

    const closeModal = () => handleModal(false);

    const changeVolunteerStatus = async () => {
        if (!volontiranjeId) {
            return;
        }

        await changeApplicationStatus(volontiranjeId, statusId);
        await refetch?.();
        closeModal();
    };

    return (
        <AppModal
            open={visible}
            title={t("actions.modal.title")}
            description={t("actions.modal.description")}
            icon={<CheckCircle size={24} />}
            confirmText={t("actions.modal.confirmButton")}
            cancelText={t("actions.modal.cancelButton")}
            loading={isChangingStatus}
            onConfirm={changeVolunteerStatus}
            onCancel={closeModal}
            confirmTitle={t("actions.modal.confirmTitle")}
            confirmDescription={String(getStatusMessage(statusId))}
        />
    );
};