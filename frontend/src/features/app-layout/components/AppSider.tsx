import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Menu, Tooltip } from "antd";
import { Dog, House, PawPrint, Plus, ShieldAlert, UsersRound } from "lucide-react";
import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import useKorisnik from "../../../hooks/useKorisnik";
import { resetForm } from "../../../redux/slices/oglasiSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import style from "../style/AppLayout.module.css";
import { AccountStatus } from "../../../enums/userEnums";

export const AppSider = memo(() => {
    const { t } = useTranslation('app');
    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.auth);
    const { isAdmin, trebaDovrsitiProfil } = useKorisnik();

    const isMobile = useMediaQuery({ maxWidth: 950 });
    const [drawerVisible, setDrawerVisible] = useState(false);

    const closeDrawer = () => setDrawerVisible(false);

    const menuItems = (
        <>
            <Menu.Item disabled={trebaDovrsitiProfil()} key="naslovnica" icon={<House size={18} />}>
                <Link to="/" onClick={closeDrawer}>{t("sider.home")}</Link>
            </Menu.Item>

            {isAdmin() && (
                <Menu.Item disabled={trebaDovrsitiProfil()} key="korisnici" icon={<UsersRound size={18} />}>
                    <Link to="/korisnici" onClick={closeDrawer}>{t("sider.users")}</Link>
                </Menu.Item>
            )}

            <Menu.Item key="oglasi" disabled={trebaDovrsitiProfil()} icon={<PawPrint size={18} />}>
                <Link to="/oglasi" onClick={closeDrawer}>{t("sider.ads")}</Link>
            </Menu.Item>

            {auth.isAuthenticated && isAdmin() && (
                <Menu.Item key="nadzor" disabled={trebaDovrsitiProfil()} icon={<ShieldAlert size={18} />}>
                    <Link to="/nadzor" onClick={closeDrawer}>{t("sider.admin")}</Link>
                </Menu.Item>
            )}

            {auth.isAuthenticated && (
                <Menu.Item key="poduzeca" disabled={trebaDovrsitiProfil()} icon={<Dog size={18} />}>
                    <Link to="/organizacije" onClick={closeDrawer}>{t("sider.organizations")}</Link>
                </Menu.Item>
            )}

            {auth.isAuthenticated && (
                <Menu.Item key="upiti" disabled={trebaDovrsitiProfil()} icon={<ShieldAlert size={18} />}>
                    <Link to="/upiti" onClick={closeDrawer}>{t("sider.inquiries")}</Link>
                </Menu.Item>
            )}

            {(auth.isAuthenticated && !isAdmin()) && (
                <Menu.Item key="predajOglas" disabled={trebaDovrsitiProfil()} className={style.authMenuItem}>
                    <Link to="/oglasi/dodaj" onClick={() => { dispatch(resetForm()); closeDrawer(); }}>
                        <Tooltip title={auth.statusId == AccountStatus.Obustavljen ? t('racunObustavljen') : ""}>
                            <Button className={style.loginButton} disabled={auth.statusId == AccountStatus.Obustavljen} icon={<Plus size={17} />}>
                                {t("sider.addAd")}
                            </Button>
                        </Tooltip>
                    </Link>
                </Menu.Item>
            )}
        </>
    );

    return (
        <>
            {isMobile ? (
                <div className={style.mobileNavigation}>
                    <Button disabled={trebaDovrsitiProfil()} type="text" icon={<MenuOutlined />} onClick={() => setDrawerVisible(true)} className={style.mobileMenuButton} />
                </div>
            ) : (
                <Menu mode="horizontal" className={style.sider}>
                    {menuItems}
                </Menu>
            )}

            <Drawer title="LostPaw" placement="left" open={drawerVisible} width={280} className={style.mobileDrawer} styles={{ body: { padding: 0 } }} onClose={closeDrawer}>
                <Menu mode="inline" className={style.drawerMenu}>
                    {menuItems}
                </Menu>
            </Drawer>
        </>
    );
});

AppSider.displayName = "AppSider";