import { Badge, Card, Flex, Typography } from "antd";
import { formatMomentDate } from "../../../utils/dateUtils";
import { NotificationResponse } from "../types/response-types";
import { NotificationDescription } from "./NotificationDescription";
import { getNotificationIconByTypeId } from "../../../utils/uiUtils/icons";
import { NotificationType } from "../../../enums/notificationEnums";

interface Props {
    notif: NotificationResponse;
}

export const NotificationItem = ({ notif }: Props) => {
    const isUnread = notif.isRead === 0;

    return (
        <Card bordered={false}>
            <Flex justify="space-between" align="start" gap={16}>
                <Flex flex={1} align="start" gap={16}>
                    <Flex
                        align="center"
                        justify="center"
                        style={{
                            width: 52,
                            height: 52,
                            borderRadius: "50%",
                            backgroundColor: "#f0edff",
                            color: "#5b4dff",
                            flexShrink: 0,
                        }}
                    >
                        {getNotificationIconByTypeId(notif.type)}
                    </Flex>

                    <Flex vertical gap={4} style={{ width: "100%" }}>
                        <Typography.Text strong={isUnread} style={{ fontSize: 16, color: "#172033" }}>
                            {notif.content}
                        </Typography.Text>

                        <NotificationDescription
                            procitano={notif.isRead}
                            description={notif.notification}
                            visible={notif.type === NotificationType.BlokiranOglas} 
                            fromApp={notif.type === NotificationType.VerifikacijaMaila}
                            goToDetails={[
                                NotificationType.SlicniOglas,
                                NotificationType.KorisnikZupanija
                            ].includes(notif.type)}
                            petAdId={notif.petAdId}
                        />
                    </Flex>
                </Flex>

                <Flex vertical align="end" gap={12}>
                    {notif.createdAt && (
                        <Typography.Text type="secondary" style={{ fontSize: 13, whiteSpace: "nowrap" }}>
                            {formatMomentDate(notif.createdAt)}
                        </Typography.Text>
                    )}

                    <Badge
                        color={isUnread ? "#5b4dff" : "#d0d5dd"}
                        style={{ width: 9, height: 9 }}
                    />
                </Flex>
            </Flex>
        </Card>
    );
};