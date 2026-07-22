import { Avatar, Button, Space, Tag, Typography } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { ActivityIcon, Crown, EllipsisVertical, ShieldCheck, UserRound } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AppModal } from "../../../../reusable/AppModal";
import { formatDate } from "../../../../utils/dateUtils";
import { getImage } from "../../../../utils/urlUtils";
import { useUserMutations } from "../../hooks/useUserMutations";
import style from "../../style/UsersOverview.module.css";
import { UsersResponse } from "../../types/response-types";
import { getTagColorByStatusId } from "../../../../utils/uiUtils/styling";
import { AccountStatus } from "../../../../enums/userEnums";

type UsersTableVariant = "overview" | "suspended";

interface Props {
    data: UsersResponse[];
    refetch?: () => void;
    isLoading?: boolean;
    onOpenUserAds?: (userId: number) => void;
    variant?: UsersTableVariant;
}

export const UsersOverviewTable = ({ data, refetch, isLoading, onOpenUserAds, variant }: Props) => {
    const { t } = useTranslation("users");
    const navigate = useNavigate();
    const { changeStatus, changeStatusPending } = useUserMutations();
    const [visibleModal, setVisibleModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);


    const handleStatusChange = async () => {
        if (!selectedUserId) return;
        await changeStatus({ statusId: AccountStatus.Aktivan, userId: selectedUserId });
        setVisibleModal(false);
        setSelectedUserId(null);
        refetch?.();
    };

    const getRoleTag = (roleName?: string) => {
        const isAdmin = roleName?.toLowerCase().includes("admin");
        const isModerator = roleName?.toLowerCase().includes("moderator");

        return (
            <Tag
                bordered={false}
                className={isAdmin ? style.roleAdmin : isModerator ? style.roleModerator : style.roleUser}
                icon={isAdmin ? <Crown size={14} /> : isModerator ? <ShieldCheck size={14} /> : <UserRound size={14} />}
            >
                {roleName}
            </Tag>
        );
    };

    const columns: ColumnsType<UsersResponse> = [
        {
            title: t("overview.table.columns.user"),
            dataIndex: "firstName",
            key: "firstName",
            render: (_, record) => (
                <Space size={12}>
                    <Avatar size={42} src={getImage(record.profilePictureUrl)} />
                    <Space direction="vertical" size={0}>
                        <Typography.Text strong>
                            {record.firstName} {record.lastName ?? ""}
                        </Typography.Text>
                        <Typography.Text type="secondary" className={style.emailText}>
                            {record.email}
                        </Typography.Text>
                    </Space>
                </Space>
            ),
        },
        {
            title: t("overview.table.columns.username"),
            dataIndex: "username",
            key: "username",
        },
        {
            title: t("overview.table.columns.role"),
            dataIndex: "roleName",
            key: "roleName",
            render: (_, record) => getRoleTag(record.roleName),
        },
        {
            title: t("overview.table.columns.status"),
            dataIndex: "status",
            key: "status",
            render: (_, record) => {
                return (
                    <Tag color={getTagColorByStatusId(record.statusId)} bordered={false}>
                        {record.status}
                    </Tag>
                );
            },
        },
        {
            title: t("overview.table.columns.registrationDate"),
            dataIndex: "registrationDate",
            key: "registrationDate",
            render: (_, record) => formatDate(record.registrationDate),
        },
        //admin dashboard
        ...(variant === "suspended"
            ? [
                {
                    title: t("overview.table.columns.suspensionReason"),
                    dataIndex: "reason",
                    key: "reason",
                },
                {
                    title: t("overview.table.columns.ads"),
                    key: "viewAds",
                    render: (_: any, record: UsersResponse) => (
                        <Button type="primary" size="large" onClick={() => onOpenUserAds?.(record.userId)}>
                            {t("overview.table.viewAdsButton")}
                        </Button>
                    ),
                },
                {
                    title: t("overview.table.columns.activate"),
                    dataIndex: "statusId",
                    key: "statusId",
                    render: (_: any, record: UsersResponse) => (
                        <Button
                            onClick={() => {
                                setSelectedUserId(record.userId);
                                setVisibleModal(true);
                            }}
                            type="default"
                        >
                            {t("overview.table.reactivateButton")}
                        </Button>
                    ),
                },
            ]
            : []),
        {
            title: t("overview.table.columns.actions"),
            key: "actions",
            align: "center",
            render: (_, record) => (
                <Button
                    icon={<EllipsisVertical size={18} />}
                    onClick={() => navigate("/korisnici/detalji", { state: { userId: record.userId } })}
                >
                    {t("overview.table.detailsButton")}
                </Button>
            ),
        },
    ];

    return (
        <>
            <Table
                rowKey="userId"
                dataSource={data}
                columns={columns}
                loading={isLoading}
                scroll={{ x: 1000 }}
                pagination={false}
            />
            <AppModal
                open={visibleModal}
                title={t("overview.table.reactivationModal.title")}
                description={t("overview.table.reactivationModal.description")}
                icon={<ActivityIcon size={24} />}
                onCancel={() => {
                    setVisibleModal(false);
                    setSelectedUserId(null);
                }}
                confirmText={t("overview.table.reactivationModal.confirmButton")}
                cancelText={t("overview.table.reactivationModal.cancelButton")}
                loading={changeStatusPending}
                onConfirm={handleStatusChange}
            />

        </>
    );
}