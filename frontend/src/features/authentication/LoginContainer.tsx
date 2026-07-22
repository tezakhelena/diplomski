import { Form } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, setPreference } from "../../redux/slices/authSlice";
import { useAuthMutations } from "./hooks/useAuthMutations";
import { Login } from "./components/Login";
import { Roles } from "../../enums/userEnums";

export const LoginContainer = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loginMethod, isLoggingIn } = useAuthMutations({
        onSuccess: (data) => {
            dispatch(login({
                token: data.token, username: data.username, userId: data.userId,
                roleId: data.roleId, firstName: data.firstName, lastName: data.lastName,
                profilePictureUrl: data.profilePictureUrl, privateUser: data.privateUser,
                contactVisible: data.contactVisible,
                businessTypeId: data.businessTypeId
            }));

            data.preferences.forEach((p: any) => dispatch(setPreference({ tip: p.tip, receive: p.receiveNotification })));

            navigate(data.roleId === Roles.NepotpuniProfil ? '/dovrsi' : '/');
        }
    });

    return <Login form={form} onFinish={() => loginMethod(form.getFieldsValue())} loading={isLoggingIn} />;
}