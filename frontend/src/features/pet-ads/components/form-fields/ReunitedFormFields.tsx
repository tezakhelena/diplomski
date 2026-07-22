import { Form, Input, Rate } from "antd";
import { useTranslation } from "react-i18next";

export const ReunitedFormFields = () => {
    const { t } = useTranslation("petAd");

    return (
        <>
            <Form.Item name="rate" label={t("forms.reunited.ratingLabel")}>
                <Rate />
            </Form.Item>

            <Form.Item name="comment" label={t("forms.reunited.commentLabel")}>
                <Input.TextArea rows={4} />
            </Form.Item>
        </>
    );
};