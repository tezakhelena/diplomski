import { Col, Flex, Row } from "antd";
import {
    CalendarDays, CircleHelp, CircleUserRound, Clock3, IdCard,
    KeyRound, Mail, MapPinHouse, Phone,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import useKorisnik from "../../../../hooks/useKorisnik";
import { RootState } from "../../../../redux/store";
import { InfoItem } from "../../../../reusable/two-column-page/InfoItem";
import { UserDetailsResponse } from "../../types/response-types";
import { formatDate, formatMomentDate } from "../../../../utils/dateUtils";

interface Props {
    detaljiKorisnika: UserDetailsResponse;
}

export const UserBasicData = ({ detaljiKorisnika }: Props) => {
    const { t } = useTranslation("users");
    const korisnik = useKorisnik();
    const auth = useSelector((state: RootState) => state.auth);

    const sameUser = detaljiKorisnika?.userId === auth?.userId;
    const showAdminData = korisnik.isAdmin() || sameUser;

    const leftColItems = [
        { icon: <CalendarDays size={19} />, label: t("details.basicData.accountCreationDate"), value: formatDate(detaljiKorisnika?.registrationDate) },
        { icon: <CircleUserRound size={19} />, label: t("details.basicData.username"), value: detaljiKorisnika?.username },
        ...(showAdminData ? [{ icon: <Clock3 size={19} />, label: t("details.basicData.lastLogin"), value: detaljiKorisnika?.lastLogin ? formatMomentDate(detaljiKorisnika?.lastLogin) : t("details.basicData.neverLoggedIn") }] : []),
        ...(detaljiKorisnika?.contactVisible ? [{ icon: <Mail size={19} />, label: t("details.basicData.email"), value: detaljiKorisnika?.email }] : []),
        { icon: <MapPinHouse size={19} />, label: t("details.basicData.location"), value: `${detaljiKorisnika?.city}, ${detaljiKorisnika?.county}` }
    ];

    const rightColItems = [
        ...(showAdminData ? [{ icon: <IdCard size={19} />, label: t("details.basicData.userId"), value: detaljiKorisnika?.userId }] : []),
        ...(showAdminData ? [{ icon: <KeyRound size={19} />, label: t("details.basicData.role"), value: detaljiKorisnika?.role }] : []),
        { icon: <CircleHelp size={19} />, label: t("details.basicData.accountType"), value: detaljiKorisnika?.privateUser ? t("details.basicData.privateAccount") : t("details.basicData.businessAccount") },
        ...(detaljiKorisnika?.contactVisible ? [{ icon: <Phone size={19} />, label: t("details.basicData.phoneNumber"), value: detaljiKorisnika?.phoneNumber }] : [])
    ];

    return (
        <>
            <Row gutter={[36, 24]}>
                <Col xs={24} md={12}>
                    <Flex vertical gap={16}>
                        {leftColItems.map((item, index) => <InfoItem key={index} {...item} />)}
                    </Flex>
                </Col>
                <Col xs={24} md={12}>
                    <Flex vertical gap={16}>
                        {rightColItems.map((item, index) => <InfoItem key={index} {...item} />)}
                    </Flex>
                </Col>
            </Row>
        </>
    );
};