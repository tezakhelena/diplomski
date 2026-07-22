import { AlertTriangle, BellRing, Bird, Cat, CheckCircle, Dog, Eye, FileCheck, FileSignature, FileText, Flag, Handshake, HeartHandshake, Lock, MessageCircleMore, MessageCircleQuestion, MessageCircleWarning, MessageSquareText, PawPrint, Rabbit, ShieldAlert, UserCheck, UserCog, UserPlus, UserX } from "lucide-react";
import { PetType } from "../../enums/petEnums";
import { NotificationType } from "../../enums/notificationEnums";
import { AdoptionProcessStatus } from "../../enums/processEnums";

const PROCESS_ICON_COLOR = "#1d39c4";
export const ICON_COLOR = "#5b4dff";
const WARN_COLOR = "#ff4d4f";

export const petTypeIcons: Record<number, JSX.Element> = {
    [PetType.Pas]: <Dog color={PROCESS_ICON_COLOR} />,
    [PetType.Macka]: <Cat color={PROCESS_ICON_COLOR} />,
    [PetType.Ptica]: <Bird color={PROCESS_ICON_COLOR} />,
    [PetType.Ostalo]: <Rabbit color={PROCESS_ICON_COLOR} />,
};

export const petTypeIconsHomePage: Record<number, JSX.Element> = {
    [PetType.Pas]: <Dog size={30} />,
    [PetType.Macka]: <Cat size={30} />,
    [PetType.Ptica]: <Bird size={30} />,
    [PetType.Ostalo]: <Rabbit size={30} />,
};

export const notificationIcon: Record<number, JSX.Element> = {
    [NotificationType.Komentar]: <MessageCircleMore color={ICON_COLOR} />,
    [NotificationType.Pregledi]: <Eye color={ICON_COLOR} />,
    [NotificationType.Obavijest]: <BellRing color={ICON_COLOR} />,
    [NotificationType.PrijavljenOglas]: <Flag color={ICON_COLOR} />,

    [NotificationType.BlokiranOglas]: <Lock color={WARN_COLOR} />,
    [NotificationType.KrsenjePravilaPlatforme]: <AlertTriangle color={WARN_COLOR} />,
    [NotificationType.ZabrinutostZaDobrobitZivotinja]: <ShieldAlert color={WARN_COLOR} />,
    [NotificationType.SigurnosniProblemi]: <ShieldAlert color={WARN_COLOR} />,

    [NotificationType.Registracija]: <UserPlus color={ICON_COLOR} />,
    [NotificationType.VerifikacijaMaila]: <CheckCircle color={ICON_COLOR} />,
    [NotificationType.SlicniOglas]: <MessageCircleWarning color={ICON_COLOR} />,
    [NotificationType.KorisnikZupanija]: <PawPrint color={ICON_COLOR} />,

    [NotificationType.ObustavljenRacun]: <AlertTriangle color={WARN_COLOR} />,
    [NotificationType.PonovnoAktiviranRacun]: <UserCheck color={ICON_COLOR} />,

    [NotificationType.ZahtjevZaUdomljavanjem]: <HeartHandshake color={ICON_COLOR} />,
    [NotificationType.ZahtjevURazmatranju]: <Eye color={ICON_COLOR} />,
    [NotificationType.ObavljenaProcjena]: <FileText color={ICON_COLOR} />,
    [NotificationType.ZahtjevOdobren]: <CheckCircle color={ICON_COLOR} />,
    [NotificationType.ZahtjevOdbijen]: <UserX color={WARN_COLOR} />,
    [NotificationType.ZahtjevOtkazan]: <UserX color={WARN_COLOR} />,

    [NotificationType.UdomljavanjeOdobreno]: <CheckCircle color={ICON_COLOR} />,
    [NotificationType.UdomljavanjeOdbijeno]: <UserX color={WARN_COLOR} />,
    [NotificationType.PotpisivanjeUgovora]: <FileSignature color={ICON_COLOR} />,
    [NotificationType.ZavrsenProces]: <PawPrint color={ICON_COLOR} />,
    [NotificationType.PotpisivanjeUzivo]: <FileSignature color={ICON_COLOR} />,

    [NotificationType.OdgovorNaUpit]: <MessageCircleQuestion color={ICON_COLOR} />,
    [NotificationType.PoslanUpit]: <MessageSquareText color={ICON_COLOR} />
};

export const adoptionProcessIcon: Record<number, JSX.Element> = {
    [AdoptionProcessStatus.ZahtjevOdobren]: <FileCheck color={PROCESS_ICON_COLOR} />,
    [AdoptionProcessStatus.RezultatProcjeneUTijeku]: <UserCog color={PROCESS_ICON_COLOR} />,
    [AdoptionProcessStatus.UdomljavanjeOdobreno]: <Handshake color={PROCESS_ICON_COLOR} />,
    [AdoptionProcessStatus.PotpisivanjeUgovora]: <FileSignature color={PROCESS_ICON_COLOR} />,
    [AdoptionProcessStatus.ProcesZavrsen]: <UserCheck color={PROCESS_ICON_COLOR} />,
};

export const getNotificationIconByTypeId = (typeId?: number) => {
    if (typeId === undefined || typeId === null) return null;
    return notificationIcon[typeId] ?? <BellRing color={ICON_COLOR} />;
};

export const getAdoptionProcessIconByTypeId = (typeId?: number) => (typeId ? adoptionProcessIcon[typeId] : null);
