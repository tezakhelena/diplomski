import { Button, Form, notification, Space, Typography, Upload } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import { FilePen, FileUp } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { AppForm } from "../../../reusable/AppForm";
import { AppModal } from "../../../reusable/AppModal";
import { RootState } from "../../../redux/store";
import { useContractMutations } from "../hooks/useContractMutations";

interface Props {
    visible: boolean;
    handleModal: (value: boolean) => void;
    refetch?: () => void | Promise<unknown>;
    adoptionId?: number;
    statusId: number;
    changeAdoptionStatus: (potpisivanjePutemApp?: boolean) => void;
}

export const AdoptionAddContractModal = ({
    visible,
    handleModal,
    adoptionId,
    refetch,
    changeAdoptionStatus,
}: Props) => {
    const { t } = useTranslation('contracts');
    const [form] = Form.useForm();
    const [uploadVisible, setUploadVisible] = useState(false);
    const [file, setFile] = useState<RcFile | null>(null);
    const userId = useSelector((state: RootState) => state.auth.userId);

    const closeModal = () => {
        setUploadVisible(false);
        setFile(null);
        form.resetFields();
        handleModal(false);
    };

    const { addContract, isAddingContract } = useContractMutations({
        onAddSuccess: async () => {
            await changeAdoptionStatus(true);
            await refetch?.();
            closeModal();
        },
    });

    const handleLiveSigning = async () => {
        closeModal();
        await changeAdoptionStatus(false);
    };

    const handleAppSigning = async () => {
        if (!file) {
            notification.error({ message: t("modal.title"), description: t("modal.errorFile") });
            return;
        }
        if (!userId || !adoptionId) {
            notification.error({ message: t("modal.title"), description: t("modal.errorData") });
            return;
        }

        const formData = new FormData();
        formData.append("userId", String(userId));
        formData.append("adoptionId", String(adoptionId));
        formData.append("document", file);

        await addContract(formData);
    };

    const uploadProps: UploadProps = {
        beforeUpload: (selectedFile) => {
            const isPdf = selectedFile.type === "application/pdf";
            if (!isPdf) {
                notification.error({ message: t("modal.invalidFormat"), description: t("modal.invalidFormatDesc") });
                return Upload.LIST_IGNORE;
            }
            setFile(selectedFile as RcFile);
            return false;
        },
        onRemove: () => setFile(null),
        maxCount: 1,
        fileList: file ? [file] : [],
    };

    return (
        <AppModal
            open={visible}
            title={t("modal.title")}
            description={t("modal.description")}
            icon={<FilePen size={24} />}
            loading={isAddingContract}
            hideFooter={!uploadVisible}
            confirmText={t("modal.confirm")}
            onConfirm={() => form.submit()}
            onCancel={closeModal}
        >
            {!uploadVisible ? (
                <Space direction="vertical" size={14} className="app-full">
                    <Button block size="large" icon={<FileUp size={18} />} onClick={() => setUploadVisible(true)}>
                        {t("modal.addBtn")}
                    </Button>
                    <Button block size="large" onClick={handleLiveSigning}>
                        {t("modal.liveBtn")}
                    </Button>
                </Space>
            ) : (
                <AppForm form={form} onFinish={handleAppSigning}>
                    <Space direction="vertical" size={14} className="app-full">
                        <Form.Item>
                            <Upload {...uploadProps}>
                                <Button icon={<FileUp size={18} />}>{t("modal.uploadBtn")}</Button>
                            </Upload>
                        </Form.Item>
                        <Typography.Text type="secondary">
                            {t("modal.uploadHelp")}
                        </Typography.Text>
                    </Space>
                </AppForm>
            )}
        </AppModal>
    );
};