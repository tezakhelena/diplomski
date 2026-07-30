import { Card, Col, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setContactVisible, setProfilna, setUloga } from "../../redux/slices/authSlice";
import { RootState } from "../../redux/store";
import { UserForm } from "../users/components/user-details/UserForm";
import { useAuthMutations } from "./hooks/useAuthMutations";
import { Roles } from "../../enums/userEnums";

export const CompleteProfileContainer = () => {
    const [form] = useForm();
    const navigate = useNavigate();
    const auth = useSelector((state: RootState) => state.auth);
    const [checked, setChecked] = useState(false);
    const dispatch = useDispatch();

    const { completeProfile, isCompleting } = useAuthMutations({
        onSuccess: (data) => {
            dispatch(setUloga(Roles.Korisnik));
            dispatch(setProfilna(data.fileName));
            dispatch(setContactVisible(checked));
            navigate('/');
        }
    });

    const onFinish = async () => {
        const { image, ...rest } = form.getFieldsValue();
        const data = new FormData();
        data.append('completeProfileRequest', JSON.stringify({ ...rest, userId: auth.userId, contactVisible: checked }));
        if (image) data.append('image', image[0].originFileObj);

        await completeProfile(data);
    };

    return (
        <Row justify="center">
            <Col xs={24} md={12}>
                <Card title="Dovrši profil">
                    <UserForm form={form} onFinish={onFinish} privateUser={auth.privateUser} visible handleSwitch={setChecked} loading={isCompleting} />
                </Card>
            </Col>
        </Row>
    )
}