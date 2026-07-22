import { Card, Flex, Menu, Typography } from "antd";
import style from "../style/TwoColumnPageLayout.module.css";
import { ReactNode } from "react";

interface MenuItems {
    key: string;
    label: string;
    desc: string;
    icon: ReactNode;
}

interface Props {
    selectedOption: string;
    onSelect: (key: string) => void;
    items: MenuItems[];
}

export const SideMenu = ({ selectedOption, onSelect, items }: Props) => {

    return (
        <Card bordered={false} className={style.accountMenuCard}>
            <Menu
                mode="vertical"
                selectedKeys={[selectedOption]}
                onClick={(e) => onSelect(e.key)}
                items={items.map((tab) => ({
                    key: tab.key,
                    label: (
                        <Flex align="center" gap={14}>
                            <Flex align="center" justify="center" className={style.accountTabIcon}>
                                {tab.icon}
                            </Flex>
                            <Flex vertical>
                                <Typography.Text strong>{tab.label}</Typography.Text>
                                <Typography.Text type="secondary" style={{ fontSize: '12px', lineHeight: 1.35 }}>
                                    {tab.desc}
                                </Typography.Text>
                            </Flex>
                        </Flex>
                    ),
                }))}
            />
        </Card>
    );
};