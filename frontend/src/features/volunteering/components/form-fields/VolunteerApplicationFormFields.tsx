import { Col, Form, Input, Row } from "antd"
import { useTranslation } from "react-i18next"
import { ValidationRules } from "../../../../utils/validationRules"
import { AttributeSelect } from "../../../attributes/components/AttributeSelect"

interface Props {
    disabled?: boolean;
}

export const VolunteerApplicationFormFields = ({ disabled }: Props) => {
    const { t } = useTranslation("volunteer");

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
                <Form.Item
                    label={t("application.form.motivation.label")}
                    name="motivation"
                    required={false}
                    rules={[ValidationRules.required(t("application.form.motivation.validationLabel")), ValidationRules.maxLength(200, t("application.form.motivation.validationLabel"))]}
                >
                    <Input.TextArea placeholder={t("application.form.motivation.placeholder")} />
                </Form.Item>
            </Col>

            <Col xs={24} md={12}>
                <Form.Item
                    label={t("application.form.experience.label")}
                    name="experience"
                    required={false}
                    rules={[ValidationRules.required(t("application.form.experience.validationLabel")), ValidationRules.maxLength(200, t("application.form.experience.validationLabel"))]}
                >
                    <Input.TextArea placeholder={t("application.form.experience.placeholder")} />
                </Form.Item>
            </Col>

            <Col xs={24} md={12}>
                <Form.Item
                    label={t("application.form.availability.label")}
                    name="availability"
                    required={false}
                    rules={[ValidationRules.required(t("application.form.availability.validationLabel")), ValidationRules.maxLength(50, t("application.form.availability.validationLabel"))]}
                >
                    <Input size="large" placeholder={t("application.form.availability.placeholder")} />
                </Form.Item>
            </Col>

            <Col xs={24} md={12}>
                <AttributeSelect
                    type="status"
                    name="volunteerType"
                    placeholder={t("application.form.volunteerType.placeholder")}
                    statusType={10}
                    label={t("application.form.volunteerType.label")}
                    disabled={disabled}
                />
            </Col>
        </Row >
    )
}