import { lazy } from "react";
import { Loadable } from "./Loadable";
import { RouteObjectWithBreadcrumb } from "./routeTypes";

const UsersOverviewContainer = lazy(() =>
    import("../features/users/UsersOverviewContainer").then((module) => ({
        default: module.UsersOverviewContainer,
    }))
);

const UserDetailsContainer = lazy(() =>
    import("../features/users/UserDetailsContainer").then((module) => ({
        default: module.UserDetailsContainer,
    }))
);

const EditAdContainer = lazy(() =>
    import("../features/pet-ads/EditAdContainer").then((module) => ({
        default: module.EditAdContainer,
    }))
);

const NewAdContainer = lazy(() =>
    import("../features/pet-ads/NewAdContainer").then((module) => ({
        default: module.NewAdContainer,
    }))
);

const NotificationContainer = lazy(() =>
    import("../features/notifications/NotificationContainer").then(
        (module) => ({
            default: module.NotificationContainer,
        })
    )
);

const CompleteProfileContainer = lazy(() =>
    import("../features/authentication/CompleteProfileContainer").then(
        (module) => ({
            default: module.CompleteProfileContainer,
        })
    )
);

const AdminDashboardContainer = lazy(() =>
    import("../features/admin/AdminDashboardContainer").then((module) => ({
        default: module.AdminDashboardContainer,
    }))
);

const AdoptionsRequestContainer = lazy(() =>
    import("../features/adoptions/AdoptionsRequestContainer").then(
        (module) => ({
            default: module.AdoptionsRequestContainer,
        })
    )
);

const AdoptionRequestContainer = lazy(() =>
    import("../features/adoptions/AdoptionRequestContainer").then(
        (module) => ({
            default: module.AdoptionRequestContainer,
        })
    )
);

const PdfSigner = lazy(() =>
    import("../features/contracts/components/PdfSign")
);

const VolunteerApplicationContainer = lazy(() =>
    import("../features/volunteering/VolunteerApplicationContainer").then(
        (module) => ({
            default: module.VolunteerApplicationContainer,
        })
    )
);

const VolunteerApplicationsContainer = lazy(() =>
    import("../features/volunteering/VolunteerApplicationsContainer").then(
        (module) => ({
            default: module.VolunteerApplicationsContainer,
        })
    )
);

const InquiryContainer = lazy(() =>
    import("../features/inquiry/InquiryContainer").then((module) => ({
        default: module.InquiryContainer,
    }))
);

const PetAdContactsContainer = lazy(() =>
    import("../features/pet-ad-contacts/PetAdContactContainer").then(
        (module) => ({
            default: module.PetAdContactsContainer,
        })
    )
);

const PetAdContactDetailContainer = lazy(() =>
    import("../features/pet-ad-contacts/PetAdContactDetailContainer").then(
        (module) => ({
            default: module.PetAdContactDetailContainer,
        })
    )
);

export const protectedRoutes: RouteObjectWithBreadcrumb[] = [
    {
        path: "korisnici",
        element: Loadable(UsersOverviewContainer),
        breadcrumb: "Korisnici",
        uloge: [1, 3],
    },
    {
        path: "korisnici/detalji",
        element: Loadable(UserDetailsContainer),
        breadcrumb: "Detalji korisnika",
        uloge: [1, 3],
    },
    {
        path: "profil",
        element: Loadable(UserDetailsContainer),
        breadcrumb: "Detalji korisnika",
        uloge: [2],
    },
    {
        path: "contacts/profil",
        element: Loadable(UserDetailsContainer),
        breadcrumb: "Detalji korisnika",
        uloge: [2],
    },
    {
        path: "organizacije/profil",
        element: Loadable(UserDetailsContainer),
        breadcrumb: "Detalji korisnika",
        uloge: [2],
    },
    {
        path: "zahtjevi/profil",
        element: Loadable(UserDetailsContainer),
        breadcrumb: "Detalji korisnika",
        uloge: [2],
    },
    {
        path: "oglasi/profil",
        element: Loadable(UserDetailsContainer),
        breadcrumb: "Detalji korisnika",
        uloge: [2],
    },
    {
        path: "prijave-za-volontiranje/profil",
        element: Loadable(UserDetailsContainer),
        breadcrumb: "Detalji korisnika",
        uloge: [2],
    },
    {
        path: "prijava-volontiranje/profil",
        element: Loadable(UserDetailsContainer),
        breadcrumb: "Detalji korisnika",
        uloge: [2],
    },
    {
        path: "oglasi/uredi",
        element: Loadable(EditAdContainer),
        breadcrumb: "Uredi oglas",
        uloge: [1, 2, 3],
    },
    {
        path: "oglasi/dodaj",
        element: Loadable(NewAdContainer),
        breadcrumb: "Dodaj oglas",
        uloge: [1, 2, 3],
    },
    {
        path: "notifikacije",
        element: Loadable(NotificationContainer),
        breadcrumb: "Notifikacije",
        uloge: [1, 2, 3],
    },
    {
        path: "dovrsi",
        element: Loadable(CompleteProfileContainer),
        breadcrumb: "Dovrši profil",
        uloge: [4],
    },
    {
        path: "nadzor",
        element: Loadable(AdminDashboardContainer),
        breadcrumb: "Nadzor i upravljanje",
        uloge: [1],
    },
    {
        path: "zahtjevi",
        element: Loadable(AdoptionsRequestContainer),
        breadcrumb: "Zahtjevi za udomljavanjem",
        uloge: [1, 2, 3],
    },
    {
        path: "zahtjevi/posalji",
        element: Loadable(AdoptionRequestContainer),
        breadcrumb: "Pošalji zahtjev za udomljavanje",
        uloge: [1, 2, 3],
    },
    {
        path: "zahtjevi/detalji",
        element: Loadable(AdoptionRequestContainer),
        breadcrumb: "Detalji",
        uloge: [1, 2, 3],
    },
    {
        path: "sign-pdf",
        element: Loadable(PdfSigner),
        breadcrumb: "Potpiši dokument",
        uloge: [1, 2, 3],
    },
    {
        path: "prijava-volontiranje",
        element: Loadable(VolunteerApplicationContainer),
        breadcrumb: "Prijava za volontiranje",
        uloge: [1, 2, 3],
    },
    {
        path: "prijave-za-volontiranje",
        element: Loadable(VolunteerApplicationsContainer),
        breadcrumb: "Pregled prijava za volontiranje",
        uloge: [1, 2, 3],
    },
    {
        path: "prijave-za-volontiranje/detalji-prijave",
        element: Loadable(VolunteerApplicationContainer),
        breadcrumb: "Detalji prijave",
        uloge: [1, 2, 3],
    },
    {
        path: "upiti",
        element: Loadable(InquiryContainer),
        breadcrumb: "Upiti",
    },
    {
        path: "contacts",
        element: Loadable(PetAdContactsContainer),
        breadcrumb: "Razgovori",
    },
    {
        path: "contacts/details",
        element: Loadable(PetAdContactDetailContainer),
        breadcrumb: "Detalji razgovora",
    },
];