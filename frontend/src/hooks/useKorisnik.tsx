import { useSelector } from "react-redux";
import { Roles } from "../enums/userEnums";
import { RootState } from "../redux/store";

const useKorisnik = () => {
    const { roleId, privateUser } = useSelector((state: RootState) => state.auth);

    const hasRole = (requiredRoleId: number): boolean => roleId === requiredRoleId;
    const trebaDovrsitiProfil = (): boolean => hasRole(Roles.NepotpuniProfil);

    return {
        isAdmin: (): boolean => hasRole(Roles.Admin),
        trebaDovrsitiProfil,
        isFizickaOsoba: (): boolean => privateUser === true,
        isPoslovniKorisnik: (): boolean => privateUser === false,
        hasRole,
    };
};

export default useKorisnik;