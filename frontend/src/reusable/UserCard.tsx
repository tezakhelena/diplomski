import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Empty, Flex, Space, Tag, Typography } from "antd";
import { Globe, Mail, Phone, User, UserCircle, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserDetails } from "../features/users/hooks/useUsersQuery";
import useKorisnik from "../hooks/useKorisnik";
import style from "./style/UserCard.module.css";
import { SectionTitle } from "./two-column-page/SectionTitle";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getImage } from "../utils/urlUtils";
import { BusinessType } from "../enums/userEnums";

interface Props {
    userId?: number;
    title?: string;
    footer?: ReactNode;
    organizationView?: boolean;
    navigateTo?: string;
    hideProfileButton?: boolean;
    showVolunteerButton?: boolean;
}

interface ContactItem {
    key: string;
    icon: ReactNode;
    value?: string;
}

export const UserCard = ({
    userId,
    title,
    footer,
    organizationView = false,
    navigateTo,
    hideProfileButton = false,
    showVolunteerButton,
}: Props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const korisnik = useKorisnik();
    const { userDetails: user } = useUserDetails(userId);
    const { userId: currentUserId } = useSelector((state: RootState) => state.auth)

    if (!userId) {
        return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Korisnik nije dostupan." />;
    }

    if (!user) {
        return <Typography.Text type="secondary">Podaci o korisniku nisu dostupni.</Typography.Text>;
    }

    const isBusinessUser = !user.privateUser || Boolean(user.businessTypeId);
    const isShelter = user.businessTypeId === BusinessType.UdrugaAzil;
    const isNotSelf = user.userId !== currentUserId;
    const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ") || user.username;
    const displayedUserType = isBusinessUser ? user.businessUserType : user.role;
    const canViewContactInfo = isBusinessUser || user.contactVisible === true || korisnik.isAdmin();

    const canVolunteer = isShelter && isNotSelf && showVolunteerButton && !korisnik.isAdmin();

    const contactItems: ContactItem[] = [
        { key: "email", icon: <Mail size={17} />, value: user.email },
        { key: "phone", icon: <Phone size={17} />, value: user.phoneNumber },
        { key: "website", icon: <Globe size={17} />, value: user.website },
        { key: "businessType", icon: <UserCircle size={17} />, value: user.businessUserType },
    ].filter((item) => Boolean(item.value));

    const openProfile = () => {
        if (!navigateTo) return;

        navigate(navigateTo, {
            state: {
                userId: user.userId,
                returnLocation: {
                    pathname: location.pathname,
                    search: location.search,
                    hash: location.hash,
                    state: location.state,
                },
            },
        });
    };

    const openVolunteer = () => {
        navigate("/prijava-volontiranje", { state: { poduzeceId: user.userId } });
    };

    return (
        <Card
            bordered={false}
            hoverable={organizationView}
            title={title &&
                <SectionTitle icon={<User />}>
                    {title}
                </SectionTitle>
            }
        >
            <Space direction="vertical" size={16} className="app-full">
                {organizationView && isBusinessUser ? (
                    <Space direction="vertical" size={14} className="app-full">
                        <Flex align="center" justify="center" className={style.cardCover}>
                            <Avatar src={getImage(user.profilePictureUrl)} icon={<UserRound size={34} />} size={96} className={style.organizationAvatar} />
                        </Flex>

                        <Space direction="vertical" size={6} align="center" className="app-full">
                            <Typography.Title level={4} className={style.organizationName}>{fullName}</Typography.Title>

                            {user.username && <Typography.Text type="secondary">@{user.username}</Typography.Text>}

                            {displayedUserType && <Tag bordered={false} className={style.userTag}>{displayedUserType}</Tag>}
                        </Space>
                    </Space>
                ) : (
                    <Space size={14} align="center">
                        <Avatar src={getImage(user.profilePictureUrl)} size={64} icon={<UserOutlined />} />

                        <Space direction="vertical" size={4}>
                            <Typography.Text strong className={style.userName}>{fullName}</Typography.Text>

                            {user.username && <Typography.Text type="secondary">@{user.username}</Typography.Text>}

                            {displayedUserType && <Tag bordered={false} className={style.userTag}>{displayedUserType}</Tag>}
                        </Space>
                    </Space>
                )}

                {canViewContactInfo && contactItems.length > 0 && (
                    <Space direction="vertical" size={11} className={style.info}>
                        {contactItems.map((item) => (
                            <Space size={9} className={style.infoRow} key={item.key}>
                                {item.icon}
                                <Typography.Text ellipsis>{item.value}</Typography.Text>
                            </Space>
                        ))}
                    </Space>
                )}

                {footer}

                {navigateTo && !hideProfileButton && (
                    <Space direction="vertical" size={10} className="app-full">
                        <Button block icon={<User size={17} />} onClick={openProfile}>Pogledaj profil</Button>
                        {canVolunteer && <Button block type="primary" onClick={openVolunteer}>Volontiraj</Button>}
                    </Space>
                )}
            </Space>
        </Card>
    );
};