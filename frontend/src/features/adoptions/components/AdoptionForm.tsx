import { Alert, Button, Divider, Flex, Form, Row, Typography } from "antd";
import { ClipboardList, Send } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdoptionMutations } from "../hooks/useAdoptionMutations";
import { AdoptionRequestDetailResponse } from "../types/response-types";
import { AdoptionFormFields } from "./form-fields/AdoptionFormFields";
import { useTranslation } from "react-i18next";

interface Props {
    petAdId?: number;
    disabled?: boolean;
    initialValues?: AdoptionRequestDetailResponse;
    podnositeljId: number;
}

const AdoptionForm: React.FC<Props> = ({ petAdId, disabled, initialValues, podnositeljId }) => {
    const { t } = useTranslation('adoption');
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { sendRequest, isSending } = useAdoptionMutations({ navigate });

    useEffect(() => {
        if (initialValues) form.setFieldsValue(initialValues);
    }, [initialValues, form]);

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={(vals) => sendRequest({ userId: podnositeljId, petAdId, ...vals })}
            disabled={disabled}
            requiredMark={false}
        >
            <Flex align="start" gap={14} style={{ marginBottom: 24 }}>
                <Flex
                    align="center"
                    justify="center"
                    style={{ width: 50, height: 50, borderRadius: 16, background: "#f0edff", color: "#5b4dff", flexShrink: 0 }}
                >
                    <ClipboardList size={26} />
                </Flex>
                <Flex vertical>
                    <Typography.Title level={4} style={{ margin: 0 }}>{t('adoption.form.title')}</Typography.Title>
                    <Typography.Text type="secondary">{t('adoption.form.subtitle')}</Typography.Text>
                </Flex>
            </Flex>

            <Row gutter={[20, 20]}>
                <AdoptionFormFields />
            </Row>

            {!disabled && (
                <>
                    <Alert
                        type="info"
                        showIcon
                        message={t('adoption.form.alert')}
                        style={{ marginTop: 24, borderRadius: 12 }}
                    />
                    <Divider style={{ margin: "24px 0" }} />
                    <Flex justify="flex-end">
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isSending}
                            icon={<Send size={17} />}
                            size="large"
                            style={{ borderRadius: 12, padding: "0 24px" }}
                        >
                            {t('adoption.form.submit')}
                        </Button>
                    </Flex>
                </>
            )}
        </Form>
    );
};

export default AdoptionForm;