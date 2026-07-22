import { Button, Empty, Flex, Timeline, Typography } from "antd";
import { Activity } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { AppModal } from "../../../../reusable/AppModal";
import { UserHistory } from "../../types/response-types";
import { formatMomentDate } from "../../../../utils/dateUtils";
import { getNotificationIconByTypeId } from "../../../../utils/uiUtils/icons";

interface Props {
    open: boolean;
    onClose: () => void;
    korisnikPovijest: UserHistory[];
}

const PAGE_SIZE = 8;

export const UserActivityModal = ({
    open,
    onClose,
    korisnikPovijest,
}: Props) => {
    const { t } = useTranslation("users");
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    const visibleItems = useMemo(
        () => korisnikPovijest?.slice(0, visibleCount) ?? [],
        [korisnikPovijest, visibleCount]
    );

    const hasMore = visibleCount < (korisnikPovijest?.length ?? 0);

    return (
        <AppModal
            open={open}
            title={t("details.activity.title")}
            description={t("details.activity.description")}
            icon={<Activity size={24} />}
            hideFooter
            width={720}
            onCancel={onClose}
        >
            {visibleItems.length === 0 ? (
                <Empty description={t("details.activity.empty")} />
            ) : (
                <Flex
                    vertical
                    gap="middle"
                >
                    <Timeline
                        items={visibleItems.map((item, index) => ({
                            key: `${item.createdAt}-${index}`,
                            dot: getNotificationIconByTypeId(item.type),
                            children: (
                                <Flex vertical>
                                    <Typography.Text type="secondary" style={{ fontSize: "12px" }}>
                                        {formatMomentDate(item.createdAt)}
                                    </Typography.Text>
                                    <Typography.Text>{item.content}</Typography.Text>
                                </Flex>
                            ),
                        }))}
                    />

                    {hasMore && (
                        <Button
                            block
                            onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                        >
                            {t("details.activity.showMoreButton")}
                        </Button>
                    )}
                </Flex>
            )}
        </AppModal>
    );
};