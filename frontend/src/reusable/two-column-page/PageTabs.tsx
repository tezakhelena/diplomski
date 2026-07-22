import { Badge, Space, Tabs } from "antd";
import type { ReactNode } from "react";

export interface PageTabItem<T extends string> {
    key: T;
    label: string;
    icon?: ReactNode;
    count?: number;
}

interface Props<T extends string> {
    activeKey: T;
    items: PageTabItem<T>[];
    onChange: (key: T) => void;
}

export const PageTabs = <T extends string>({ activeKey, items, onChange }: Props<T>) => (
    <Tabs
        activeKey={activeKey}
        onChange={(key) => onChange(key as T)}
        items={items.map((item) => ({
            key: item.key,
            label: (
                <Space size={8}>
                    {item.icon}
                    {item.label}
                    {item.count !== undefined && <Badge count={item.count} showZero color="#5b4dff" />}
                </Space>
            ),
        }))}
    />
);