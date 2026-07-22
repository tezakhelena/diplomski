import { Button, Card, Col, Divider, Form, Input, Row, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import { Edit3, FileUser, MapPinHouse, NotebookPen, PawPrint, Save } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { BasicDataForm } from "./components/form-fields/BasicDataForm";
import { SectionTitle } from "../../reusable/two-column-page/SectionTitle";
import { SideIntroCard } from "../../reusable/two-column-page/SideIntroCard";
import { SideMenu } from "../../reusable/two-column-page/SideMenu";
import { TwoColumnPageLayout } from "../../reusable/two-column-page/TwoColumnPageLayout";
import { AttributeSelect } from "../attributes/components/AttributeSelect";
import { usePetAdMutations } from "./hooks/usePetAdMutations";
import { AppModal } from "../../reusable/AppModal";

export const EditAdContainer = () => {
    const { t } = useTranslation("petAd");
    const [form] = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const [visibleModal, setVisibleModal] = useState(false);
    const { updateAd, isUpdating } = usePetAdMutations({
        navigate: navigate
    });

    const { petAdId, petAd } = location.state;

    const onSubmit = async (): Promise<void> => {
        const petMissingDate = form.getFieldValue("missingDate");

        const formData = {
            ...form.getFieldsValue(),
            missingDate: petMissingDate
                ? dayjs(petMissingDate).format("YYYY-MM-DD")
                : null,
            petAdId,
        };

        updateAd(formData);
        setVisibleModal(false);
    };

    const onFinish = () => {
        setVisibleModal(true);
    };

    const [activeTab, setActiveTab] = useState("basic");

    const flatInitialValues = {
        ...petAd,
        ...petAd?.petDetails,
        missingDate: petAd?.petDetails?.missingDate,
    };

    const menuItems = [
        {
            key: "basic",
            label: t("editAd.menu.basic.title"),
            desc: t("editAd.menu.basic.description"),
            icon: <FileUser size={18} />
        },
        {
            key: "additional",
            label: t("editAd.menu.additional.title"),
            desc: t("editAd.menu.additional.description"),
            icon: <NotebookPen size={18} />
        },
    ];

    return (
        <TwoColumnPageLayout
            sideWidth={7}
            contentWidth={17}
            title={
                <SideIntroCard
                    icon={<Edit3 size={30} />}
                    title={t("editAd.page.title")}
                    description={t("editAd.page.description")}
                />
            }
            side={
                <SideMenu
                    selectedOption={activeTab}
                    onSelect={setActiveTab}
                    items={menuItems}
                />
            }
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={flatInitialValues}
                preserve={true}
            >
                {activeTab === "basic" ? (
                    <Space direction="vertical" size={28} style={{ width: "100%" }}>
                        <Card
                            title={
                                <SectionTitle icon={<MapPinHouse size={20} />}>
                                    {t("editAd.basicInformation.title")}
                                </SectionTitle>
                            }
                        >
                            <Row gutter={[24, 16]}>
                                <Col xs={24} md={12}>
                                    <AttributeSelect
                                        type="county"
                                        name="countyId"
                                        label={t("editAd.basicInformation.countyLabel")}
                                        placeholder={t("editAd.basicInformation.countyPlaceholder")}
                                    />
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name="city"
                                        label={t("editAd.basicInformation.cityLabel")}
                                    >
                                        <Input size="large" />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>

                        <Divider />

                        <Card
                            title={
                                <SectionTitle icon={<PawPrint size={20} />}>
                                    {t("editAd.petDetails.title")}
                                </SectionTitle>
                            }
                        >
                            <BasicDataForm initialValues={petAd} />
                        </Card>
                    </Space>
                ) : (
                    <Card
                        title={
                            <SectionTitle icon={<PawPrint size={20} />}>
                                {t("editAd.additionalInformation.title")}
                            </SectionTitle>
                        }
                    >
                        <Form.Item
                            name="notes"
                            label={t("editAd.additionalInformation.notesLabel")}
                        >
                            <Input.TextArea
                                rows={6}
                                placeholder={t("editAd.additionalInformation.notesPlaceholder")}
                            />
                        </Form.Item>
                    </Card>
                )}

                <Divider />

                <Row justify="end">
                    <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        icon={<Save size={18} />}
                        loading={isUpdating}
                    >
                        {t("editAd.saveButton")}
                    </Button>
                </Row>
            </Form>

            <AppModal
                open={visibleModal}
                title={t("editAd.modal.title")}
                description={t("editAd.modal.description")}
                icon={<Save size={24} />}
                onCancel={() => setVisibleModal(false)}
                confirmText={t("editAd.modal.confirmButton")}
                cancelText={t("editAd.modal.cancelButton")}
                loading={isUpdating}
                onConfirm={onSubmit}
            />
        </TwoColumnPageLayout>
    );
};