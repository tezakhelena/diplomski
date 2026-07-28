import { Button, Card, Space, Tooltip, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import {
    CheckCircle,
    Edit2,
    Flag,
    HandHeart,
    LockKeyhole,
    MessageCircle,
    Pickaxe,
    ShieldAlert,
    Trash2
} from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { AdStatus } from "../../../../enums/processEnums";
import useKorisnik from "../../../../hooks/useKorisnik";
import { RootState } from "../../../../redux/store";
import { AppForm } from "../../../../reusable/AppForm";
import { AppModal } from "../../../../reusable/AppModal";
import { SectionTitle } from "../../../../reusable/two-column-page/SectionTitle";
import { usePetAdMutations } from "../../hooks/usePetAdMutations";
import style from "../../style/AdDetails.module.css";
import { PetAdDetailResponse } from "../../types/response-types";
import { ContactAdOwnerFormFields } from "../form-fields/ContactAdOwnerFormFields";
import { RazloziBlokiranjaOglasa } from "../form-fields/RazloziBlokiranjaOglasa";
import { ReportAdFormFields } from "../form-fields/ReportAdFormFields";
import { ReunitedFormFields } from "../form-fields/ReunitedFormFields";
import { usePetAdContactMutations } from "../../../pet-ad-contacts/hooks/usePetAdContactMutations";
import { getAdoptTooltip, getBlockTooltip, getContactTooltip, getDeleteTooltip, getEditTooltip, getReportTooltip, getReunitedTooltip, isAdoptDisabled, isBlockDisabled, isContactDisabled, isDeleteDisabled, isEditDisabled, isReportDisabled } from "../../../../utils/adActionsHelper";

type StatusModalType = "report" | "block" | "reunited" | "contact";
type ModalType = StatusModalType | "delete";

interface ModalConfig {
    title: string;
    description: string;
    icon: ReactNode;
    statusId?: number;
    confirmText: string;
    content: ReactNode;
}

interface Props {
    sameUserId: boolean;
    userReported?: boolean;
    petAdId: number;
    refetch: () => void | Promise<unknown>;
    petAd: PetAdDetailResponse;
}

interface ActionButtonContentProps {
    title: string;
    description: string;
}

const ActionButtonContent = ({ title, description }: ActionButtonContentProps) => (
    <Space direction="vertical" size={0} align="start">
        <Typography.Text strong>{title}</Typography.Text>
        <Typography.Text type="secondary">{description}</Typography.Text>
    </Space>
);

export const AdDetailsExtraButtons = ({
    sameUserId,
    userReported = false,
    petAdId,
    petAd,
    refetch,
}: Props) => {
    const { t } = useTranslation("petAd");
    const [activeModal, setActiveModal] = useState<ModalType | null>(null);
    const [form] = useForm();
    const navigate = useNavigate();
    const { isAuthenticated, userId } = useSelector((state: RootState) => state.auth);
    const { isAdmin } = useKorisnik();

    const closeModal = () => {
        form.resetFields();
        setActiveModal(null);
    };

    const { changeAdStatus, deleteAd, isStatusChangingBoolean, isDeleting } = usePetAdMutations({
        onSuccess: closeModal,
        navigate,
    });

    const { sendContactMessage } = usePetAdContactMutations({
        onSendSuccess: closeModal,
    });

    const modalConfigs: Record<StatusModalType, ModalConfig> = {
        report: {
            title: t("details.actions.modals.report.title"),
            description: t("details.actions.modals.report.description"),
            icon: <Flag size={24} />,
            statusId: AdStatus.UProvjeri,
            confirmText: t("details.actions.modals.report.confirmButton"),
            content: <ReportAdFormFields />,
        },
        block: {
            title: t("details.actions.modals.block.title"),
            description: t("details.actions.modals.block.description"),
            icon: <ShieldAlert size={24} />,
            statusId: AdStatus.Blokiran,
            confirmText: t("details.actions.modals.block.confirmButton"),
            content: <RazloziBlokiranjaOglasa />,
        },
        reunited: {
            title: t("details.actions.modals.reunited.title"),
            description: t("details.actions.modals.reunited.description"),
            icon: <CheckCircle size={24} />,
            statusId: AdStatus.UspjesnoRjeseno,
            confirmText: t("details.actions.modals.reunited.confirmButton"),
            content: <ReunitedFormFields />,
        },
        contact: {
            title: t("details.actions.modals.contact.title"),
            description: t("details.actions.modals.contact.description"),
            icon: <MessageCircle size={24} />,
            confirmText: t("details.actions.modals.contact.confirmButton"),
            content: <ContactAdOwnerFormFields />,
        },
    };

    const handleConfirm = async (values?: any) => {
        if (activeModal === "delete") {
            await deleteAd(petAdId);
            return;
        }

        if (activeModal === "contact") {
            await sendContactMessage({
                petAdId,
                senderId: userId,
                receiverId: petAd.userId,
                ...values
            });
            return;
        }

        if (!activeModal) return;

        await changeAdStatus({
            ...values,
            petAdId,
            statusId: modalConfigs[activeModal].statusId,
            userId: activeModal === "report" ? userId : petAd.userId,
        });

        if (activeModal === "report") await refetch();
    };

    const navigateToEdit = () => {
        navigate("/oglasi/uredi", {
            state: {
                petAd,
                petAdId: petAd.petAdId,
            },
        });
    };

    const navigateToAdoptionRequest = () => {
        navigate("/zahtjevi/posalji", {
            state: {
                petAdId,
                generiraniNaziv: petAd.generatedTitle,
                adOwnerId: petAd.userId,
            },
        });
    };

    const statusModal = activeModal && activeModal !== "delete" ? modalConfigs[activeModal] : null;

    return (
        <Card
            title={
                <SectionTitle icon={<Pickaxe size={20} />}>
                    {t("details.actions.sectionTitle")}
                </SectionTitle>
            }
        >
            <Space direction="vertical" size={12} className="app-full">
                {(sameUserId || isAdmin()) ? (
                    <>
                        <Tooltip title={getEditTooltip(t, petAd.statusId)}>
                            <Button
                                block
                                color="purple"
                                variant="outlined"
                                disabled={isEditDisabled(petAd.statusId)}
                                icon={<Edit2 size={20} />}
                                className={style.actionButton}
                                onClick={navigateToEdit}
                            >
                                <ActionButtonContent
                                    title={t("details.actions.buttons.edit.title")}
                                    description={t("details.actions.buttons.edit.description")}
                                />
                            </Button>
                        </Tooltip>

                        <Tooltip title={getReunitedTooltip(t, petAd.statusId)}>
                            <Button
                                block
                                color="purple"
                                variant="outlined"
                                disabled={isEditDisabled(petAd.statusId)}
                                icon={<CheckCircle size={20} />}
                                className={style.actionButton}
                                onClick={() => setActiveModal("reunited")}
                            >
                                <ActionButtonContent
                                    title={t("details.actions.buttons.reunited.title")}
                                    description={t("details.actions.buttons.reunited.description")}
                                />
                            </Button>
                        </Tooltip>
                        <Tooltip title={getDeleteTooltip(t, petAd.statusId)}>
                            <Button
                                block
                                danger
                                disabled={isDeleteDisabled(petAd.statusId)}
                                icon={<Trash2 size={20} />}
                                className={`${style.actionButton} ${style.dangerAction}`}
                                onClick={() => setActiveModal("delete")}
                            >
                                <ActionButtonContent
                                    title={t("details.actions.buttons.delete.title")}
                                    description={t("details.actions.buttons.delete.description")}
                                />
                            </Button>
                        </Tooltip>
                    </>
                ) : (
                    <> {!isAdmin() &&
                        <>
                            <Tooltip title={getAdoptTooltip(t, isAuthenticated, petAd.statusId)}>
                                <Button
                                    block
                                    disabled={isAdoptDisabled(isAuthenticated, petAd.statusId)}
                                    icon={<HandHeart size={20} />}
                                    className={style.actionButton}
                                    onClick={navigateToAdoptionRequest}
                                >
                                    <ActionButtonContent
                                        title={t("details.actions.buttons.adopt.title")}
                                        description={t("details.actions.buttons.adopt.description")}
                                    />
                                </Button>
                            </Tooltip>

                            <Tooltip title={getContactTooltip(t, isAuthenticated, petAd.statusId)}>
                                <Button
                                    block
                                    disabled={isContactDisabled(isAuthenticated, petAd.statusId)}
                                    icon={<MessageCircle size={20} />}
                                    className={style.actionButton}
                                    onClick={() => setActiveModal("contact")}
                                >
                                    <ActionButtonContent
                                        title={t("details.actions.buttons.contact.title")}
                                        description={t("details.actions.buttons.contact.description")}
                                    />
                                </Button>
                            </Tooltip>
                        </>
                    }

                        {(!userReported && !isAdmin()) && (
                            <Tooltip title={getReportTooltip(t, isAuthenticated, petAd.statusId)}>
                                <Button
                                    block
                                    danger
                                    disabled={isReportDisabled(isAuthenticated, petAd.statusId)}
                                    icon={<Flag size={20} />}
                                    className={`${style.actionButton} ${style.dangerAction}`}
                                    onClick={() => setActiveModal("report")}
                                >
                                    <ActionButtonContent
                                        title={t("details.actions.buttons.report.title")}
                                        description={t("details.actions.buttons.report.description")}
                                    />
                                </Button>
                            </Tooltip>
                        )}
                    </>
                )}

                {isAdmin() && (
                    <Tooltip title={getBlockTooltip(t, isAuthenticated, petAd.statusId)}>
                        <Button
                            block
                            danger
                            disabled={isBlockDisabled(isAuthenticated, petAd.statusId)}
                            icon={<LockKeyhole size={20} />}
                            className={`${style.actionButton} ${style.dangerAction}`}
                            onClick={() => setActiveModal("block")}
                        >
                            <ActionButtonContent
                                title={t("details.actions.buttons.block.title")}
                                description={t("details.actions.buttons.block.description")}
                            />
                        </Button>
                    </Tooltip>
                )}
            </Space>

            {statusModal && (
                <AppModal
                    open
                    title={statusModal.title}
                    description={statusModal.description}
                    icon={statusModal.icon}
                    confirmText={statusModal.confirmText}
                    loading={isStatusChangingBoolean}
                    onConfirm={() => form.submit()}
                    onCancel={closeModal}
                >
                    <AppForm form={form} onFinish={handleConfirm}>
                        {statusModal.content}
                    </AppForm>
                </AppModal>
            )}

            <AppModal
                open={activeModal === "delete"}
                title={t("details.actions.modals.delete.title")}
                description={t("details.actions.modals.delete.description")}
                icon={<Trash2 size={24} />}
                confirmText={t("details.actions.modals.delete.confirmButton")}
                cancelText={t("details.actions.modals.delete.cancelButton")}
                width={620}
                danger
                loading={isDeleting}
                onConfirm={() => handleConfirm()}
                onCancel={closeModal}
            />
        </Card>
    );
};