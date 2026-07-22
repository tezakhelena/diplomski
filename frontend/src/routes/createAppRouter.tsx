import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Loadable } from "./Loadable";
import { ProtectedRoute } from "./ProtectedRoute";
import { protectedRoutes } from "./protectedRoutes";
import { publicRoutes } from "./publicRoutes";

const AppLayout = lazy(() =>
  import("../features/app-layout/components/AppLayout")
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: Loadable(AppLayout),
    children: [
      ...publicRoutes,
      {
        element: <ProtectedRoute />,
        children: protectedRoutes,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);