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
            title={t("details.adsStats.title")}
            items={[
                {
                    icon: <FileText size={24} />,
                    title: t("details.adsStats.totalAds.title"),
                    description: t("details.adsStats.totalAds.description"),
                    value: data.length,
                },
                {
                    icon: <Search size={24} />,
                    title: t("details.adsStats.activeAds.title"),
                    description: t("details.adsStats.activeAds.description"),
                    value: activeAds,
                },
                {
                    icon: <Eye size={24} />,
                    title: t("details.adsStats.totalViews.title"),
                    description: t("details.adsStats.totalViews.description"),
                    value: totalViews,
                },
            ]}
        />
    );
};