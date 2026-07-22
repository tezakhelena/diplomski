import { Space } from "antd";
import { LogIn, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import style from "../style/Authentication.module.css";
import { AuthLayout } from "../../../reusable/auth-page/AuthLayout";
import { AuthContentHeader } from "../../../reusable/auth-page/AuthContentHeader";
import { AuthOptionCard } from "../../../reusable/auth-page/AuthOptionCard";

const Authentication = () => {
    const navigate = useNavigate();
    const { t } = useTranslation('authentication');
    const actions = [
        {
            title: t("main.login"),
            description: t("main.loginDesc"),
            icon: <LogIn size={30} />,
            cardClass: style.loginCard,
            iconClass: style.loginIcon,
            onClick: () => navigate("/prijava")
        },
        {
            title: t("main.register"),
            description: t("main.registerDesc"),
            icon: <UserPlus size={30} />,
            cardClass: style.registerCard,
            iconClass: style.registerIcon,
            onClick: () => navigate("/registracija/odabir")
        },
    ];
    return (
        <AuthLayout>
            <AuthContentHeader title={t("main.title")} subtitle={t("main.subtitle")} />
            <Space direction="vertical" size={18} className={style.optionList}>
                {actions.map((action) => <AuthOptionCard key={action.title} {...action} />)}
            </Space>
        </AuthLayout>
    );
};
export default Authentication;