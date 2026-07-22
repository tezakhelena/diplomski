import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { RootState } from "../redux/store";

export const ProtectedRoute = () => {
    const location = useLocation();

    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    );

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/prijava"
                replace
                state={{ from: location }}
            />
        );
    }

    return <Outlet />;
};