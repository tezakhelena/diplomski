import { FormInstance } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import useKorisnik from "../../../../hooks/useKorisnik";
import { RootState } from "../../../../redux/store";
import { AppForm } from "../../../../reusable/AppForm";
import { UserDetailsResponse } from "../../types/response-types";
import { UserFormFields } from "../form-fields/UserFormFields";
import { ImageUpload } from "./ImageUpload";

interface Props {
    form: FormInstance;
    onFinish: () => void;
    privateUser: boolean;
    initialValues?: UserDetailsResponse;
    visible?: boolean;
    edit?: boolean;
    handleSwitch?: (value: boolean) => void;
    loading?: boolean;
    disableImageChange?: boolean;
}

export const UserForm = ({
    form,
    onFinish,
    privateUser,
    initialValues,
    visible,
    edit,
    handleSwitch,
    loading = false,
    disableImageChange,
}: Props) => {
    const { t } = useTranslation("users");
    const korisnik = useKorisnik();
    const auth = useSelector((state: RootState) => state.auth);

    const disabled = initialValues ? (initialValues?.userId !== auth.userId) : false;
    return (
        <AppForm
            form={form}
            onFinish={onFinish}
            initialValues={initialValues}
            actionsType="submit"
            submitText={t("forms.user.saveButton")}
            submitButtonProps={{
                size: "large",
                loading,
            }}
        >
            <ImageUpload
                profilna={initialValues?.profilePictureUrl}
                disableImageChange={disableImageChange}
            />

            <UserFormFields
                privateUser={privateUser}
                edit={edit}
                visible={visible}
                isAdmin={korisnik.isAdmin()}
                handleSwitch={handleSwitch}
                disabled={disabled}
            />
        </AppForm>
    );
};