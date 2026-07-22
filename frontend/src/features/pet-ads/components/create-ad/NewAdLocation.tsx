import { Card, Form, Input, Space, Typography } from "antd";
import type { FormInstance } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { setNoviOglasForma } from "../../../../redux/slices/oglasiSlice";
import { RootState } from "../../../../redux/store";
import { ValidationRules } from "../../../../utils/validationRules";
import { AttributeSelect } from "../../../attributes/components/AttributeSelect";
import { PetCategory } from "../../../../enums/petEnums";

interface Props {
    formNew?: FormInstance;
}

export const NewAdLocation = ({ formNew }: Props) => {
    const { t } = useTranslation("petAd");
    const dispatch = useDispatch();
    const { adRequest, categoryId } = useSelector(
        (state: RootState) => state.oglasi
    );
    const [internalForm] = Form.useForm();
    const form = formNew ?? internalForm;

    const showPetStatus =
        categoryId === PetCategory.Pronadjen ||
        categoryId === PetCategory.Napusten;

    return (
        <Card>
            <Space direction="vertical" size={20} className="app-full">
                <Typography.Title level={4} style={{ margin: 0 }}>
                    {t("newAd.location.title")}
                </Typography.Title>

                <Form
                    form={form}
                    layout="vertical"
                    initialValues={adRequest}
                    requiredMark={false}
                    onValuesChange={(_, allValues) =>
                        dispatch(setNoviOglasForma(allValues))
                    }
                >
                    <AttributeSelect
                        type="county"
                        name="countyId"
                        label={t("newAd.location.countyLabel")}
                        placeholder={t("newAd.location.countyPlaceholder")}
                    />

                    <Form.Item
                        name="city"
                        label={t("newAd.location.cityLabel")}
                        rules={[
                            ValidationRules.required(
                                t("newAd.location.cityLabel")
                            )
                        ]}
                    >
                        <Input
                            size="large"
                            placeholder={t("newAd.location.cityPlaceholder")}
                        />
                    </Form.Item>

                    {showPetStatus && (
                        <AttributeSelect
                            type="status"
                            name="statusId"
                            label={t("newAd.location.petStatusLabel")}
                            placeholder={t("newAd.location.petStatusPlaceholder")}
                            statusType={3}
                        />
                    )}
                </Form>
            </Space>
        </Card>
    );
};