import { Card, Divider, Flex, Form, Input, Space, Tag, Typography } from "antd";
import { Calendar, Mail, MessageSquareReply } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AppForm } from "../../../reusable/AppForm";
import { ValidationRules } from "../../../utils/validationRules";
import { usePetAdContactMutations } from "../hooks/usePetAdContactMutations";
import { PetAdContactDetailResponse } from "../types/response-types";
import { formatMomentDate } from "../../../utils/dateUtils";

const iconStyle = { color: "#722ed1" };
const cardIconWrapperStyle = {
    width: 44, height: 44, borderRadius: 12,
    background: "#f0edff", color: "#722ed1",
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
};

interface Props {
    details: PetAdContactDetailResponse;
    isReceiver: boolean;
    refetch: () => void;
}

export const PetAdContactDetailContent = ({ details, isReceiver, refetch }: Props) => {
    const { t } = useTranslation("petAdContact");
    const [form] = Form.useForm();
    const { replyToContactMessage, isReplying } = usePetAdContactMutations({
        onReplySuccess: () => { form.resetFields(); refetch(); },
    });

    const handleReply = async () => {
        const values = await form.validateFields();
        await replyToContactMessage({ contactId: details.id, answer: values.answer });
    };

    return (
        <Space direction="vertical" size={24} className="app-full">
            <Card>
                <Flex align="start" gap={16}>
                    <div style={cardIconWrapperStyle}><Mail size={22} /></div>
                    <Flex vertical style={{ flex: 1 }}>
                        <Typography.Title level={5} style={{ margin: 0 }}>{details.subject}</Typography.Title>
                        <Space size={10} style={{ marginTop: 4 }}>
                            <Calendar size={14} style={iconStyle} />
                            <Typography.Text type="secondary" style={{ fontSize: "0.85rem" }}>
                                {t("detailContent.sentDate", { date: formatMomentDate(details.createdAt) })}
                            </Typography.Text>
                        </Space>
                        <Divider style={{ margin: "16px 0" }} />
                        <Typography.Paragraph style={{ margin: 0, whiteSpace: "pre-line" }}>
                            {details.message}
                        </Typography.Paragraph>
                    </Flex>
                </Flex>
            </Card>

            {details.answer ? (
                <Card>
                    <Flex align="start" gap={16}>
                        <div style={cardIconWrapperStyle}><MessageSquareReply size={22} /></div>
                        <Flex vertical style={{ flex: 1 }}>
                            <Flex justify="space-between" align="center">
                                <Typography.Title level={5} style={{ margin: 0 }}>{t("detailContent.replyTitle")}</Typography.Title>
                                <Tag color="purple">{t("detailContent.replyStatus")}</Tag>
                            </Flex>
                            <Divider style={{ margin: "16px 0" }} />
                            <Typography.Paragraph style={{ margin: 0, whiteSpace: "pre-line" }}>
                                {details.answer}
                            </Typography.Paragraph>
                            {details.repliedAt && (
                                <Typography.Text type="secondary" style={{ fontSize: "0.85rem", marginTop: 12 }}>
                                    {t("detailContent.repliedAt", { date: formatMomentDate(details.repliedAt) })}
                                </Typography.Text>
                            )}
                        </Flex>
                    </Flex>
                </Card>
            ) : (
                isReceiver && (
                    <Card>
                        <Typography.Title level={5}>{t("detailContent.sendReplyTitle")}</Typography.Title>
                        <AppForm
                            form={form}
                            onFinish={handleReply}
                            actionsType="submit"
                            submitText={t("detailContent.sendReplyButton")}
                            submitButtonProps={{ loading: isReplying, icon: <MessageSquareReply size={18} /> }}
                        >
                            <Form.Item name="answer" rules={[ValidationRules.required("Odgovor"), ValidationRules.maxLength(200, "Odgovor")]}>
                                <Input.TextArea rows={4} maxLength={200} showCount placeholder={t("detailContent.replyPlaceholder")} />
                            </Form.Item>
                        </AppForm>
                    </Card>
                )
            )}

            {!isReceiver && !details.answer && (
                <div style={{ textAlign: "center" }}>
                    <Tag color="gold" style={{ padding: "4px 12px" }}>{t("detailContent.awaitingResponse")}</Tag>
                </div>
            )}
        </Space>
    );
};