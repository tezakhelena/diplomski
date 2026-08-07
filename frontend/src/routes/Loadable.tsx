import React, {
    LazyExoticComponent,
    Suspense,
} from "react";
import { Spin } from "antd";

export const Loadable = (Component: LazyExoticComponent<React.ComponentType<any>>) => (
    <Suspense fallback={
            <div
                style={{
                    minHeight: "300px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Spin size="large" />
            </div>
        }
    >
        <Component />
    </Suspense>
);