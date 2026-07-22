import { Checkbox, Form, FormInstance, Input } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ValidationRules } from "../../../../utils/validationRules";

export const RegisterFormFields = ({ form }: { form: FormInstance<any> }) => {
    const { t } = useTranslation('authentication');

    return (
        <>
            <Form.Item
                label={t("registration.fields.username")}
                name="username"
                rules={[
                    ValidationRules.required(t("registration.fields.username")),
                    ValidationRules.minLength(3, t("registration.fields.username")),
                    ValidationRules.maxLength(50, t("registration.fields.username")),
                    ValidationRules.noSpecialChars(t("registration.fields.username"))
                ]}
            >
                <Input size="large" placeholder={t("registration.fields.usernamePlaceholder")} />
            </Form.Item>

            <Form.Item
                label={t("registration.fields.email")}
                name="email"
                rules={[
                    ValidationRules.required(t("registration.fields.email")),
                    ValidationRules.email()
                ]}
            >
                <Input size="large" placeholder={t("registration.fields.emailPlaceholder")} />
            </Form.Item>

            <Form.Item
                label={t("registration.fields.password")}
                name="password"
                rules={[
                    ValidationRules.required(t("registration.fields.password")),
                    ValidationRules.passwordStrength()
                ]}
            >
                <Input.Password size="large" placeholder={t("registration.fields.passwordPlaceholder")} />
            </Form.Item>

            <Form.Item
                label={t("registration.fields.confirmPassword")}
                name="confirmPassword"
                dependencies={['password']}
                rules={[
                    ValidationRules.required(t("registration.fields.confirmPassword")),
                    ValidationRules.confirmPassword(form.getFieldValue)
                ]}
            >
                <Input.Password size="large" placeholder={t("registration.fields.confirmPasswordPlaceholder")} />
            </Form.Item>

            <Form.Item
                name="potvrda"
                valuePropName="checked"
                rules={[ValidationRules.checkBoxValidator()]}
            >
                <Checkbox>
                    {t("registration.fields.terms")} 
                    <Link to="/uvjeti">{t("registration.fields.termsLink")}</Link>
                </Checkbox>
            </Form.Item>
        </>
    );
};