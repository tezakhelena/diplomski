import { PetCategory } from "../enums/petEnums";
import { AdoptionProcessStatus, AdStatus, AttributeType, VolunteerStatus } from "../enums/processEnums";
import { AttributeResponse } from "../features/attributes/types/response-types";
import { PetAdDetailResponse, PetAdResponse } from "../features/pet-ads/types/response-types";
import { PetAdCardData } from "../features/pet-ads/types/view-types";
import { RouteObjectWithBreadcrumb } from "../routes/routeTypes";

export const categoryDescriptions: Record<number, string> = {
    [PetCategory.TraziSe]: "Tražim svog ljubimca",
    [PetCategory.Pronadjen]: "Našao/la sam ljubimca",
    [PetCategory.Napusten]: "Našao/la sam lutalicu"
};

export const importantStatuses = [
    AdoptionProcessStatus.ZahtjevOdobren,
    AdoptionProcessStatus.RezultatProcjeneUTijeku,
    AdoptionProcessStatus.UdomljavanjeOdobreno,
    AdoptionProcessStatus.PotpisivanjeUgovora,
    AdoptionProcessStatus.ProcesZavrsen
];

export const blockedStatuses = [
    AdoptionProcessStatus.ZahtjevOtkazan,
    AdoptionProcessStatus.ZahtjevOdbijen,
    AdoptionProcessStatus.UdomljavanjeOdobreno
]


export const getCategoryDescriptionById = (categoryId?: string | number): string | undefined => {
    const idAsNumber = Number(categoryId);
    return !isNaN(idAsNumber) ? categoryDescriptions[idAsNumber] : undefined;
};

export const getStatusMessage = (statusId: number) => {
    switch (statusId) {
        case AdoptionProcessStatus.ZahtjevOdobren: return "Ovom akcijom potvrđujete odobrenje zahtjeva za udomljavanje i nastavak s daljnjim koracima u procesu.";
        case AdoptionProcessStatus.ZahtjevOtkazan: return "Ovom akcijom ćete prekinuti proces udomljavanja. Drugom sudioniku će biti objašnjena vaša odluka, te će proces biti obustavljen.";
        case AdoptionProcessStatus.ZahtjevOdbijen: return "Ovom akcijom odbijate zahtjev za udomljavanje, čime se proces obustavlja. Molimo unesite razlog odbijanja.";
        case AdoptionProcessStatus.RezultatProcjeneUTijeku: return "Ovom akcijom potvrđujete da ste obavili razgovor. Nakon toga, slijedi Vaša procjena razgovora i donošenje odluke.";
        case AdoptionProcessStatus.UdomljavanjeOdobreno: return "Ovom akcijom odobravate udomljavanje ljubimca. Nakon toga, potrebno je potpisati ugovor.";
        case AdoptionProcessStatus.UdomljavanjeOdbijeno: return "Ovom akcijom odbijate udomljavanje ljubimca, čime se proces obustavlja.";
        case AdoptionProcessStatus.PotpisivanjeUgovora: return "Ovim korakom birate način potpisivanja ugovora (uživo ili online).";
        case AdoptionProcessStatus.ProcesZavrsen: return "Ovom akcijom potvrđujete da je ugovor uspješno potpisan i da završavate proces udomljavanja.";
        case VolunteerStatus.PrijavaPoslana: return "Ovom akcijom odobravate prijavu za volontiranje.";
        case VolunteerStatus.PrijavaPrihvacena: return "Ovom akcijom prihvaćate prijavu za volontiranje.";
        case VolunteerStatus.PrijavaOdbijena: return "Ovom akcijom odbijate prijavu za volontiranje.";
        default: return "Ovdje možete potvrditi vašu odluku o promjeni statusa.";
    }
};

export const filterAndOrderStatuses = (statusi?: AttributeResponse[]): AttributeResponse[] => {
    if (!statusi?.length) return [];
    return statusi
        .filter(status => importantStatuses.includes(Number(status.code)))
        .sort((a, b) => importantStatuses.indexOf(Number(a.code)) - importantStatuses.indexOf(Number(b.code)));
};

export const getSexAvatarConfig = (sex?: string): { text?: string } => {
    const sexConfigMap: Record<'M' | 'Ž' | 'N', { text?: string }> = {
        M: { text: 'Mužjak' },
        Ž: { text: 'Ženka' },
        N: { text: 'Nepoznato' },
    };

    return sexConfigMap[sex as 'M' | 'Ž' | 'N'] || sexConfigMap['N'];
};

