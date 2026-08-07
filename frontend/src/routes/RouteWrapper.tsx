import { RouterProvider } from "react-router-dom";
import { router } from "./createAppRouter";

export const RouterWrapper = () => {
    return (
        <RouterProvider
            router={router}
            future={{
                v7_startTransition: true,
            }}
        />
    );
};