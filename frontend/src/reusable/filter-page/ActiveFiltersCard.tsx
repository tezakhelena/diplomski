import { Button, Card, Space, Tag, Typography } from "antd";
import { Filter, Trash2, X } from "lucide-react";
import style from "../style/FilterPageLayout.module.css";

export interface ActiveFilterConfig {
    label: string;
    getValueLabel?: (value: string | number) => string;
}

interface Props {
    filters?: Record<string, any>;
    config: Record<string, ActiveFilterConfig>;
    removeFilter: (filterName: string) => void;
    clearFilters: () => void;
    infoText?: string;
}

export const ActiveFiltersCard = ({
    filters,
    config,
    removeFilter,
    clearFilters,
    infoText = "Aktivni filteri su primijenjeni na prikazane rezultate.",
}: Props) => {
    const activeFilters = Object.entries(filters ?? {}).filter(
        ([_, value]) => value !== undefined && value !== null && value !== ""
    );

    const getValueLabel = (key: string, value: string | number) => {
        return config[key]?.getValueLabel?.(value) ?? String(value);
    };

    return (
        <Card bordered={false}>
            <Space direction="vertical" size={16} className="app-full">
                <div className={style.activeFiltersHeader}>
                    <Space>
                        <Filter size={19} />
                        <Typography.Text strong>Aktivni filteri</Typography.Text>
                    </Space>

                    <span>{activeFilters.length}</span>
                </div>

                {activeFilters.length === 0 ? (
                    <Typography.Text type="secondary">
                        Trenutno nema aktivnih filtera.
                    </Typography.Text>
                ) : (
                    <>
                        <Space direction="vertical" size={12} className="app-full">
                            {activeFilters.map(([key, value]) => (
                                <div className={style.activeFilterBox} key={key}>
                                    <div className={style.activeFilterTitle}>
                                        <Typography.Text strong>
                                            {config[key]?.label ?? key}
                                        </Typography.Text>

                                        <button
                                            type="button"
                                            onClick={() => removeFilter(key)}
                                            className={style.removeFilterButton}
                                        >
                                            <X size={15} />
                                        </button>
                                    </div>

                                    <Tag className={style.activeFilterTag}>
                                        {getValueLabel(key, value as string | number)}
                                    </Tag>
                                </div>
                            ))}
                        </Space>

                        <Button
                            block
                            icon={<Trash2 size={17} />}
                            onClick={clearFilters}
                        >
                            Očisti sve filtere
                        </Button>
                    </>
                )}

                <div className={style.infoBox}>
                    {infoText}
                </div>
            </Space>
        </Card>
    );
};