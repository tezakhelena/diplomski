import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AppForm } from "../../../../reusable/AppForm";
import { useVolunteeringMutations } from "../../hooks/useVolunteeringMutations";
import { VolunteerApplicationDetailsResponse, VolunteerApplicationRequest } from "../../types/request-types";
import { VolunteerApplicationFormFields } from "../form-fields/VolunteerApplicationFormFields";
import { VolunteerActions } from "../overview/VolunteerActions";

interface Props {
    disabled?: boolean;
    initialValues?: VolunteerApplicationDetailsResponse;
    volontiranjeId?: number;
    refetch?: () => void | Promise<unknown>;
    userId?: number;
    poduzeceId?: number;
}

export const VolunteerApplicationForm = ({
    disabled = false,
    initialValues,
    volontiranjeId,
    refetch,
    poduzeceId,
    userId,
}: Props) => {
    const { t } = useTranslation("volunteer");
    const [form] = useForm();
    const navigate = useNavigate();

    const { sendApplication, isSendingApplication } = useVolunteeringMutations();

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        }
    }, [initialValues, form]);

    const onFinish = async (values: any) => {
        if (!userId || !poduzeceId) {
            return;
        }

        const request: VolunteerApplicationRequest = {
            applicantId: userId,
            organizationId: poduzeceId,
            ...values,
        };

        await sendApplication(request);
        navigate("/prijave-za-volontiranje");
    };

    return (
        <>
            <AppForm
                form={form}
                onFinish={onFinish}
                disabled={disabled}
                actionsType={disabled ? "none" : "submit"}
                submitText={t("application.submitButton")}
                submitButtonProps={{ loading: isSendingApplication }}
            >
                <VolunteerApplicationFormFields disabled={disabled} />
            </AppForm>

            {volontiranjeId && initialValues && (
                <VolunteerActions
                    volontiranjeId={volontiranjeId}
                    currentStatusId={initialValues.statusId}
                    poduzeceId={initialValues.organizationId}
                    refetch={refetch}
                />
            )}
        </>
    );
};