import { Card, Form, Input, Space, Typography } from "antd";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { setNoviOglasForma } from "../../../../redux/slices/oglasiSlice";

export const NewAdPetDetails = () => {
    const { t } = useTranslation("petAd");
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    return (
        <Card>
            <Space direction="vertical" size={20} className="app-full">
                <Space direction="vertical" size={4}>
                    <Typography.Title level={4} style={{ margin: 0 }}>
                        {t("newAd.details.title")}
                    </Typography.Title>

                    <Typography.Text type="secondary">
                        {t("newAd.details.description")}
                    </Typography.Text>
                </Space>

                <Form
                    form={form}
                    layout="vertical"
                    onValuesChange={(_, allValues) =>
                        dispatch(setNoviOglasForma(allValues))
                    }
                >
                    <Form.Item name="notes" style={{ marginBottom: 0 }}>
                        <Input.TextArea
                            rows={6}
                            placeholder={t("newAd.details.placeholder")}
                            showCount
                            maxLength={1000}
                        />
                    </Form.Item>
                </Form>
            </Space>
        </Card>
    );
};