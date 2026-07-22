import { FormInstance } from "antd";
import { useForm } from "antd/es/form/Form";
import { useUserMutations } from "../../hooks/useUserMutations";
import { UserDetailsResponse } from "../../types/response-types";
import { NotifikacijeSettings } from "./NotifikacijeSettings";
import { UserAccountSettings } from "./UserAccountSettings";
import { UserForm } from "./UserForm";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AppModal } from "../../../../reusable/AppModal";
import { Save } from "lucide-react";

interface Props {
    korisnik: UserDetailsResponse;
    userId: number;
    selectedOption: string;
}

export const UserAccount = ({ korisnik, userId, selectedOption }: Props) => {
    const { t } = useTranslation("users");
    const [form] = useForm();
    const { updateProfile, updatePreferencePending } = useUserMutations();
    const auth = useSelector((state: RootState) => state.auth);
    const disableImageChange = auth.userId !== userId;
    const [visibleModal, setVisibleModal] = useState(false);

    const handleConfirmSave = async () => {
        const formData = form.getFieldsValue();
        const { image, ...rest } = formData;
        const updateProfileRequest = JSON.stringify({ ...rest, userId });
        const data = new FormData();
        data.append("updateProfileRequest", updateProfileRequest);
        if (image?.length > 0 && image[0].originFileObj) data.append("image", image[0].originFileObj);
        await updateProfile(data);
        setVisibleModal(false);
    };

    const onFinish = () => {
        setVisibleModal(true);
    };

    switch (selectedOption) {
        case "security": return <UserAccountSettings initialValues={korisnik} />;
        case "notifications": return <NotifikacijeSettings userId={korisnik.userId} />;
        default: return (
            <>
                <UserForm
                    form={form as FormInstance<any>}
                    onFinish={onFinish}
                    privateUser={korisnik?.privateUser}
                    initialValues={korisnik}
                    edit
                    visible
                    disableImageChange={disableImageChange}
                />
                <AppModal
                    open={visibleModal}
                    title={t("account.profileSaveModal.title")}
                    description={t("account.profileSaveModal.description")}
                    icon={<Save size={24} />}
                    onCancel={() => setVisibleModal(false)}
                    confirmText={t("account.profileSaveModal.confirmButton")}
                    cancelText={t("account.profileSaveModal.cancelButton")}
                    loading={updatePreferencePending}
                    onConfirm={handleConfirmSave}
                />
            </>
        );
    }
};