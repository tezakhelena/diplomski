import { Button, Col, Form, Input, Row, Space, Switch, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import { Pencil, Save } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { setContactVisible } from "../../../../redux/slices/authSlice";
import { RootState } from "../../../../redux/store";
import { AntSpin } from "../../../../reusable/AntSpin";
import { AppForm } from "../../../../reusable/AppForm";
import { useUserMutations } from "../../hooks/useUserMutations";
import { UserDetailsResponse } from "../../types/response-types";
import { AccountChangeStatus } from "./AccountChangeStatus";
import { ChangePassword } from "./ChangePassword";

interface Props {
    initialValues?: UserDetailsResponse;
}

export const UserAccountSettings = ({ initialValues }: Props) => {
    const { t } = useTranslation("users");
    const [form] = useForm();
    const [visible, setVisible] = useState(false);
    const auth = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const { changeEmail, changeEmailPending, toggleVisibility, togglePending } = useUserMutations();

    const handleModal = (value: boolean) => {
        setVisible(value);
    }

    const onFinish = async () => {
        const email = form.getFieldValue("email");
        const userId = initialValues?.userId!;
        await changeEmail({ email, userId });
    };

    const handleSwitch = async (value: boolean) => {
        const userId = initialValues?.userId!;

        await toggleVisibility({ contactVisible: value, userId });
        dispatch(setContactVisible(value));
    };

    return (
        <Row gutter={[24, 24]}>
            <Col xs={24} sm={24} md={18} lg={14} xl={12}>
                <AntSpin loading={changeEmailPending}>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <AppForm form={form} onFinish={onFinish} initialValues={initialValues}>
                                <Form.Item name="email" label={t("account.settings.emailLabel")}>
                                    <Input
                                        size="large"
                                        placeholder={t("account.settings.emailPlaceholder")}
                                        disabled={initialValues?.userId !== auth.userId}
                                        suffix={
                                            <Button
                                                type="text"
                                                icon={<Save size={16} color="#5b4dff" />}
                                                onClick={() => form.submit()}
                                            />
                                        }
                                    />
                                </Form.Item>
                            </AppForm>
                        </Col>
                        {initialValues?.userId === auth.userId &&
                            <Col span={24}>
                                <Button type="link" onClick={() => handleModal(true)}><Pencil size={18} /> {t("account.settings.changePasswordButton")}</Button>
                            </Col>
                        }

                        <Col span={24}>
                            <Space direction="vertical">
                                <Typography.Title level={5}>
                                    <Space>
                                        {t("account.settings.contactVisibilityTitle")}
                                        <Switch
                                            loading={togglePending}
                                            onChange={(value) => handleSwitch(value)}
                                            checked={auth.contactVisible}
                                            disabled={initialValues?.userId !== auth.userId}
                                        />
                                    </Space>
                                </Typography.Title>
                                <Typography.Text type="secondary">
                                    {t("account.settings.contactVisibilityDescription")}
                                </Typography.Text>
                            </Space>
                        </Col>
                        <Col span={24}>
                            <AccountChangeStatus
                                userId={initialValues?.userId!}
                                statusId={initialValues?.statusId}
                            />
                        </Col>
                    </Row>
                </AntSpin>
            </Col>

            <ChangePassword visible={visible} handleModal={handleModal} userId={initialValues?.userId!} />
        </Row>
    )
}