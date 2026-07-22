import { Button, Card, FormInstance, Space, Typography } from "antd";
import { Filter, Info, RefreshCcw, Search } from "lucide-react";
import React from "react";
import { AppForm } from "../AppForm";
import style from "../style/FilterPageLayout.module.css";

interface Props {
    form: FormInstance<any>;
    onFinish: () => void;
    clearFilters: () => void;
    resultCount?: number;
    resultLabel: string;
    children: React.ReactNode;
}

export const FilterCard = ({
    form,
    onFinish,
    clearFilters,
    resultCount = 0,
    resultLabel,
    children,
}: Props) => {

    const formActions = (
        <Space direction="vertical" className="app-full">
            <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                icon={<Search size={18} />}
            >
                Primijeni filtere
            </Button>

            <Button
                block
                size="large"
                icon={<RefreshCcw size={17} />}
                onClick={clearFilters}
            >
                Očisti filter
            </Button>
        </Space>
    )
    return (
        <Card bordered={false}>
            <Space direction="vertical" size={18} className="app-full">
                <Space className={style.cardHeader}>
                    <Filter size={20} />
                    <Typography.Text strong>Filteri</Typography.Text>
                </Space>

                <AppForm
                    form={form}
                    onFinish={onFinish}
                    className={style.filterForm}
                    actions={formActions}
                >
                    {children}
                </AppForm>
                <div className={style.resultBox}>
                    <Info size={20} />
                    <span>Pronađeno {resultCount} {resultLabel}</span>
                </div>
            </Space>
        </Card>
    );
};