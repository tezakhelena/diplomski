import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import { AttributeSelect } from "../../../attributes/components/AttributeSelect";
import { ValidationRules } from "../../../../utils/validationRules";

export const ReportAdFormFields = () => {
    const { t } = useTranslation("petAd");

    return (
        <>
            <AttributeSelect
                type="status"
                name="reasonCode"
                placeholder={t("forms.reportAd.reasonPlaceholder")}
                statusType={11}
                label={t("forms.reportAd.reasonLabel")}
            />
            <Form.Item
                name="comment"
                label={t("forms.reportAd.comment.label")}
                rules={[ValidationRules.required(t("forms.reportAd.comment.validationLabel")), ValidationRules.maxLength(200, t("forms.reportAd.comment.validationLabel"))]}
            >
                <Input.TextArea rows={4} />
            </Form.Item>
        </>
    );
};