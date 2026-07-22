import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useNotifications } from "./hooks/useNotificationQueries";
import { useNotificationMutations } from "./hooks/useNotificationMutations";
import { setBrojNeprocitanih } from "../../redux/slices/notificationSlice";
import { Notifications } from "./components/Notifications";

export const NotificationContainer = () => {
    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.auth);

    const { notifications, isLoading } = useNotifications(auth.userId);

    const unreadNotifications = notifications.filter((notification) => notification.isRead === 0);

    const {
        markAllAsRead,
        deleteAllNotifications,
        isMarkingAsRead,
        isDeletingNotifications,
    } = useNotificationMutations({
        onSuccess: () => dispatch(setBrojNeprocitanih(0)),
    });

    const handleMarkAllAsRead = async () => {
        if (!auth.userId || isMarkingAsRead) return;
        await markAllAsRead(auth.userId);
    };

    const handleDeleteAll = async () => {
        if (!auth.userId || isDeletingNotifications) return;
        await deleteAllNotifications(auth.userId);
    };

    return (
        <Notifications
            data={notifications}
            unreadNotifications={unreadNotifications}
            handleProcitaj={handleMarkAllAsRead}
            handleDeleteAll={handleDeleteAll}
            isLoading={isLoading}
            isMarkingAsRead={isMarkingAsRead}
            isDeletingNotifications={isDeletingNotifications}
        />
    );
};