export const getAdultAvatarConfig = (maturity?: string): { maturity?: string } => {
    const sexConfigMap: Record<'M' | 'O' | 'N', { maturity?: string }> = {
        M: { maturity: 'Mladunče' },
        O: { maturity: 'Odrasli' },
        N: { maturity: 'Nepoznato' },
    };

    return sexConfigMap[maturity as 'M' | 'O' | 'N'] || sexConfigMap['N'];
};

export const findCurrentRoute = (
    routes: RouteObjectWithBreadcrumb[],
    current: string
): RouteObjectWithBreadcrumb | undefined => {
    const normalizePath = (path?: string) =>
        path
            ?.replace(/^\/+/, "")
            .replace(/\/+$/, "") ?? "";

    const normalizedCurrent = normalizePath(current);

    for (const route of routes) {
        const normalizedRoutePath = normalizePath(route.path);

        if (route.index && normalizedCurrent === "") {
            return route;
        }

        if (normalizedRoutePath === normalizedCurrent) {
            return route;
        }

        if (route.children) {
            const childRoute = findCurrentRoute(
                route.children,
                normalizedCurrent
            );

            if (childRoute) {
                return childRoute;
            }
        }
    }

    return undefined;
};

export const getFirstPetImage = (pet?: PetAdDetailResponse) => {
    return (pet?.adPictures?.find(p => p.isFirst)?.url ?? pet?.adPictures?.[0]?.url);
}

export const mapToPetAdCard = (pet: PetAdResponse | PetAdDetailResponse): PetAdCardData => {
    const isDetail = 'adPictures' in pet;

    return {
        petAdId: pet.petAdId,
        primaryImage: isDetail
            ? (pet.adPictures?.find(p => p.isFirst)?.url ?? pet.adPictures?.[0]?.url)
            : (pet as PetAdResponse).primaryImage,
        county: isDetail ? (pet as PetAdDetailResponse).county : (pet as PetAdResponse).county,
        city: pet.city,
        gender: isDetail ? (pet as PetAdDetailResponse).petDetails?.gender : (pet as PetAdResponse).gender,
        maturity: isDetail ? (pet as PetAdDetailResponse).petDetails?.maturity : (pet as PetAdResponse).maturity,
        breed: isDetail ? (pet as PetAdDetailResponse).petDetails?.breed : (pet as PetAdResponse).breed,
        category: isDetail ? (pet as PetAdDetailResponse).category : (pet as PetAdResponse).category,
        categoryId: pet.categoryId,
        createdAt: pet.createdAt,
        generatedTitle: pet.generatedTitle,
        statusId: pet.statusId,
    };
};

export const AttributeTypeLabels: Record<number, string> = {
    [AttributeType.USER_STATUS]: "Status korisnika",
    [AttributeType.AD_STATUS]: "Status oglasa",
    [AttributeType.PET_STATUS]: "Status ljubimca",
    [AttributeType.AD_CATEGORIES]: "Kategorija oglasa",
    [AttributeType.PET_TYPE]: "Vrsta ljubimca",
    [AttributeType.ADOPTION_STATUS]: "Status udomljavanja",
    [AttributeType.VOLUNTEER_STATUS]: "Status volontiranja",
    [AttributeType.BUSINESS_TYPE]: "Tip poslovnog subjekta",
    [AttributeType.INQUIRY_TYPE]: "Tip upita",
    [AttributeType.VOLUNTEER_TYPE]: "Tip volontiranja",
    [AttributeType.BLOCK_REASON]: "Razlog blokiranja"
};

export const getAdStatusLabel = (statusId: number): string => {
    const labels: Record<number, string> = {
        [AdStatus.Aktivan]: "Oglas je aktivan",
        [AdStatus.Blokiran]: "Oglas je blokiran",
        [AdStatus.UspjesnoRjeseno]: "Uspješno riješeno",
        [AdStatus.UProvjeri]: "Oglas u provjeri zbog prijava",
        [AdStatus.UProcesuUdomljavanja]: "U procesu udomljavanja",
    };
    return labels[statusId] || "Nepoznato";
};

export type AlertBoxType = "success" | "error" | "warning" | "info";

export const getAdStatusColor = (statusId: number): AlertBoxType | undefined => {
    const colors: Record<number, AlertBoxType> = {
        [AdStatus.Aktivan]: "success",
        [AdStatus.Blokiran]: "error",
        [AdStatus.UspjesnoRjeseno]: "success",
        [AdStatus.UProvjeri]: "warning",
        [AdStatus.UProcesuUdomljavanja]: "info",
    };
    return colors[statusId] || undefined;
};