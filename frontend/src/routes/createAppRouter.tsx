import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "../features/app-layout/components/AppLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { protectedRoutes } from "./protectedRoutes";
import { publicRoutes } from "./publicRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
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