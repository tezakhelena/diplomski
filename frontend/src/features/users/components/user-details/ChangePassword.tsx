import { useForm } from "antd/es/form/Form";
import { LockKeyhole } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AppForm } from "../../../../reusable/AppForm";
import { AppModal } from "../../../../reusable/AppModal";
import { useUserMutations } from "../../hooks/useUserMutations";
import { ChangePasswordFormFields } from "../form-fields/ChangePasswordFormFields";

interface Props {
    visible: boolean;
    handleModal: (value: boolean) => void;
    userId: number;
}

export const ChangePassword = ({ visible, handleModal, userId }: Props) => {
    const { t } = useTranslation("users");
    const [form] = useForm();
    const { changePassword, isUpdating } = useUserMutations();

    const onFinish = async () => {
        try {
            await form.validateFields();
            await changePassword({
                oldPassword: form.getFieldValue("old"),
                newPassword: form.getFieldValue("password"),
                userId: userId
            });

            form.resetFields();
            handleModal(false);
        } catch (error) {
        }
    };

    return (
        <AppModal
            open={visible}
            title={t("account.changePasswordModal.title")}
            description={t("account.changePasswordModal.description")}
            icon={<LockKeyhole size={24} />}
            loading={isUpdating}
            confirmText={t("account.changePasswordModal.confirmButton")}
            onConfirm={onFinish}
            onCancel={() => handleModal(false)}
        >
            <AppForm form={form}>
                <ChangePasswordFormFields form={form} />
            </AppForm>
        </AppModal>
    );
};