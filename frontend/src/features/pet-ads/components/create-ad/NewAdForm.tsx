import { Card, Form, Space, Typography } from "antd";
import type { FormInstance } from "antd";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { setNoviOglasForma } from "../../../../redux/slices/oglasiSlice";
import { BasicDataForm } from "../form-fields/BasicDataForm";

interface Props {
    formNew?: FormInstance;
}

export const NewAdForm = ({ formNew }: Props) => {
    const { t } = useTranslation("petAd");
    const dispatch = useDispatch();
    const [internalForm] = Form.useForm();
    const form = formNew ?? internalForm;

    return (
        <Card>
            <Space direction="vertical" size={20} className="app-full">
                <Typography.Title level={4} style={{ margin: 0 }}>
                    {t("newAd.form.title")}
                </Typography.Title>

                <Form
                    form={form}
                    layout="vertical"
                    onValuesChange={(_, allValues) =>
                        dispatch(setNoviOglasForma(allValues))
                    }
                >
                    <BasicDataForm />
                </Form>
            </Space>
        </Card>
    );
};