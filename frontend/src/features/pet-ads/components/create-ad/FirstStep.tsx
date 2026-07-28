import { Button, Card, Divider, Flex, notification, Space } from "antd";
import { ArrowRight, Folder, PawPrint } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
    setKategorija,
    setKategorijaInForm,
    setVrsta,
    setVrstaInForm,
} from "../../../../redux/slices/oglasiSlice";
import { RootState } from "../../../../redux/store";
import FilterButtons from "../../../../reusable/FilterButtons";
import { SectionTitle } from "../../../../reusable/two-column-page/SectionTitle";
import { useCategories, useSpecies } from "../../../attributes/hooks/useAttributes";
import { toSelectOptions } from "../../../attributes/util/attributeUtils";
import { BusinessType } from "../../../../enums/userEnums";
import { useMemo } from "react";
import { PetCategory } from "../../../../enums/petEnums";

interface Props {
    nextStep: () => void;
}

export const FirstStep = ({ nextStep }: Props) => {
    const { t } = useTranslation("petAd");
    const dispatch = useDispatch();
    const { data: species = [] } = useSpecies();
    const { data: categories = [] } = useCategories();

    const { speciesId, categoryId } = useSelector((state: RootState) => state.oglasi.adRequest);
    const { businessTypeId } = useSelector((state: RootState) => state.auth);

    const shelter = businessTypeId === BusinessType.UdrugaAzil;

    const availableCategories = useMemo(() => {
        if (!shelter) {
            return categories;
        }

        return categories.filter((category) => Number(category.code) === PetCategory.Napusten);
    }, [categories, shelter])

    const handleSpeciesSelect = (value: string | number | null) => {
        const speciesId = value == null ? undefined : Number(value);

        dispatch(setVrsta(speciesId as number));
        dispatch(setVrstaInForm(speciesId as number));
    };

    const handleCategorySelect = (value: string | number | null) => {
        const categoryId = value == null ? undefined : Number(value);

        dispatch(setKategorija(categoryId as number));
        dispatch(setKategorijaInForm(categoryId as number));
    };

    const handleNext = () => {
        if (!speciesId || !categoryId) {
            notification.warning({
                message: t("newAd.firstStep.validation.title"),
                description: t("newAd.firstStep.validation.description")
            });
            return;
        }

        nextStep();
    };

    return (
        <Card>
            <Space direction="vertical" size={28} className="app-full">
                <Space direction="vertical" size={24} className="app-full">
                    <SectionTitle icon={<PawPrint size={20} />}>
                        {t("newAd.firstStep.speciesTitle")}
                    </SectionTitle>

                    <FilterButtons
                        context="newAd"
                        variant="petType"
                        options={toSelectOptions(species)}
                        value={speciesId}
                        onChange={handleSpeciesSelect}
                    />
                </Space>

                <Divider style={{ margin: 0 }} />

                <Space direction="vertical" size={24} className="app-full">
                    <SectionTitle icon={<Folder size={20} />}>
                        {t("newAd.firstStep.categoryTitle")}
                    </SectionTitle>

                    <FilterButtons
                        context="newAd"
                        variant="category"
                        options={toSelectOptions(availableCategories)}
                        value={categoryId}
                        onChange={handleCategorySelect}
                    />
                </Space>

                <Flex justify="flex-end">
                    <Button
                        type="primary"
                        size="large"
                        icon={<ArrowRight size={18} />}
                        iconPosition="end"
                        onClick={handleNext}
                    >
                        {t("newAd.firstStep.nextButton")}
                    </Button>
                </Flex>
            </Space>
        </Card>
    );
};