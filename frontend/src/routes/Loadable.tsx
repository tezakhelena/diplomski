import React, { LazyExoticComponent, Suspense } from "react";

export const Loadable = (
    Component: LazyExoticComponent<React.ComponentType<any>>
) => (
    <Suspense fallback={<div>Učitavanje...</div>}>
        <Component />
    </Suspense>
);