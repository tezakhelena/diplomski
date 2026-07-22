import { Col, DatePicker, Form, Input, InputNumber, Row, Select } from "antd";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { AttributeSelect } from "../../../attributes/components/AttributeSelect";
import { PetAdDetailResponse } from "../../types/response-types";
import { RootState } from "../../../../redux/store";
import { ValidationRules } from "../../../../utils/validationRules";

interface Props {
    initialValues?: PetAdDetailResponse;
}

export const BasicDataForm = ({ initialValues }: Props) => {
    const { t } = useTranslation("petAd");

    const petAd = useSelector((state: RootState) => state.oglasi);

    const currentSpeciesId = initialValues
        ? initialValues.petDetails?.speciesId
        : petAd.speciesId;

    return (
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {(currentSpeciesId === 4 || currentSpeciesId === 8) ? null : (
                <Col xs={24} sm={12}>
                    <AttributeSelect
                        type="breed"
                        name="breedId"
                        label={t("forms.basicData.breed.label")}
                        placeholder={t("forms.basicData.breed.placeholder")}
                        speciesId={currentSpeciesId}
                        disabled={!currentSpeciesId}
                    />
                </Col>
            )}
            <Col xs={24} sm={12}>
                <Form.Item
                    name="missingDate"
                    label={t("forms.basicData.date.label")}
                    required={false}
                    rules={[
                        ValidationRules.required(
                            t("forms.basicData.date.validationLabel")
                        )
                    ]}
                    getValueProps={(value) => ({
                        value: value ? dayjs(value) : undefined,
                    })}
                    getValueFromEvent={(val) => val}
                >
                    <DatePicker
                        size="large"
                        placeholder={t("forms.basicData.date.placeholder")}
                        style={{ width: "100%" }}
                        format="DD.MM.YYYY"
                        disabledDate={(currentDate) => {
                            return currentDate && currentDate > dayjs().endOf("day");
                        }}
                    />
                </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
                <Form.Item
                    name="furColor"
                    label={t("forms.basicData.furColor.label")}
                    required={false}
                    rules={[
                        ValidationRules.required(
                            t("forms.basicData.furColor.validationLabel")
                        )
                    ]}
                >
                    <Input
                        size="large"
                        placeholder={t("forms.basicData.furColor.placeholder")}
                    />
                </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
                <Form.Item
                    name="maturity"
                    label={t("forms.basicData.maturity.label")}
                    required={false}
                    rules={[
                        ValidationRules.required(
                            t("forms.basicData.maturity.validationLabel")
                        )
                    ]}
                >
                    <Select
                        size="large"
                        placeholder={t("forms.basicData.maturity.placeholder")}
                    >
                        <Select.Option value="M">
                            {t("forms.basicData.maturity.options.young")}
                        </Select.Option>
                        <Select.Option value="O">
                            {t("forms.basicData.maturity.options.adult")}
                        </Select.Option>
                    </Select>
                </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
                <Form.Item
                    name="gender"
                    label={t("forms.basicData.gender.label")}
                    required={false}
                    rules={[
                        ValidationRules.required(
                            t("forms.basicData.gender.validationLabel")
                        )
                    ]}
                >
                    <Select
                        size="large"
                        placeholder={t("forms.basicData.gender.placeholder")}
                    >
                        <Select.Option value="M">
                            {t("forms.basicData.gender.options.male")}
                        </Select.Option>
                        <Select.Option value="Ž">
                            {t("forms.basicData.gender.options.female")}
                        </Select.Option>
                        <Select.Option value="N">
                            {t("forms.basicData.gender.options.unknown")}
                        </Select.Option>
                    </Select>
                </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
                <Form.Item
                    name="reward"
                    label={t("forms.basicData.reward.label")}
                >
                    <InputNumber
                        size="large"
                        min={0}
                        style={{ width: "100%" }}
                        placeholder={t("forms.basicData.reward.placeholder")}
                    />
                </Form.Item>
            </Col>
        </Row>
    );
};