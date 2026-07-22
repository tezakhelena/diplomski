// @ts-ignore
import WebViewer from "@pdftron/webviewer";
import { Button, notification, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { RootState } from "../../../redux/store";
import { useContractMutations } from "../hooks/useContractMutations";

type WebViewerInstanceType = Awaited<ReturnType<typeof WebViewer>>;
const licenseKey = import.meta.env.VITE_APRYSE_LICENSE_KEY;

interface PdfSignLocationState {
    pdfUrl?: string;
    ugovorId?: number;
}

const PdfSign = () => {
    const { t } = useTranslation('contracts');
    const location = useLocation();
    const navigate = useNavigate();

    const viewerRef = useRef<HTMLDivElement>(null);
    const instanceRef = useRef<WebViewerInstanceType | null>(null);
    const [signatureAdded, setSignatureAdded] = useState(false);


    const { pdfUrl, ugovorId } = (location.state as PdfSignLocationState | null) ?? {};
    const userId = useSelector((state: RootState) => state.auth.userId);

    const { signContract, isSigningContract } = useContractMutations({
        onSignSuccess: () => navigate(-1),
    });

    useEffect(() => {
        if (!pdfUrl || !ugovorId) {
            navigate("/error", { replace: true });
            return;
        }

        const viewerElement = viewerRef.current;
        if (!viewerElement) return;

        let disposed = false;
        let annotationChangedHandler: ((annotations: unknown[], action: string) => void) | undefined;

        const initializeViewer = async () => {
            try {

                if (!licenseKey) {
                    throw new Error("VITE_APRYSE_LICENSE_KEY nije postavljen u frontend/.env datoteci.");
                }


                const createdInstance = await WebViewer({
                    path: "/WebViewer/lib",
                    initialDoc: pdfUrl,
                    licenseKey: licenseKey,
                }, viewerElement);

                if (disposed) {
                    await createdInstance.UI.dispose();
                    return;
                }

                instanceRef.current = createdInstance;
                createdInstance.UI.setToolMode("AnnotationCreateSignature");

                annotationChangedHandler = (annotations: any[], action: string) => {
                    const annotationManager = createdInstance.Core.annotationManager;
                    if (action === "add" && annotations.some((a) => a.Subject === "Signature")) {
                        setSignatureAdded(true);
                    }
                    if (action === "delete") {
                        const hasSignature = annotationManager.getAnnotationsList().some((a: any) => a.Subject === "Signature")
                        setSignatureAdded(hasSignature);
                    }
                };

                createdInstance.Core.annotationManager.addEventListener("annotationChanged", annotationChangedHandler);
            } catch (error) {
                console.error("WebViewer initialization error:", error);
                if (!disposed) {
                    notification.error({ message: "Greška", description: t("pdfSign.errorInit") });
                }
            }
        };

        void initializeViewer();

        return () => {
            disposed = true;
            setSignatureAdded(false);
            const currentInstance = instanceRef.current;
            if (!currentInstance) return;
            if (annotationChangedHandler) {
                currentInstance.Core.annotationManager.removeEventListener("annotationChanged", annotationChangedHandler);
            }
            instanceRef.current = null;
            void currentInstance.UI.dispose();
        };
    }, [pdfUrl, ugovorId, navigate, t]);

    const handleSendSignature = async () => {
        if (!signatureAdded) {
            notification.error({ message: "Potpisivanje", description: t("pdfSign.errorSignature") });
            return;
        }
        const viewerInstance = instanceRef.current;
        if (!viewerInstance || !ugovorId || !userId) {
            notification.error({ message: "Greška", description: t("pdfSign.errorMissing") });
            return;
        }

        try {
            const { documentViewer, annotationManager } = viewerInstance.Core;
            const document = documentViewer.getDocument();

            if (!document) {
                notification.error({ message: "Greška", description: t("pdfSign.errorLoad") });
                return;
            }

            const xfdfString = await annotationManager.exportAnnotations();
            const fileData = await document.getFileData({ xfdfString });
            const blob = new Blob([new Uint8Array(fileData)], { type: "application/pdf" });
            const fileName = pdfUrl?.split("/").pop() || "contract.pdf";

            const formData = new FormData();
            formData.append("file", blob, fileName);
            formData.append("contractId", String(ugovorId));
            formData.append("userId", String(userId));

            await signContract(formData);

        } catch (error) {
            console.error("Contract signing error:", error);

            notification.error({message: "Greška", description: t("pdfSign.errorMissing")});
        }

    };

    return (
        <Space direction="vertical" size={16} className="app-full">
            <div ref={viewerRef} style={{ width: "100%", height: "80vh", border: "1px solid #d9d9d9", borderRadius: 8, overflow: "hidden" }} />
            <Button block size="large" type="primary" loading={isSigningContract} disabled={!signatureAdded} onClick={handleSendSignature}>
                {t("pdfSign.submitBtn")}
            </Button>
        </Space>
    );
};

export default PdfSign;