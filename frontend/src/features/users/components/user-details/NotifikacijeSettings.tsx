import { List, Switch, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setPreference } from "../../../../redux/slices/authSlice";
import { RootState } from "../../../../redux/store";
import { notifikacijeTypes } from "../../../../types/values";
import { useUserMutations } from "../../hooks/useUserMutations";

interface Props {
    userId: number;
}

export const NotifikacijeSettings = ({ userId }: Props) => {
    const auth = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const { updatePreference, updatePreferencePending } = useUserMutations();

    const handleSwitch = (tip: number, value: boolean) => {
        dispatch(setPreference({ tip, receive: value }));

        updatePreference({
            userId: auth.userId,
            receiveNotification: value,
            type: tip
        });
    };

    const isDisabled = userId !== auth.userId;

    return (
        <>
            <Typography.Title level={4}>Upravljaj primanjem notifikacija</Typography.Title>

            <List
                itemLayout="horizontal"
                dataSource={notifikacijeTypes}
                renderItem={(e) => (
                    <List.Item
                        actions={[
                            <Switch
                                loading={updatePreferencePending}
                                disabled={isDisabled}
                                checked={auth.preferences?.[e.value] ?? false}
                                onChange={(value) => handleSwitch(e.value, value)}
                                style={{ backgroundColor: auth.preferences?.[e.value] ? '#6c5cff' : undefined }}
                            />
                        ]}
                    >
                        <List.Item.Meta
                            title={e.label}
                            description={<Typography.Text type="secondary">{e.description}</Typography.Text>}
                        />
                    </List.Item>
                )}
            />
        </>
    );
};