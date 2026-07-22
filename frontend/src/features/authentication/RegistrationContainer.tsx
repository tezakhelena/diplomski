import { Form } from "antd";
import { useLocation } from "react-router-dom";
import { useAuthMutations } from "./hooks/useAuthMutations";
import { Registration } from "./components/Registration";

export const RegistrationContainer = () => {
    const [form] = Form.useForm();
    const location = useLocation();

    const privateUser = location.state?.privateUser ?? true;

    const { register, isRegistering } = useAuthMutations({
        onSuccess: () => form.resetFields()
    });

    const onFinish = async () => {
        await register({ 
            ...form.getFieldsValue(), 
            privateUser
        });
    };

    return <Registration form={form} onFinish={onFinish} privateUser={privateUser} loading={isRegistering} />;
}