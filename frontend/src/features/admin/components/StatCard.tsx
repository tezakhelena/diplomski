import { Card, Statistic, StatisticProps, Typography } from "antd";
import style from "../style/AdminDashboard.module.css";

interface StatCardProps {
    title: string;
    value?: number;
    icon: React.ReactNode;
    formatter?: StatisticProps["formatter"];
    loading: boolean;
}

export const StatCard = ({
    title,
    value = 0,
    icon,
    formatter,
    loading,
}: StatCardProps) => {
    return (
        <Card
            bordered={false}
            hoverable
            loading={loading}
        >
            <div className={style.statIcon}>
                {icon}
            </div>

            <Statistic
                value={value}
                formatter={formatter}
            />

            <Typography.Text>
                {title}
            </Typography.Text>
        </Card>
    );
};