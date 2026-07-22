import { Space } from "antd";
import { Building2, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import style from "./style/Authentication.module.css";
import { AuthLayout } from "../../reusable/auth-page/AuthLayout";
import { AuthContentHeader } from "../../reusable/auth-page/AuthContentHeader";
import { AuthOptionCard } from "../../reusable/auth-page/AuthOptionCard";

export const ChooseSubjectUserContainer = () => {
    const { t } = useTranslation('authentication');
    const accountTypes = [
        {
            title: t("chooseSubject.private.title"),
            description: t("chooseSubject.private.description"),
            icon: <User size={30} />,
            state: { privateUser: true },
            cardClass: style.privateUserCard,
            iconClass: style.privateUserIcon,
        },
        {
            title: t("chooseSubject.business.title"),
            description: t("chooseSubject.business.description"),
            icon: <Building2 size={30} />,
            state: { privateUser: false },
            cardClass: style.businessUserCard,
            iconClass: style.businessUserIcon,
        },
    ];
    return (
        <AuthLayout>
            <AuthContentHeader title={t("chooseSubject.title")} subtitle={t("chooseSubject.subtitle")} />
            <Space direction="vertical" size={18} className={style.optionList}>
                {accountTypes.map((item) => (
                    <Link key={item.title} to="/registracija" state={item.state} className={style.cleanLink}>
                        <AuthOptionCard {...item} />
                    </Link>
                ))}
            </Space>
        </AuthLayout>
    );
};