import { Col, Form, Input, Row, Space, Switch, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { ValidationRules } from "../../../../utils/validationRules";
import { AttributeSelect } from "../../../attributes/components/AttributeSelect";

interface UserFormFieldsProps {
    privateUser: boolean;
    edit?: boolean;
    visible?: boolean;
    isAdmin: boolean;
    disabled?: boolean;
    handleSwitch?: (value: boolean) => void;
}

export const UserFormFields = ({ privateUser, edit, visible, isAdmin, disabled, handleSwitch }: UserFormFieldsProps) => {
    const { t } = useTranslation("users");

    return (
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col xs={24} sm={12}>
                <Form.Item
                    label={privateUser ? t("forms.user.firstName.label") : t("forms.user.businessName.label")}
                    name="firstName"
                    rules={[
                        ValidationRules.required(privateUser ? t("forms.user.firstName.label") : t("forms.user.businessName.label")),
                        ValidationRules.maxLength(50, privateUser ? t("forms.user.firstName.label") : t("forms.user.businessName.label"))
                    ]}
                >
                    <Input size="large" disabled={disabled} placeholder={privateUser ? t("forms.user.firstName.placeholder") : t("forms.user.businessName.placeholder")} />
                </Form.Item>
            </Col>

            {!privateUser && (
                <>
                    <Col xs={24} sm={12}>
                        <AttributeSelect
                            type="business-types"
                            placeholder={t("forms.user.businessType.placeholder")}
                            name="businessTypeId"
                            label={t("forms.user.businessType.label")}
                            disabled={disabled}
                        />
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            name="oib"
                            label={t("forms.user.oib.label")}
                            rules={[
                                ValidationRules.required(t("forms.user.oib.label")),
                                { pattern: /^\d{11}$/, message: t("forms.user.oib.invalid") }
                            ]}
                        >
                            <Input size="large" disabled={disabled} placeholder={t("forms.user.oib.placeholder")} maxLength={11} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            name="website"
                            label={t("forms.user.website.label")}
                            rules={[{ type: "url", message: t("forms.user.website.invalid") }]}
                            normalize={(value) => (value && !value.startsWith('http') ? `https://${value}` : value)}
                        >
                            <Input size="large" disabled={disabled} placeholder={t("forms.user.website.placeholder")} />
                        </Form.Item>
                    </Col>
                </>
            )}

            {privateUser && (
                <Col xs={24} sm={12}>
                    <Form.Item label={t("forms.user.lastName.label")} name="lastName" rules={[ValidationRules.required(t("forms.user.lastName.label")), ValidationRules.maxLength(30, t("forms.user.lastName.label")), ValidationRules.minLength(2, t("forms.user.lastName.label"))]}>
                        <Input size="large" disabled={disabled} placeholder={t("forms.user.lastName.placeholder")} />
                    </Form.Item>
                </Col>
            )}

            {edit && (
                <Col xs={24} sm={12}>
                    <Form.Item label={t("forms.user.username.label")} name="username" rules={[ValidationRules.required(t("forms.user.username.label")), ValidationRules.maxLength(30, t("forms.user.username.label")), ValidationRules.minLength(3, t("forms.user.username.label"))]}>
                        <Input size="large" disabled={disabled} placeholder={t("forms.user.username.placeholder")} />
                    </Form.Item>
                </Col>
            )}

            {visible && (
                <Col xs={24} sm={12}>
                    <Form.Item label={t("forms.user.phoneNumber.label")} name="phoneNumber" rules={[ValidationRules.required(t("forms.user.phoneNumber.label")), ValidationRules.phoneNumber()]}>
                        <Input size="large" disabled={disabled} placeholder={t("forms.user.phoneNumber.placeholder")} />
                    </Form.Item>
                </Col>
            )}

            <Col xs={24} sm={12}>
                <AttributeSelect type="county" disabled={disabled} name="countyId" label={t("forms.user.county.label")} placeholder={t("forms.user.county.placeholder")} />
            </Col>

            <Col xs={24} sm={12}>
                <Form.Item label={t("forms.user.city.label")} name="city" rules={[ValidationRules.required(t("forms.user.city.label")), ValidationRules.minLength(2, t("forms.user.city.label"))]}>
                    <Input size="large" disabled={disabled} placeholder={t("forms.user.city.placeholder")} />
                </Form.Item>
            </Col>

            {isAdmin && (
                <Col span={12}>
                    <AttributeSelect
                        type="roles"
                        name="roleId"
                        label={t("forms.user.role.label")}
                        placeholder={t("forms.user.role.placeholder")}
                    />
                </Col>
            )}

            {!edit && (
                <Col>
                    <Form.Item name="contactVisible">
                        <Typography.Title level={5}>
                            <Space>
                                {t("forms.user.contactVisibility.title")}
                                <Switch disabled={disabled} onChange={(value) => handleSwitch!(value)} />
                            </Space>
                        </Typography.Title>
                        <Typography.Text type="secondary">{t("forms.user.contactVisibility.description")}</Typography.Text>
                    </Form.Item>
                </Col>
            )}
        </Row>
    );
};