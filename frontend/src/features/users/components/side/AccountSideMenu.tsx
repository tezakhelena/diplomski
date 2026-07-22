import { Card, Menu, Flex, Typography } from "antd";
import { UserPen, Settings, BellRing } from "lucide-react";
import { useTranslation } from "react-i18next";
import style from "../../style/UserDetail.module.css";

interface Props {
    selectedOption: string;
    onSelect: (key: string) => void;
}

export const AccountSideMenu = ({ selectedOption, onSelect }: Props) => {
    const { t } = useTranslation("users");

    const items = [
        { key: "profile", label: t("details.accountMenu.profile.title"), desc: t("details.accountMenu.profile.description"), icon: <UserPen size={20} /> },
        { key: "security", label: t("details.accountMenu.security.title"), desc: t("details.accountMenu.security.description"), icon: <Settings size={20} /> },
        { key: "notifications", label: t("details.accountMenu.notifications.title"), desc: t("details.accountMenu.notifications.description"), icon: <BellRing size={20} /> },
    ];

    return (
        <Card bordered={false} className={style.accountMenuCard}>
            <Menu
                mode="vertical"
                selectedKeys={[selectedOption]}
                onClick={(e) => onSelect(e.key)}
                items={items.map((tab) => ({
                    key: tab.key,
                    label: (
                        <Flex align="center" gap={14}>
                            <Flex align="center" justify="center" className={style.accountTabIcon}>
                                {tab.icon}
                            </Flex>
                            <Flex vertical>
                                <Typography.Text strong>{tab.label}</Typography.Text>
                                <Typography.Text type="secondary" style={{ fontSize: '12px', lineHeight: 1.35 }}>
                                    {tab.desc}
                                </Typography.Text>
                            </Flex>
                        </Flex>
                    ),
                }))}
            />
        </Card>
    );
};