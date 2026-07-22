import { Avatar, Button, Space } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { EllipsisVertical } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { PetAdHistoryResponse } from "../../../admin/types/response-types";
import { formatDate } from "../../../../utils/dateUtils";
import { getImage } from "../../../../utils/urlUtils";

type PetAdsTableVariant = "blocked" | "reported";

interface Props {
    data?: PetAdHistoryResponse[];
    variant?: PetAdsTableVariant;
    loading?: boolean;
    activatingAdId?: number | null;
    onOpenReports?: (petAdId: number) => void;
    onActivateAd?: (petAdId: number) => void;
}

export const PetAdsTable = ({
    data,
    variant,
    activatingAdId,
    onOpenReports,
    onActivateAd,
    loading
}: Props) => {
    const { t } = useTranslation("petAd");
    const navigate = useNavigate();

    const isReportedVariant = variant === "reported";

    const columns: ColumnsType<PetAdHistoryResponse> = [
        {
            title: t("adminTable.columns.ad"),
            dataIndex: 'comment',
            key: 'comment',
            render: (_, record: PetAdHistoryResponse) => (
                <Space>
                    <Avatar src={getImage(record.primaryImage)} />
                    <span>{record.comment || record.generatedName}</span>
                </Space>
            ),
        },
        {
            title: isReportedVariant
                ? t("adminTable.columns.lastReceivedReport")
                : t("adminTable.columns.lastBlock"),
            dataIndex: 'latestChangeDate',
            key: 'latestChangeDate',
            render: (_, record: PetAdHistoryResponse) => formatDate(record.latestChangeDate),
        },
        ...(isReportedVariant
            ? [
                {
                    title: t("adminTable.columns.reportCount"),
                    dataIndex: 'blockCount',
                    key: 'blockCount',
                    render: (_: any, record: PetAdHistoryResponse) => (
                        <Button
                            onClick={() => onOpenReports?.(record.petAdId)}
                            danger
                            type="default"
                        >
                            {t("adminTable.reportCount", { count: record.blockCount })}
                        </Button>
                    ),
                },
            ]
            : [
                {
                    title: t("adminTable.columns.adAuthor"),
                    dataIndex: 'username',
                    key: 'username',
                },
                {
                    title: t("adminTable.columns.blockReason"),
                    dataIndex: 'reason',
                    key: 'reason',
                },
                {
                    title: t("adminTable.columns.activate"),
                    key: "activate",
                    render: (_: any, record: PetAdHistoryResponse) => {
                        const isAccountSuspended =
                            record.reason ===
                            t("adminTable.suspendedAccountReason");

                        return (
                            <Button
                                type="primary"
                                loading={activatingAdId === record.petAdId}
                                disabled={
                                    isAccountSuspended ||
                                    (activatingAdId != null &&
                                        activatingAdId !==
                                        record.petAdId)
                                }
                                title={isAccountSuspended ? t("adminTable.suspendedAccountTooltip") : undefined}
                                onClick={() =>
                                    void onActivateAd?.(
                                        record.petAdId
                                    )
                                }
                            >
                                {t("adminTable.activateButton")}
                            </Button>
                        );
                    },
                }
            ]),
        {
            key: 'actions',
            render: (_, record: PetAdHistoryResponse) => (
                <Button
                    icon={<EllipsisVertical size={18} />}
                    onClick={() => navigate(`/oglasi/detalji`, { state: { petAdId: record.petAdId } })}
                >{t("adminTable.detailsButton")}</Button>
            ),
        },
    ];

    return (
        <Table
            rowKey="petAdId"
            dataSource={data}
            pagination={{ pageSize: 4 }}
            columns={columns}
            scroll={{ x: "max-content" }}
            style={{ marginTop: '10px' }}
            loading={loading}
        />
    );
}