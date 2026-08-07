import { lazy } from "react";
import { Loadable } from "./Loadable";
import { RouteObjectWithBreadcrumb } from "./routeTypes";

import { HomePageContainer } from "../features/home-page/HomePageContainer";
import { ChooseSubjectUserContainer } from "../features/authentication/ChooseSubjectUserContainer";
import { RegistrationContainer } from "../features/authentication/RegistrationContainer";
import { VerifyEmailContainer } from "../features/verify-email/VerifyEmailContainer";
import { LoginContainer } from "../features/authentication/LoginContainer";
import { PetAdContainer } from "../features/pet-ads/PetAdContainer";
import { BusinessUsersContainer } from "../features/business-users/BusinessUsersContainer";
import { AdDetailsContainer } from "../features/pet-ads/AdDetailsContainer";
import { PravilaPlatformeContainer } from "../features/pravila-platforme/PravilaPlatformeContainer";

const Authentication = lazy(() =>
    import("../features/authentication/components/Authentication")
);

const UserDetailsContainer = lazy(() =>
    import("../features/users/UserDetailsContainer").then((module) => ({
        default: module.UserDetailsContainer,
    }))
);

export const publicRoutes: RouteObjectWithBreadcrumb[] = [
    {
        index: true,
        element: <HomePageContainer />,
        breadcrumb: "Naslovnica",
    },
    {
        path: "authenticate",
        element: Loadable(Authentication),
    },
    {
        path: "registracija/odabir",
        element: <ChooseSubjectUserContainer />,
    },
    {
        path: "registracija",
        element: <RegistrationContainer />,
    },
    {
        path: "verify-email",
        element: <VerifyEmailContainer />,
    },
    {
        path: "prijava",
        element: <LoginContainer />,
    },
    {
        path: "oglasi",
        element: <PetAdContainer />,
        breadcrumb: "Oglasi",
    },
    {
        path: "oglasi/detalji",
        element: <AdDetailsContainer />,
        breadcrumb: "Detalji oglasa",
    },
    {
        path: "oglasi/detalji/profil",
        element: Loadable(UserDetailsContainer),
        breadcrumb: "Detalji korisnika",
    },
    {
        path: "organizacije",
        element: <BusinessUsersContainer />,
        breadcrumb: "Organizacije",
    },
    {
        path: "uvjeti",
        element: <PravilaPlatformeContainer />,
        breadcrumb: "Uvjeti platforme",
    },
];