import { Form, Select } from "antd"
import { useTranslation } from "react-i18next"
import { ValidationRules } from "../../../../utils/validationRules"
import { razloziObustave } from "../../../../types/values"

export const BlockAccountFormFields = () => {
    const { t } = useTranslation("users");

    return (
        <>
            <Form.Item
                name="comment"
                label={t("forms.blockAccount.reasonLabel")}
                required={false}
                rules={[
                    ValidationRules.required(
                        t("forms.blockAccount.validationLabel"),
                    ),
                ]}
            >
                <Select
                    size="large"
                    options={razloziObustave}
                    placeholder={t("forms.blockAccount.reasonPlaceholder")}
                />
            </Form.Item>
        </>
    )
}