import { Card, Form, Input, List, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { SendHorizontal } from "lucide-react";
import { RootState } from "../../../redux/store";
import { AppForm } from "../../../reusable/AppForm";
import style from "../../pet-ads/style/AdDetails.module.css";
import { useCommentMutations, useComments } from "../hooks/useComments";
import { CommentResponse } from "../types/response-types";
import { CommentItem } from "./CommentItem";

interface Props {
    petAdId: number;
}

export const PetAdComments = ({ petAdId }: Props) => {
    const { t } = useTranslation('comments');
    const [form] = useForm();

    const userId = useSelector((state: RootState) => state.auth.userId);

    const { komentari, refetchKomentari } = useComments(petAdId);
    const { addComment, isAdding } = useCommentMutations(petAdId);

    const onFinish = async (values: CommentResponse) => {
        const content = values.content?.trim();
        if (!content || !userId) return;

        await addComment({ content, userId, petAdId });
        await refetchKomentari();
        form.resetFields();
    };

    return (
        <Card bordered={false} loading={isAdding}>
            <Typography.Title level={4} className={style.sideTitle}>
                {t("title")} ({komentari.length})
            </Typography.Title>

            <List
                dataSource={komentari}
                renderItem={(item) => <CommentItem comment={item} />}
            />

            <AppForm
                form={form}
                onFinish={onFinish}
                className={style.commentForm}
                actionsType="icon-submit"
                submitButtonProps={{ disabled: !userId, className: "app-send-button" }}
                submitIcon={<SendHorizontal size={17} />}
            >
                <Form.Item name="content" className={style.commentInputItem}>
                    <Input
                        disabled={!userId}
                        size="large"
                        placeholder={userId ? t("writePlaceholder") : t("loginPlaceholder")}
                    />
                </Form.Item>
            </AppForm>
        </Card>
    );
};