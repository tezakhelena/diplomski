import { Avatar, Button, Card, Flex, Form, FormInstance, Input, Space, Tag, Typography } from "antd";
import { CalendarDays, Check, ChevronDown, HelpCircle, Send, UserRound, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { AppForm } from "../../../reusable/AppForm";
import { ValidationRules } from "../../../utils/validationRules";
import style from "../styles/Inquiries.module.css";
import { InquiryResponse } from "../types/response-types";
import { formatMomentDate } from "../../../utils/dateUtils";
import { getImage } from "../../../utils/urlUtils";
import { QueryType } from "../../../enums/supportEnums";
import { BusinessType } from "../../../enums/userEnums";

interface InquiryCardProps {
    upit: InquiryResponse;
    privateUser: boolean;
    activeAnswerId: number | null;
    setActiveAnswerId: (id: number | null) => void;
    answerForm: FormInstance;
    onFinishOdgovor: (inquiryId: number) => void;
    isReplying: boolean;
}

export const InquiryCard = ({ upit, privateUser, activeAnswerId, setActiveAnswerId, answerForm, onFinishOdgovor, isReplying }: InquiryCardProps) => {
    const { t } = useTranslation("inquiries");
    const { businessTypeId, roleId } = useSelector((state: RootState) => state.auth);

    const closeAnswerForm = () => {
        answerForm.resetFields();
        setActiveAnswerId(null);
    };

    const openAnswerForm = () => {
        answerForm.resetFields();
        setActiveAnswerId(upit.inquiryId);
    };

    const canAnswer = () => {
        if (roleId === 1) return true;
        if (privateUser || !businessTypeId) return false;

        const permissions: Record<number, number[]> = {
            [QueryType.TehnickaPodrska]: [],
            [QueryType.PitanjeOUdomljavanju]: [BusinessType.UdrugaAzil],
            [QueryType.SavjetZdravlje]: [BusinessType.VeterinarskaStanica],
            [QueryType.SavjetNjega]: [BusinessType.SalonZaNjegu, BusinessType.PetShop, BusinessType.SkolaZaTrening],
        };

        const typeKey = Number(upit.type);
        const allowedTypes = permissions[typeKey] || [];
        return allowedTypes.includes(Number(businessTypeId));
    };

    const hasAnswer = Boolean(upit.answer);
    const isAnswerOpen = activeAnswerId === upit.inquiryId;
    const showAnswerButton = !hasAnswer && canAnswer();

    return (
        <Card bordered={false} className={style.inquiryCard}>
            <Flex justify="space-between" align="flex-start" gap={14} wrap="wrap">
                <Space align="start" size={14}>
                    <Avatar src={getImage(upit.userProfilePicture)} size={54} />
                    <Space direction="vertical" size={8}>
                        <Space wrap>
                            <Typography.Text strong className={style.username}>{upit.username}</Typography.Text>
                            <Tag className={style.typeTag}>{upit.typeValue}</Tag>
                        </Space>
                        <Typography.Text type="secondary" className={style.date}>
                            <CalendarDays size={14} /> {formatMomentDate(upit.createdAt)}
                        </Typography.Text>
                        <Typography.Title level={5} className={style.question}>{upit.question}</Typography.Title>
                    </Space>
                </Space>

                <Tag className={hasAnswer ? style.answeredTag : style.pendingTag}>
                    {hasAnswer ? <Check size={15} /> : <HelpCircle size={15} />}
                    {hasAnswer ? t("card.answered") : t("card.pending")}
                </Tag>
            </Flex>

            {hasAnswer && (
                <Card bordered={false} className={style.answerBox}>
                    <Space direction="vertical" size={10} className="app-full">
                        <Space align="center" size={10}>
                            <Avatar size={32} src={getImage(upit.responderProfilePicture)} icon={<UserRound size={16} />} />
                            <Space direction="vertical" size={0}>
                                <Typography.Text strong style={{ fontSize: '13px' }}>{upit.responderUsername}</Typography.Text>
                                <Typography.Text type="secondary" style={{ fontSize: '11px' }}>
                                    {t("card.repliedAt")} {formatMomentDate(upit.repliedAt)}
                                </Typography.Text>
                            </Space>
                        </Space>
                        <Typography.Text style={{ display: 'block', paddingLeft: '42px' }}>{upit.answer}</Typography.Text>
                    </Space>
                </Card>
            )}

            {showAnswerButton && (
                isAnswerOpen ? (
                    <AppForm
                        form={answerForm}
                        onFinish={() => onFinishOdgovor(upit.inquiryId)}
                        className={style.answerForm}
                        actionsType="submit-cancel"
                        submitText={t("card.submitAnswer")}
                        cancelText={t("card.cancel")}
                        onCancel={closeAnswerForm}
                        submitButtonProps={{ icon: <Send size={17} />, loading: isReplying }}
                        cancelButtonProps={{ icon: <X size={17} /> }}
                    >
                        <Form.Item name="odgovor" rules={[ValidationRules.required(t("card.submitAnswer")), ValidationRules.maxLength(200, t("card.submitAnswer"))]}>
                            <Input.TextArea rows={4} placeholder={t("card.answerPlaceholder")} />
                        </Form.Item>
                    </AppForm>
                ) : (
                    <Flex justify="flex-end">
                        <Button icon={<ChevronDown size={17} />} onClick={openAnswerForm}>{t("card.answerButton")}</Button>
                    </Flex>
                )
            )}
        </Card>
    );
};