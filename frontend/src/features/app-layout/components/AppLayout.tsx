import { Client } from "@stomp/stompjs";
import { Layout } from "antd";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import SockJS from "sockjs-client";
import { resetFilter } from "../../../redux/slices/filterSlice";
import { setBrojNeprocitanih } from "../../../redux/slices/notificationSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import { useNotifications } from "../../notifications/hooks/useNotificationQueries";
import style from "../style/AppLayout.module.css";
import { AppHeader } from "./AppHeader";

const { Content } = Layout;

const AUTH_PATH = "/authenticate";
const PET_ADS_PATH = "/oglasi";
const NOTIFICATIONS_SOCKET_URL = "http://localhost:8081/ws";

const AppLayout = () => {
    const dispatch = useDispatch<AppDispatch>();
    const userId = useSelector((state: RootState) => state.auth.userId);
    const location = useLocation();
    const previousPath = useRef<string | null>(null);

    const isMobile = useMediaQuery({ maxWidth: 950 });
    const isAuthPage = location.pathname === AUTH_PATH;

    const { notifications, refetchNotifications } = useNotifications(userId);

    useEffect(() => {
        const unreadCount = notifications.filter((notification) => notification.isRead === 0).length;
        dispatch(setBrojNeprocitanih(unreadCount));
    }, [notifications, dispatch]);

    useEffect(() => {
        if (!userId) return;

        const stompClient = new Client({
            webSocketFactory: () => new SockJS(NOTIFICATIONS_SOCKET_URL),
            reconnectDelay: 5000,
            onConnect: () => {
                stompClient.subscribe(`/topic/notifikacije/${userId}`, () => {
                    void refetchNotifications();
                });
            },
        });

        stompClient.activate();

        return () => {
            void stompClient.deactivate();
        };
    }, [userId, refetchNotifications]);

    useEffect(() => {
        const currentPath = location.pathname;
        const leftPetAdsPage =
            previousPath.current === PET_ADS_PATH &&
            !currentPath.startsWith(PET_ADS_PATH);

        if (leftPetAdsPage) dispatch(resetFilter());
        previousPath.current = currentPath;
    }, [location.pathname, dispatch]);

    return (
        <Layout className={style.layout}>
            <AppHeader />

            <Content
                className={style.content}
                style={{
                    paddingLeft: isAuthPage ? 0 : isMobile ? 13 : 70,
                    paddingRight: isAuthPage ? 0 : isMobile ? 13 : 70,
                    paddingTop: isAuthPage ? 0 : 20,
                }}
            >
                <Outlet />
            </Content>
        </Layout>
    );
};

export default AppLayout;