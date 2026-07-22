import { Button, Form, FormInstance, Space, Spin, Typography } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AuthLayout } from "../../../reusable/auth-page/AuthLayout";
import style from "../style/Authentication.module.css";
import { RegisterFormFields } from "./form-fields/RegisterFormFields";

const { Title, Text } = Typography;

export const Registration = ({ form, onFinish, loading }: { form: FormInstance<any>, onFinish: () => void, privateUser: boolean, loading?: boolean }) => {
    const { t } = useTranslation('authentication');
    return (
        <AuthLayout>
            <Space direction="vertical" size={36} className={style.formContent}>
                <Space direction="vertical" size={6}>
                    <Title level={2} className={style.actionTitle}>{t("registration.title")}</Title>
                    <Text className={style.actionSubtitle}>{t("registration.subtitle")}</Text>
                </Space>
                <Spin spinning={loading} size="large" tip={t("registration.loading")}>
                    <Form form={form} layout="vertical" onFinish={onFinish} className={style.authForm} requiredMark={false}>
                        <RegisterFormFields form={form} />
                        <Form.Item>
                            <Button type="primary" htmlType="submit" size="large" block>{t("registration.button")}</Button>
                        </Form.Item>
                        <Text>
                            {t("registration.hasAccount")} <Link to="/prijava">{t("registration.loginLink")}</Link>
                        </Text>
                    </Form>
                </Spin>
            </Space>
        </AuthLayout>
    );
};