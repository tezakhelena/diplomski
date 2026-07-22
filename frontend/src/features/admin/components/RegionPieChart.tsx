import { Pie } from "@ant-design/charts";
import { Card, Empty, Typography } from "antd";
import { useTranslation } from "react-i18next";
import style from "../style/AdminDashboard.module.css";
import { UniversalStatisticsResponse } from "../types/response-types";

interface RegionPieChartProps { data?: UniversalStatisticsResponse[]; title: string; loading: boolean; }

export const RegionPieChart = ({ data, title, loading }: RegionPieChartProps) => {
    const { t } = useTranslation('admin');
    const config = {
        data: data ?? [], angleField: "count", colorField: "label", innerRadius: 0.6,
        label: { text: "count", style: { fontWeight: "bold" } },
        legend: { position: "right" as const },
        style: { stroke: "#fff", inset: 1, radius: 10 },
        interaction: { elementHighlight: true },
    };

    return (
        <Card bordered={false} loading={loading}>
            <Typography.Title level={5} className={style.chartTitle}>{title}</Typography.Title>
            {data?.length ? <Pie {...config} /> : <Empty description={t("admin.dashboard.charts.noData")} />}
        </Card>
    );
};