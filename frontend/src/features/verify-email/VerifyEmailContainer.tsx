import { Result, Spin } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
    useNavigate,
    useSearchParams,
} from "react-router-dom";
import { useVerifyEmail } from "./hooks/useVerifyEmail";

export const VerifyEmailContainer = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { t } = useTranslation("verifyEmail");

    const token = searchParams.get("token");

    const {verifyEmail, isVerifyingEmail} = useVerifyEmail({
        onSuccess: () => {
            navigate("/prijava", {
                replace: true,
            });
        },
        onError: () => {
            navigate("/registracija", {
                replace: true,
            });
        },
    });

    useEffect(() => {
        if (!token) {
            navigate("/registracija", {
                replace: true,
            });

            return;
        }

        void verifyEmail(token);
    }, [
        token,
        verifyEmail,
        navigate,
    ]);

    return (
        <Spin
            spinning={isVerifyingEmail}
            size="large"
            tip={t("spinTip")}
        >
            <Result
                status="info"
                title={t("loadingTitle")}
                subTitle={t("loadingSubTitle")}
            />
        </Spin>
    );
};