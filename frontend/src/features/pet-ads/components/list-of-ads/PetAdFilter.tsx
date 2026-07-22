import { Form, FormInstance } from "antd";
import { useTranslation } from "react-i18next";
import { FiltersState } from "../../../../redux/slices/filterSlice";
import FilterButtons from "../../../../reusable/FilterButtons";
import { gender, maturity } from "../../../../types/values";
import { useCategories, useSpecies } from "../../../attributes/hooks/useAttributes";
import { toSelectOptions } from "../../../attributes/util/attributeUtils";
import { AttributeSelect } from "../../../attributes/components/AttributeSelect";

interface Props {
    filteri: FiltersState;
    form: FormInstance;
}

export const PetAdFilter = ({ filteri, form }: Props) => {
    const { t } = useTranslation("petAd");

    const { data: categories } = useCategories();
    const { data: species } = useSpecies();

    const selectedSpeciesId = Form.useWatch("speciesId", form);
    const selectedCategoryId = Form.useWatch("categoryId", form);
    const selectedGender = Form.useWatch("gender", form);
    const selectedMaturity = Form.useWatch("maturity", form);

    const speciesId = selectedSpeciesId ?? filteri.adsFilter?.speciesId;

    return (
        <>
            <Form.Item name="speciesId" label={t("list.filters.species")}>
                <FilterButtons
                    variant="petType"
                    options={toSelectOptions(species)}
                    value={selectedSpeciesId ?? filteri.adsFilter?.speciesId}
                    onChange={(value) => {
                        form.setFieldValue("speciesId", value);
                        form.setFieldValue("breedId", undefined);
                    }}
                />
            </Form.Item >

            <AttributeSelect
                type="county"
                name="countyId"
                label={t("list.filters.county")}
                placeholder={t("list.filters.countyPlaceholder")}
                isFilter
            />

            <AttributeSelect
                type="breed"
                name="breedId"
                label={t("list.filters.breed")}
                placeholder={t("list.filters.breedPlaceholder")}
                isFilter
                speciesId={speciesId}
                disabled={!speciesId}
            />

            <Form.Item name="categoryId" label={t("list.filters.category")}>
                <FilterButtons
                    options={toSelectOptions(categories)}
                    value={selectedCategoryId ?? filteri.adsFilter?.categoryId}
                    onChange={(value) => form.setFieldValue("categoryId", value)}
                />
            </Form.Item>

            <Form.Item name="gender" label={t("list.filters.gender")}>
                <FilterButtons
                    options={gender.map((g) => ({
                        value: g.value,
                        label:
                            g.value === "M"
                                ? t("list.filters.genderOptions.male")
                                : g.value === "Ž"
                                    ? t("list.filters.genderOptions.female")
                                    : t("list.filters.genderOptions.unknown"),
                    }))}
                    value={selectedGender ?? filteri.adsFilter?.gender}
                    onChange={(value) => form.setFieldValue("gender", value)}
                />
            </Form.Item>

            <Form.Item name="maturity" label={t("list.filters.maturity")}>
                <FilterButtons
                    options={maturity.map((m) => ({
                        value: m.value,
                        label:
                            m.value === "M"
                                ? t("list.filters.maturityOptions.young")
                                : t("list.filters.maturityOptions.adult"),
                    }))}
                    value={selectedMaturity ?? filteri.adsFilter?.maturity}
                    onChange={(value) => form.setFieldValue("maturity", value)}
                />
            </Form.Item>
        </>
    )
};