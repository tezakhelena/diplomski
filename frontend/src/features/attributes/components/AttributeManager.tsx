import { Button, Card, Col, Form, Input, Row, Select, Space, Table, Tag } from 'antd';
import { Plus, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppForm } from '../../../reusable/AppForm';
import { AppModal } from '../../../reusable/AppModal';
import { FastFilter } from '../../../reusable/filter-page/FastFilter';
import { AttributeTypeLabels } from '../../../utils/helperFunctions';
import { ValidationRules } from '../../../utils/validationRules';
import { useAllAttributes, useAttributeMutations } from '../hooks/useAttributeMutations';

export const AttributeManager = () => {
    const { t } = useTranslation('attributes');
    const [filters, setFilters] = useState({ searchInput: "", activeSearch: "", type: undefined as number | undefined });
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState<any | null>(null);
    const [form] = Form.useForm();

    const requestParams = useMemo(() => ({ search: filters.activeSearch, type: filters.type }), [filters.activeSearch, filters.type]);
    const { data, isLoading } = useAllAttributes(requestParams);
    const { addAttribute, updateAttribute, deleteAttribute } = useAttributeMutations();

    const updateFilters = (newValues: any) => setFilters(prev => ({ ...prev, ...newValues }));

    const columns = [
        { title: t('manager.columns.code'), dataIndex: 'code' },
        { title: t('manager.columns.value'), dataIndex: 'value' },
        {
            title: t('manager.columns.type'),
            dataIndex: 'type',
            render: (type: number) => <Tag color="blue">{AttributeTypeLabels[type] || t('manager.columns.unknown')}</Tag>
        },
        { title: t('manager.columns.description'), dataIndex: 'description' },
        {
            title: t('manager.columns.actions'),
            render: (_: any, record: any) => (
                <Space>
                    <Button type="link" onClick={() => { setEditingRecord(record); form.setFieldsValue(record); setIsFormModalOpen(true); }}>
                        {t('manager.buttons.edit')}
                    </Button>
                    <Button danger type="link" onClick={() => { setEditingRecord(record); setIsDeleteModalOpen(true); }}>
                        {t('manager.buttons.delete')}
                    </Button>
                </Space>
            )
        }
    ];

    return (
        <Card>
            <Button type="primary" icon={<Plus size={18} />} onClick={() => { setEditingRecord(null); form.resetFields(); setIsFormModalOpen(true); }} style={{ marginBottom: 16 }}>
                {t('manager.buttons.add')}
            </Button>

            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <FastFilter
                        search={filters.searchInput}
                        onSearchChange={(val) => updateFilters({ searchInput: val })}
                        onSearch={() => updateFilters({ activeSearch: filters.searchInput })}
                        searchPlaceholder={t('manager.searchPlaceholder')}
                        searchInfoTooltip={t("searchInfoTooltip")}
                        resetPage={() => updateFilters({ searchInput: "", activeSearch: "", type: undefined })}
                        additionalFilter={
                            <Select allowClear size='large' placeholder={t('manager.allTypes')} style={{ width: 200 }} value={filters.type} onChange={(val) => updateFilters({ type: val })}
                                options={Object.entries(AttributeTypeLabels).map(([key, label]) => ({ value: Number(key), label }))}
                            />
                        }
                    />
                </Col>
                <Col span={24}>
                    <Table dataSource={data || []} columns={columns} loading={isLoading} rowKey="code" />
                </Col>
            </Row>

            <AppModal open={isFormModalOpen} title={editingRecord ? t('manager.editTitle') : t('manager.title')} onConfirm={() => form.submit()} onCancel={() => setIsFormModalOpen(false)} confirmText={t('manager.buttons.save')}>
                <AppForm form={form} layout="vertical" onFinish={async (v) => { editingRecord ? await updateAttribute({ id: editingRecord.code, data: v }) : await addAttribute(v); setIsFormModalOpen(false); }}>
                    <Form.Item name="value" label={t('manager.form.valueLabel')} rules={[ValidationRules.required(t('manager.form.valueLabel'))]}>
                        <Input size='large' placeholder={t('manager.form.valuePlaceholder')} />
                    </Form.Item>
                    <Form.Item name="type" label={t('manager.form.typeLabel')} rules={[ValidationRules.required(t('manager.form.typeLabel'))]}>
                        <Select size="large" placeholder={t('manager.form.typePlaceholder')} options={Object.entries(AttributeTypeLabels).map(([key, label]) => ({ value: Number(key), label }))} />
                    </Form.Item>
                    <Form.Item name="description" label={t('manager.form.descriptionLabel')}>
                        <Input size='large' placeholder={t('manager.form.descriptionPlaceholder')} />
                    </Form.Item>
                </AppForm>
            </AppModal>

            <AppModal open={isDeleteModalOpen} title={t('manager.modal.deleteTitle')} description={t('manager.modal.deleteDescription')} icon={<Trash2 size={24} />} confirmText={t('manager.modal.deleteConfirm')} danger onConfirm={async () => { await deleteAttribute(editingRecord.code); setIsDeleteModalOpen(false); }} onCancel={() => setIsDeleteModalOpen(false)} />
        </Card>
    );
};