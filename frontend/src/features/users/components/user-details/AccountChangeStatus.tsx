import { Alert, Button, Col, Form, Row, Space, Typography } from "antd";
import { Ban, Trash2 } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { logout } from "../../../../redux/slices/authSlice";
import { RootState } from "../../../../redux/store";
import { AppForm } from "../../../../reusable/AppForm";
import { AppModal } from "../../../../reusable/AppModal";
import { useUserMutations } from "../../hooks/useUserMutations";
import { BlockAccountFormFields } from "../form-fields/BlockAccountFormFields";
import { AccountStatus } from "../../../../enums/userEnums";
import useKorisnik from "../../../../hooks/useKorisnik";

interface Props {
    userId: number;
    statusId?: number;
}

export const AccountChangeStatus = ({ userId, statusId }: Props) => {
    const { t } = useTranslation("users");
    const [action, setAction] = useState<"delete" | "block" | null>(null);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state: RootState) => state.auth);
    const { changeStatus, changeStatusPending, deleteAccount, deletePending } = useUserMutations();
    const user = useKorisnik();

    const showDeleteButton = auth.userId === userId || user.isAdmin();

    const isDelete = action === "delete";

    const closeModal = () => {
        form.resetFields();
        setAction(null);
    };

    const handleConfirm = async () => {
        if (isDelete) {
            await deleteAccount(userId);
            if (auth.userId === userId) {
                dispatch(logout());
                navigate("/authenticate");
            } else {
                navigate("/korisnici")
            }
        } else {
            form.submit();
        }
    };

    const blockAccount = async (values: any) => {
        await changeStatus({ statusId: AccountStatus.Obustavljen, userId, comment: values.comment });
        closeModal();
    };

    const modalConfig = {
        title: isDelete ? t("account.management.delete.title") : t("account.management.suspend.title"),
        desc: isDelete ? t("account.management.delete.description") : t("account.management.suspend.description"),
        confirmBtn: isDelete ? t("account.management.delete.confirmButton") : t("account.management.suspend.confirmButton"),
        confirmTitle: isDelete ? t("account.management.delete.confirmTitle") : t("account.management.suspend.confirmTitle"),
        confirmDesc: isDelete ? t("account.management.delete.confirmDescription") : t("account.management.suspend.confirmDescription")
    };

    return (
        <>
            <Alert
                message={t("account.management.title")}
                type="error"
                description={
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Typography.Text type="secondary">{t("account.management.description")}</Typography.Text>
                        </Col>
                        <Col span={24}>
                            <Space wrap>
                                {(user.isAdmin() && statusId !== AccountStatus.Obustavljen) && (
                                    <Button size="large" danger icon={<Ban size={18} />} onClick={() => setAction("block")}>
                                        {t("account.management.suspendButton")}
                                    </Button>
                                )}
                                {showDeleteButton &&
                                    <Button size="large" color="danger" variant="solid" icon={<Trash2 size={18} />} onClick={() => setAction("delete")}>
                                        {t("account.management.deleteButton")}
                                    </Button>
                                }
                            </Space>
                        </Col>
                    </Row>
                }
            />

            <AppModal
                open={!!action}
                title={modalConfig.title}
                description={modalConfig.desc}
                icon={isDelete ? <Trash2 size={24} /> : <Ban size={24} />}
                danger
                loading={changeStatusPending || deletePending}
                confirmText={modalConfig.confirmBtn}
                confirmTitle={modalConfig.confirmTitle}
                confirmDescription={modalConfig.confirmDesc}
                onConfirm={handleConfirm}
                onCancel={closeModal}
            >
                {!isDelete && (
                    <AppForm form={form} onFinish={blockAccount}>
                        <BlockAccountFormFields />
                    </AppForm>
                )}
            </AppModal>
        </>
    );
};