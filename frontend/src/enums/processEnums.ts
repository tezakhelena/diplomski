export enum AdStatus {
    Aktivan = 21,
    Blokiran = 22,
    UspjesnoRjeseno = 23,
    UProvjeri = 24,
    UProcesuUdomljavanja = 25,
}

export enum AdoptionProcessStatus {
    ZahtjevZaprimljen = 61,
    URazmatranju = 62,
    ZahtjevOdobren = 63,
    ZahtjevOtkazan = 64,
    ZahtjevOdbijen = 65,
    RezultatProcjeneUTijeku = 66,
    UdomljavanjeOdobreno = 67,
    UdomljavanjeOdbijeno = 68,
    PotpisivanjeUgovora = 69,
    ProcesZavrsen = 70,
}

export enum VolunteerStatus {
    PrijavaPoslana = 71,
    PrijavaPrihvacena = 72,
    PrijavaOdbijena = 73,
}

export enum AttributeType {
    USER_STATUS = 1,
    AD_STATUS = 2,
    PET_STATUS = 3,
    AD_CATEGORIES = 4,
    PET_TYPE = 5,
    ADOPTION_STATUS = 6,
    VOLUNTEER_STATUS = 7,
    BUSINESS_TYPE = 8,
    INQUIRY_TYPE = 9,
    VOLUNTEER_TYPE = 10,
    BLOCK_REASON = 11
}