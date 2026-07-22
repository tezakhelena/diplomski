import { Form, Input } from "antd";
import { User, UserRound } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AttributeSelect } from "../../../attributes/components/AttributeSelect";

export const UsersOverviewFilterFields = () => {
    const { t } = useTranslation("users");

    return (
        <>
            <Form.Item name="firstName" label={t("overview.filters.firstName.label")}>
                <Input
                    size="large"
                    placeholder={t("overview.filters.firstName.placeholder")}
                    allowClear
                    prefix={<User size={16} />}
                />
            </Form.Item>

            <Form.Item name="lastName" label={t("overview.filters.lastName.label")}>
                <Input
                    size="large"
                    placeholder={t("overview.filters.lastName.placeholder")}
                    allowClear
                    prefix={<User size={16} />}
                />
            </Form.Item>

            <Form.Item name="username" label={t("overview.filters.username.label")}>
                <Input
                    size="large"
                    placeholder={t("overview.filters.username.placeholder")}
                    allowClear
                    prefix={<UserRound size={16} />}
                />
            </Form.Item>

            <AttributeSelect
                type="roles"
                placeholder={t("overview.filters.role.placeholder")}
                name="roleId"
                label={t("overview.filters.role.label")}
                isFilter
            />

            <AttributeSelect
                type="status"
                statusType={1}
                placeholder={t("overview.filters.status.placeholder")}
                name="statusId"
                label={t("overview.filters.status.label")}
                isFilter
            />
        </>
    );
};