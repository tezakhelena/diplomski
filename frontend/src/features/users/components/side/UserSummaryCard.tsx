import { Avatar, Card, List, Space, Tag, Typography } from "antd";
import {
    CalendarDays,
    Eye,
    MailCheck,
    UserCheck,
} from "lucide-react";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { SectionTitle } from "../../../../reusable/two-column-page/SectionTitle";
import { UserDetailsResponse } from "../../types/response-types";
import { formatDate } from "../../../../utils/dateUtils";

interface Props {
    detaljiKorisnika: UserDetailsResponse;
}

type SummaryColor = "green" | "blue" | "orange" | "red" | "purple";

interface SummaryItem {
    key: string;
    icon: ReactNode;
    label: string;
    value: string;
    description: string;
    color: SummaryColor;
}

const iconStyles: Record<SummaryColor, { backgroundColor: string; color: string; }> = {
    green: {
        backgroundColor: "#dcfce7",
        color: "#16a34a",
    },
    blue: {
        backgroundColor: "#eff6ff",
        color: "#2563eb",
    },
    orange: {
        backgroundColor: "#fff7ed",
        color: "#ea580c",
    },
    red: {
        backgroundColor: "#fff1f2",
        color: "#e11d48",
    },
    purple: {
        backgroundColor: "#f0edff",
        color: "#5b4dff",
    },
};

export const UserSummaryCard = ({
    detaljiKorisnika,
}: Props) => {
    const { t } = useTranslation("users");

    const summaryItems: SummaryItem[] = [
        {
            key: "status",
            icon: <UserCheck size={20} />,
            label: t("details.summary.status.label"),
            value: detaljiKorisnika?.status || t("details.summary.unknown"),
            description: t("details.summary.status.description"),
            color: detaljiKorisnika?.status === "Aktivan" ? "green" : "red",
        },
        {
            key: "registration-date",
            icon: <CalendarDays size={20} />,
            label: t("details.summary.registrationDate.label"),
            value: formatDate(detaljiKorisnika?.registrationDate),
            description: t("details.summary.registrationDate.description"),
            color: "purple",
        },
        {
            key: "email-verification",
            icon: <MailCheck size={20} />,
            label: t("details.summary.emailVerification.label"),
            value: detaljiKorisnika?.emailVerified ? t("details.summary.emailVerification.verified") : t("details.summary.emailVerification.notVerified"),
            description: t("details.summary.emailVerification.description"),
            color: detaljiKorisnika?.emailVerified ? "green" : "red",
        },
        {
            key: "contact-visibility",
            icon: <Eye size={20} />,
            label: t("details.summary.contactVisibility.label"),
            value: detaljiKorisnika?.contactVisible ? t("details.summary.contactVisibility.visible") : t("details.summary.contactVisibility.hidden"),
            description: t("details.summary.contactVisibility.description"),
            color: detaljiKorisnika?.contactVisible ? "green" : "orange",
        },
    ];

    return (
        <Card
            title={
                <SectionTitle icon={<UserCheck size={20} />}>
                    {t("details.summary.title")}
                </SectionTitle>
            }
        >
            <List
                split
                dataSource={summaryItems}
                renderItem={(item) => (
                    <List.Item key={item.key}>
                        <List.Item.Meta
                            avatar={
                                <Avatar
                                    shape="square"
                                    size={44}
                                    icon={item.icon}
                                    style={{
                                        ...iconStyles[item.color],
                                        borderRadius: 12,
                                    }}
                                />
                            }
                            title={
                                <Space wrap size={8}>
                                    <Typography.Text strong>
                                        {item.label}
                                    </Typography.Text>

                                    <Tag
                                        color={item.color === "purple" ? "purple" : item.color}
                                        bordered={false}
                                    >
                                        {item.value}
                                    </Tag>
                                </Space>
                            }
                            description={item.description}
                        />
                    </List.Item>
                )}
            />
        </Card>
    );
};