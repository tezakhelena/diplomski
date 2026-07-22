import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import { ValidationRules } from "../../../../utils/validationRules";

export const LoginFormFields = () => {
    const { t } = useTranslation('authentication');

    return (
        <>
            <Form.Item
                name="username"
                label={t("login.fields.username")}
                rules={[
                    ValidationRules.required(t("login.fields.username")),
                    ValidationRules.minLength(3, t("login.fields.username")),
                    ValidationRules.noSpecialChars(t("login.fields.username"))
                ]}
            >
                <Input size="large" placeholder={t("login.fields.usernamePlaceholder")} />
            </Form.Item>

            <Form.Item
                name="password"
                label={t("login.fields.password")}
                rules={[
                    ValidationRules.required(t("login.fields.password")),
                    ValidationRules.minLength(4, t("login.fields.password")),
                ]}
            >
                <Input.Password size="large" placeholder={t("login.fields.passwordPlaceholder")} />
            </Form.Item>
        </>
    );
};