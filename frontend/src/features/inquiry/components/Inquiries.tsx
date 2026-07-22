import { Empty, Form, Input, Space } from "antd";
import { Pencil, Send } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { usePagination } from "../../../hooks/usePagination";
import { AntSpin } from "../../../reusable/AntSpin";
import { AppForm } from "../../../reusable/AppForm";
import { AppPagination } from "../../../reusable/AppPagination";
import { FastFilter } from "../../../reusable/filter-page/FastFilter";
import { ContentCard } from "../../../reusable/two-column-page/ContentCard";
import { PageTabs } from "../../../reusable/two-column-page/PageTabs";
import { SideIntroCard } from "../../../reusable/two-column-page/SideIntroCard";
import { TwoColumnPageLayout } from "../../../reusable/two-column-page/TwoColumnPageLayout";
import { ValidationRules } from "../../../utils/validationRules";
import { AttributeSelect } from "../../attributes/components/AttributeSelect";
import { useInquiryMutations } from "../hooks/useInquiryMutations";
import { InquiryResponse } from "../types/response-types";
import { InquiryCard } from "./InquiryCard";

interface Props {
    mojiUpiti: InquiryResponse[];
    upiti: InquiryResponse[];
    userId: number;
    privateUser: boolean;
    isLoading?: boolean;
    filters: any;
    updateFilters: (values: any) => void;
}

type TabKey = "all" | "mine";

export const Inquiries = ({ mojiUpiti, upiti, userId, privateUser, isLoading = false, filters, updateFilters }: Props) => {
    const { t } = useTranslation("inquiries");
    const [form] = Form.useForm();
    const [answerForm] = Form.useForm();
    const [activeTab, setActiveTab] = useState<TabKey>("all");
    const [activeAnswerId, setActiveAnswerId] = useState<number | null>(null);

    const { sendInquiry, replyToInquiry, isSendingInquiry, replyingInquiryId } = useInquiryMutations();

    const currentList = activeTab === "all" ? upiti : mojiUpiti;
    const { currentData, pageCount, currentPage, handlePageChange, setCurrentPage } = usePagination(currentList, 8);

    const handleTabChange = (tab: TabKey) => {
        setCurrentPage(0);
        setActiveAnswerId(null);
        answerForm.resetFields();
        setActiveTab(tab);
    };

    const onFinish = async () => {
        const values = form.getFieldsValue();
        await sendInquiry({ userId, question: values.upit, type: values.tip });
        form.resetFields();
    };

    const onFinishOdgovor = async (inquiryId: number) => {
        await replyToInquiry({ responderId: userId, answer: answerForm.getFieldValue("odgovor"), inquiryId });
        setActiveAnswerId(null);
        answerForm.resetFields();
    };

    return (
        <TwoColumnPageLayout
            sideWidth={7}
            contentWidth={17}
            title={
                <SideIntroCard
                    icon={<Pencil size={26} />}
                    title={t("postNewInquiry.title")}
                    description={t("postNewInquiry.description")}
                />
            }
            side={
                <ContentCard>
                    <AppForm
                        form={form}
                        onFinish={onFinish}
                        actionsType="submit"
                        submitText={t("postNewInquiry.button")}
                        submitButtonProps={{ block: true, icon: <Send size={18} />, loading: isSendingInquiry }}
                    >
                        <AttributeSelect type="status" name="tip" label={t("postNewInquiry.fields.type")} placeholder={t("postNewInquiry.fields.typePlaceholder")} statusType={9} />

                        <Form.Item name="upit" label={t("postNewInquiry.fields.question")} rules={[ValidationRules.required(t("postNewInquiry.fields.question")), ValidationRules.maxLength(200, t("postNewInquiry.fields.question"))]}>
                            <Input.TextArea rows={7} maxLength={1000} showCount placeholder={t("postNewInquiry.fields.questionPlaceholder")} />
                        </Form.Item>
                    </AppForm>
                </ContentCard>
            }
        >
            <ContentCard>
                <Space direction="vertical" size={24} className="app-full">
                    <PageTabs<TabKey>
                        activeKey={activeTab}
                        onChange={handleTabChange}
                        items={[
                            { key: "all", label: t("tabs.all"), count: upiti.length },
                            { key: "mine", label: t("tabs.mine"), count: mojiUpiti.length },
                        ]}
                    />

                    <FastFilter
                        search={filters.searchInput}
                        onSearchChange={(val) => updateFilters({ searchInput: val })}
                        onSearch={() => {
                            setCurrentPage(0);
                            updateFilters({ activeSearch: filters.searchInput });
                        }}
                        searchPlaceholder={t("filters.searchPlaceholder")}
                        sortValue={filters.sortDirection}
                        onSortChange={(val) => { setCurrentPage(0); updateFilters({ sortDirection: val }); }}
                        resetPage={() => {
                            setCurrentPage(0);
                            updateFilters({ searchInput: "", activeSearch: "" });
                        }}
                        searchButtonLoading={isLoading}
                        searchInfoTooltip={t("searchInfoTooltip")}
                        additionalFilter={
                            <AttributeSelect
                                type="status"
                                statusType={9}
                                placeholder={t("filters.typeAll")}
                                value={filters.typeFilter}
                                onChange={(val) => {
                                    setCurrentPage(0);
                                    updateFilters({ typeFilter: val });
                                }}
                                style={{ width: 200 }}
                                name="status"
                                noForm
                            />
                        }
                    />

                    <AntSpin loading={isLoading}>
                        {currentData.length > 0 ? (
                            <Space direction="vertical" size={14} className="app-full">
                                {currentData.map((upit) => (
                                    <InquiryCard
                                        key={upit.inquiryId}
                                        upit={upit}
                                        privateUser={privateUser}
                                        activeAnswerId={activeAnswerId}
                                        setActiveAnswerId={setActiveAnswerId}
                                        answerForm={answerForm}
                                        onFinishOdgovor={onFinishOdgovor}
                                        isReplying={replyingInquiryId === upit.inquiryId}
                                    />
                                ))}
                            </Space>
                        ) : (
                            <Empty description={t("empty")} />
                        )}

                        <AppPagination
                            pageCount={pageCount}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </AntSpin>
                </Space>
            </ContentCard>
        </TwoColumnPageLayout>
    );
};