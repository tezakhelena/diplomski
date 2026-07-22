import { Space, Typography } from "antd";
import style from "../../features/authentication/style/Authentication.module.css";

const { Title, Text } = Typography;

interface Props {
    title: string;
    subtitle: string;
}

export const AuthContentHeader = ({ title, subtitle }: Props) => {
    return (
        <Space direction="vertical" size={6}>
            <Title level={2} className={style.actionTitle}>
                {title}
            </Title>

            <Text className={style.actionSubtitle}>
                {subtitle}
            </Text>
        </Space>
    );
};