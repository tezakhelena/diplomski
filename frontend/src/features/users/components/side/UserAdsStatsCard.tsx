import { FileText, Search, Eye } from "lucide-react";
import { useTranslation } from "react-i18next";
import { QuickStatsCard } from "../../../../reusable/two-column-page/QuickStatsCard";
import { usePetAds } from "../../../pet-ads/hooks/usePetAdQueries";
import { AdStatus } from "../../../../enums/processEnums";

export const UserAdsStatsCard = ({ userId }: { userId: number }) => {
    const { t } = useTranslation("users");
    const { data = [] } = usePetAds({ userId });
    const activeAds = data.filter((ad) => ad.statusId === AdStatus.Aktivan || ad.status === "Aktivan").length;
    const totalViews = data.reduce((sum, ad) => sum + (ad.views ?? 0), 0);

    return (
        <QuickStatsCard
            title={t("ads.statistics.title")}
            items={[
                {
                    icon: <FileText size={24} />,
                    title: t("ads.statistics.totalAds.title"),
                    description: t("ads.statistics.totalAds.description"),
                    value: data.length,
                },
                {
                    icon: <Search size={24} />,
                    title: t("ads.statistics.activeAds.title"),
                    description: t("ads.statistics.activeAds.description"),
                    value: activeAds,
                },
                {
                    icon: <Eye size={24} />,
                    title: t("ads.statistics.totalViews.title"),
                    description: t("ads.statistics.totalViews.description"),
                    value: totalViews,
                },
            ]}
        />
    );
};