import { DownOutlined } from "@ant-design/icons";
import { Badge, Button, Dropdown, Layout, Space, type MenuProps } from "antd";
import { BellRing, Dog, HandHeart, LogIn, LogOut, MessageCircle, PawPrint, Settings } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useKorisnik from "../../../hooks/useKorisnik";
import { logout } from "../../../redux/slices/authSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import UserAvatar from "../../../reusable/UserAvatar";
import style from "../style/AppLayout.module.css";
import { AppSider } from "./AppSider";

const { Header } = Layout;

export const AppHeader = () => {
    const { t } = useTranslation('app');
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const auth = useSelector((state: RootState) => state.auth);
    const unreadNotifications = useSelector((state: RootState) => state.notifikacije.brojNeprocitanih);
    const korisnik = useKorisnik();

    useEffect(() => {
        if (!auth.isAuthenticated) {
            navigate("/", { replace: true });
        }
    }, [auth.isAuthenticated, navigate]);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/", { replace: true });
    };

    const dropdownItems = useMemo<MenuProps["items"]>(() => {
        const items: MenuProps["items"] = [];

        if (!korisnik.hasRole(4)) {
            items.push(
                {
                    key: "contacts",
                    icon: <MessageCircle size={18} />,
                    label: <Link to="/contacts" state={{ userId: auth.userId }}>{t("header.dropdown.contacts")}</Link>,
                },
                {
                    key: "postavke",
                    icon: <Settings size={18} />,
                    label: <Link to="/profil" state={{ userId: auth.userId }}>{t("header.dropdown.settings")}</Link>,
                },
                {
                    key: "zahtjevi",
                    icon: <HandHeart size={18} />,
                    label: <Link to="/zahtjevi">{t("header.dropdown.adoptions")}</Link>,
                },
                {
                    key: "prijave-za-volontiranje",
                    icon: <Dog size={18} />,
                    label: <Link to="/prijave-za-volontiranje">{t("header.dropdown.volunteer")}</Link>,
                }
            );
        }

        items.push({
            key: "logout",
            icon: <LogOut size={18} />,
            label: t("header.logout"),
            onClick: handleLogout,
        });

        return items;
    }, [auth.userId, korisnik, t]);

    return (
        <Header className={style.header}>
            <div className={style.logo}>
                <PawPrint size={28} />
                <span>{t("header.logo")}</span>
            </div>

            <AppSider />

            <div className={style.headerActions}>
                {!auth.isAuthenticated ? (
                    <Link to="/authenticate">
                        <Button className={style.loginButton} icon={<LogIn size={17} />}>
                            {t("header.login")}
                        </Button>
                    </Link>
                ) : (
                    <Space align="center">
                        <Link to="/notifikacije">
                            <Button shape="circle" className="app-icon-button">
                                <Badge count={unreadNotifications} overflowCount={99}>
                                    <BellRing size={17} />
                                </Badge>
                            </Button>
                        </Link>
                        <Dropdown menu={{ items: dropdownItems }} placement="bottomRight" trigger={["click"]}>
                            <Button type="link" className={style.userButton}>
                                <UserAvatar />
                                <DownOutlined />
                            </Button>
                        </Dropdown>
                    </Space>
                )}
            </div>
        </Header>
    );
};