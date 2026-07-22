import { Form, Input, Radio, Col, Card } from "antd";
import { useTranslation } from "react-i18next";
import styles from "../../style/AdoptionRequests.module.css";
import { ValidationRules } from "../../../../utils/validationRules";

export const AdoptionFormFields = () => {
    const { t } = useTranslation('adoption');
    return (
        <>
            <Col xs={24} lg={12}>
                <Card className={styles.questionCard} bordered>
                    <Form.Item name="householdMembers" label={t("adoption.form.householdMembers.label")} rules={[ValidationRules.required("Odabir")]}>
                        <Radio.Group>
                            <Radio value={t("adoption.form.householdMembers.options.self")}>{t("adoption.form.householdMembers.options.self")}</Radio>
                            <Radio value={t("adoption.form.householdMembers.options.family")}>{t("adoption.form.householdMembers.options.family")}</Radio>
                            <Radio value={t("adoption.form.householdMembers.options.friend")}>{t("adoption.form.householdMembers.options.friend")}</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Card>
            </Col>
            <Col xs={24} lg={12}>
                <Card className={styles.questionCard} bordered>
                    <Form.Item name="schedule" label={t("adoption.form.schedule.label")} rules={[ValidationRules.required("Odabir")]}>
                        <Radio.Group>
                            <Radio value={t("adoption.form.schedule.options.veryBusy")}>{t("adoption.form.schedule.options.veryBusy")}</Radio>
                            <Radio value={t("adoption.form.schedule.options.busy")}>{t("adoption.form.schedule.options.busy")}</Radio>
                            <Radio value={t("adoption.form.schedule.options.notBusy")}>{t("adoption.form.schedule.options.notBusy")}</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Card>
            </Col>
            <Col xs={24} lg={12}>
                <Card className={styles.questionCard} bordered>
                    <Form.Item name="allergies" label={t("adoption.form.allergies.label")} rules={[ValidationRules.required(t("adoption.form.allergies.label"))]}>
                        <Input.TextArea rows={3} showCount maxLength={200} placeholder={t("adoption.form.allergies.placeholder")} />
                    </Form.Item>
                </Card>
            </Col>
            <Col xs={24} lg={12}>
                <Card className={styles.questionCard} bordered>
                    <Form.Item name="address" label={t("adoption.form.address.label")} rules={[ValidationRules.required(t("adoption.form.address.label"))]}>
                        <Input.TextArea rows={3} showCount maxLength={200} placeholder={t("adoption.form.address.placeholder")} />
                    </Form.Item>
                </Card>
            </Col>
            <Col xs={24} lg={12}>
                <Card className={styles.questionCard} bordered>
                    <Form.Item name="environment" label={t("adoption.form.environment.label")} rules={[ValidationRules.required(t("adoption.form.environment.label"))]}>
                        <Input.TextArea rows={4} showCount maxLength={500} placeholder={t("adoption.form.environment.placeholder")} />
                    </Form.Item>
                </Card>
            </Col>
            <Col xs={24} lg={12}>
                <Card className={styles.questionCard} bordered>
                    <Form.Item name="experience" label={t("adoption.form.experience.label")} rules={[ValidationRules.required(t("adoption.form.experience.label"))]}>
                        <Input.TextArea rows={4} showCount maxLength={500} placeholder={t("adoption.form.experience.placeholder")} />
                    </Form.Item>
                </Card>
            </Col>
        </>
    );
};