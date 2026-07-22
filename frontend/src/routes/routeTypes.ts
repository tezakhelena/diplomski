import {
    IndexRouteObject,
    NonIndexRouteObject,
} from "react-router-dom";

interface CustomRouteProperties {
    breadcrumb?: string;
    uloge?: number[];
    handle?: {
        breadcrumb?: string;
    };
}

export type RouteObjectWithBreadcrumb =
    | (
        Omit<IndexRouteObject, "children"> &
        CustomRouteProperties & {
            children?: undefined;
        }
    )
    | (
        Omit<NonIndexRouteObject, "children"> &
        CustomRouteProperties & {
            children?: RouteObjectWithBreadcrumb[];
        }
    );