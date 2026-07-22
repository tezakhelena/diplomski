import { useTranslation } from "react-i18next";
import { AttributeSelect } from "../../../attributes/components/AttributeSelect";

export const RazloziBlokiranjaOglasa = () => {
    const { t } = useTranslation("petAd");

    return (
        <AttributeSelect
            type="status"
            name="reasonCode"
            placeholder={t("forms.blockAd.reasonPlaceholder")}
            statusType={11}
            label={t("forms.blockAd.reasonLabel")}
        />
    );
};