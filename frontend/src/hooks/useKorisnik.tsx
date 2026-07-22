import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const useKorisnik = () => {

    const { roleId: idRole, privateUser } = useSelector((state: RootState) => state.auth);

    const hasRole = (roleId: number): boolean => {
        return (idRole === roleId);
    };

    return {
        isAdmin: (): boolean => hasRole(1),
        trebaDovrsitiProfil: (): boolean => !hasRole(4),
        isFizickaOsoba: () => privateUser === true,
        isPoslovniKorisnik: () => privateUser === false,
        hasRole,
    };
};

export default useKorisnik;
