import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import { ValidationRules } from "../../../../utils/validationRules";

export const ContactAdOwnerFormFields = () => {
    const { t } = useTranslation("petAd");

    return (
        <>
            <Form.Item
                name="subject"
                label={t("forms.contactOwner.subject.label")}
                rules={[ValidationRules.required(t("forms.contactOwner.subject.validationLabel")), ValidationRules.maxLength(20, t("forms.contactOwner.subject.validationLabel"))]}
            >
                <Input size="large" placeholder={t("forms.contactOwner.subject.placeholder")} />
            </Form.Item>
            <Form.Item
                name="message"
                label={t("forms.contactOwner.message.label")}
                rules={[ValidationRules.required(t("forms.contactOwner.message.validationRequiredLabel")), ValidationRules.maxLength(200, t("forms.contactOwner.message.validationMaxLengthLabel"))]}
            >
                <Input.TextArea rows={4} placeholder={t("forms.contactOwner.message.placeholder")} />
            </Form.Item>
        </>
    );
};