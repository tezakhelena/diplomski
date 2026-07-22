import { Form, FormInstance, Input } from "antd"
import { useTranslation } from "react-i18next";
import { ValidationRules } from "../../../../utils/validationRules";

interface Props {
    form: FormInstance;
}

export const ChangePasswordFormFields = ({ form }: Props) => {
    const { t } = useTranslation("users");

    return (
        <>
            <Form.Item
                name="old"
                label={t("forms.changePassword.oldPassword.label")}
                required={false}
                rules={[ValidationRules.required(t("forms.changePassword.oldPassword.validationLabel"))]}
            >
                <Input.Password size="large" placeholder={t("forms.changePassword.oldPassword.placeholder")} />
            </Form.Item>

            <Form.Item
                name="password"
                label={t("forms.changePassword.newPassword.label")}
                required={false}
                rules={[
                    ValidationRules.required(t("forms.changePassword.newPassword.validationLabel")),
                    ValidationRules.passwordStrength(),
                ]}
            >
                <Input.Password size="large" placeholder={t("forms.changePassword.newPassword.placeholder")} />
            </Form.Item>

            <Form.Item
                name="potvrda"
                label={t("forms.changePassword.confirmPassword.label")}
                required={false}
                rules={[
                    ValidationRules.required(t("forms.changePassword.confirmPassword.validationLabel")),
                    ValidationRules.confirmPassword(form.getFieldValue),
                ]}
            >
                <Input.Password size="large" placeholder={t("forms.changePassword.confirmPassword.placeholder")} />
            </Form.Item>
        </>
    )
}