import { Button, Form, FormInstance, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AuthContentHeader } from "../../../reusable/auth-page/AuthContentHeader";
import { AuthLayout } from "../../../reusable/auth-page/AuthLayout";
import style from "../style/Authentication.module.css";
import { LoginFormFields } from "./form-fields/LoginFormFields";

const { Text } = Typography;

export const Login = ({ form, onFinish, loading }: { form: FormInstance<any>, onFinish: () => void, loading: boolean }) => {
    const { t } = useTranslation('authentication');
    return (
        <AuthLayout>
            <Space direction="vertical" size={36} className={style.formContent}>
                <AuthContentHeader title={t("login.title")} subtitle={t("login.subtitle")} />
                <Form layout="vertical" form={form} onFinish={onFinish} className={style.authForm} requiredMark={false}>
                    <LoginFormFields />
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block loading={loading}>{t("login.button")}</Button>
                    </Form.Item>
                    <Text>
                        {t("login.noAccount")} 
                        <Link to="/registracija/odabir">{t("login.registerLink")}</Link>
                    </Text>
                </Form>
            </Space>
        </AuthLayout>
    );
};