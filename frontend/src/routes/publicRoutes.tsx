import { lazy } from "react";
import { Loadable } from "./Loadable";
import { RouteObjectWithBreadcrumb } from "./routeTypes";

const HomePageContainer = lazy(() =>
    import("../features/home-page/HomePageContainer").then((module) => ({
        default: module.HomePageContainer,
    }))
);

const Authentication = lazy(() =>
    import("../features/authentication/components/Authentication")
);

const ChooseSubjectUserContainer = lazy(() =>
    import("../features/authentication/ChooseSubjectUserContainer").then(
        (module) => ({
            default: module.ChooseSubjectUserContainer,
        })
    )
);

const RegistrationContainer = lazy(() =>
    import("../features/authentication/RegistrationContainer").then(
        (module) => ({
            default: module.RegistrationContainer,
        })
    )
);

const UserDetailsContainer = lazy(() =>
    import("../features/users/UserDetailsContainer").then((module) => ({
        default: module.UserDetailsContainer,
    }))
);

const VerifyEmailContainer = lazy(() =>
    import("../features/verify-email/VerifyEmailContainer").then((module) => ({
        default: module.VerifyEmailContainer,
    }))
);

const LoginContainer = lazy(() =>
    import("../features/authentication/LoginContainer").then((module) => ({
        default: module.LoginContainer,
    }))
);

const PetAdContainer = lazy(() =>
    import("../features/pet-ads/PetAdContainer").then((module) => ({
        default: module.PetAdContainer,
    }))
);

const BusinessUsersContainer = lazy(() =>
    import("../features/business-users/BusinessUsersContainer").then(
        (module) => ({
            default: module.BusinessUsersContainer,
        })
    )
);

const AdDetailsContainer = lazy(() =>
    import("../features/pet-ads/AdDetailsContainer").then((module) => ({
        default: module.AdDetailsContainer,
    }))
);

const PravilaPlatformeContainer = lazy(() =>
    import("../features/pravila-platforme/PravilaPlatformeContainer").then(
        (module) => ({
            default: module.PravilaPlatformeContainer,
        })
    )
);

export const publicRoutes: RouteObjectWithBreadcrumb[] = [
    {
        index: true,
        element: Loadable(HomePageContainer),
        breadcrumb: "Naslovnica",
    },
    {
        path: "authenticate",
        element: Loadable(Authentication),
    },
    {
        path: "registracija/odabir",
        element: Loadable(ChooseSubjectUserContainer),
    },
    {
        path: "registracija",
        element: Loadable(RegistrationContainer),
    },
    {
        path: "verify-email",
        element: Loadable(VerifyEmailContainer),
    },
    {
        path: "prijava",
        element: Loadable(LoginContainer),
    },
    {
        path: "oglasi",
        element: Loadable(PetAdContainer),
        breadcrumb: "Oglasi",
    },
    {
        path: "oglasi/detalji",
        element: Loadable(AdDetailsContainer),
        breadcrumb: "Detalji oglasa",
    },
    {
        path: "oglasi/detalji/profil",
        element: Loadable(UserDetailsContainer),
        breadcrumb: "Detalji korisnika",
    },
    {
        path: "organizacije",
        element: Loadable(BusinessUsersContainer),
        breadcrumb: "Organizacije",
    },
    {
        path: "uvjeti",
        element: Loadable(PravilaPlatformeContainer),
        breadcrumb: "Uvjeti platforme",
    },
];