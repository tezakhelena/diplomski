import { PetCategory } from "../../enums/petEnums";
import { AdoptionProcessStatus, VolunteerStatus } from "../../enums/processEnums";
import { AccountStatus } from "../../enums/userEnums";

export const tagStatusMapping: Record<number, string | undefined> = {
    [PetCategory.TraziSe]: "orange",
    [PetCategory.Pronadjen]: "green",
    [PetCategory.Napusten]: "blue",
    [AdoptionProcessStatus.ZahtjevZaprimljen]: "blue",
    [AdoptionProcessStatus.URazmatranju]: "orange",
    [AdoptionProcessStatus.ZahtjevOdobren]: "green",
    [AdoptionProcessStatus.ZahtjevOtkazan]: "red",
    [AdoptionProcessStatus.ZahtjevOdbijen]: "red",
    [AdoptionProcessStatus.RezultatProcjeneUTijeku]: "orange",
    [AdoptionProcessStatus.UdomljavanjeOdobreno]: "green",
    [AdoptionProcessStatus.UdomljavanjeOdbijeno]: "red",
    [AdoptionProcessStatus.PotpisivanjeUgovora]: "purple",
    [AdoptionProcessStatus.ProcesZavrsen]: "green",
    [VolunteerStatus.PrijavaPoslana]: "blue",
    [VolunteerStatus.PrijavaPrihvacena]: "green",
    [VolunteerStatus.PrijavaOdbijena]: "red",
    [AccountStatus.Aktivan]: "green",
    [AccountStatus.UProvjeri]: "gold",
    [AccountStatus.Obustavljen]: "red"
};

export const getTagColorByStatusId = (statusId?: number): string | undefined => (statusId ? tagStatusMapping[statusId] : undefined);

export const getTagColorForSign = (signedStatus?: number) => {
    if (signedStatus === 0 || signedStatus === 1) {
        return "red";
    } else {
        return "green";
    }
}