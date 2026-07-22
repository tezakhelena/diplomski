import { Avatar, Button, Card, Empty, Space, Tag, Typography } from "antd";
import { Download, FileText, PenTool } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { RootState } from "../../../redux/store";
import { ContentCard } from "../../../reusable/two-column-page/ContentCard";
import { AdoptionRequestDetailResponse } from "../../adoptions/types/response-types";
import { useContractMutations } from "../hooks/useContractMutations";
import style from "../style/AdoptionContract.module.css";
import { formatMomentDate } from "../../../utils/dateUtils";
import { getImage, getPdf } from "../../../utils/urlUtils";
import { getTagColorForSign } from "../../../utils/uiUtils/styling";

const STATUS_TEXT = ["Čeka se potpis podnositelja", "Čeka se potpis oglašivača", "Potpisale obje strane"];

interface Props {
    data: AdoptionRequestDetailResponse;
}

export const AdoptionContractTable = ({ data }: Props) => {
    const { t } = useTranslation('contracts');
    const navigate = useNavigate();
    const { userId } = useSelector((state: RootState) => state.auth);
    const { downloadPdf, isDownloadingPdf } = useContractMutations();
    const contract = data?.contract;

    if (!contract) return <Card className={style.contractCard}><Empty description={t("table.empty")} /></Card>;

    const isOglasivac = data?.adOwnerId === userId;
    const isPodnositelj = data?.userId === userId;
    const canSign = (isOglasivac && contract.signedStatus === 1) || (isPodnositelj && contract.signedStatus === 0);

    const handleSign = () => {
        navigate("/sign-pdf", { state: { pdfUrl: getPdf(contract.newFileName), ugovorId: contract.contractId } });
    };

    return (
        <ContentCard>
            <Space direction="vertical" size={20} className={style.fullWidth}>
                <Card className={style.documentBox}>
                    <Space size={16} className={style.fullWidth}>
                        <FileText size={38} className={style.fileIcon} />
                        <Space direction="vertical" size={2} className={style.contractInfo}>
                            <Typography.Text strong>{contract.fileName}</Typography.Text>
                            <Typography.Text type="secondary">{t("table.uploaded")} {formatMomentDate(contract.uploadedAt)}</Typography.Text>
                            <Space size={6}>
                                <Typography.Text type="secondary">{t("table.by")}</Typography.Text>
                                <Avatar size={24} src={getImage(contract.profilePicture)} />
                                <Typography.Text type="secondary">{contract.username}</Typography.Text>
                            </Space>
                        </Space>
                        <Button icon={<Download size={17} />} onClick={() => downloadPdf(contract.newFileName)} loading={isDownloadingPdf}>
                            {t("table.download")}
                        </Button>
                    </Space>
                </Card>

                <Card className={style.statusBox}>
                    <Space direction="vertical" size={8}>
                        <Typography.Text strong>{t("table.statusTitle")}</Typography.Text>
                        <Tag color={getTagColorForSign(contract.signedStatus)}>{STATUS_TEXT[contract.signedStatus]}</Tag>
                        <Typography.Text type="secondary">
                            {contract.signedStatus === 2 ? t("table.statusDesc.completed") : t("table.statusDesc.pending")}
                        </Typography.Text>
                    </Space>
                </Card>

                {canSign && (
                    <Button type="primary" size="large" block icon={<PenTool size={18} />} onClick={handleSign}>
                        {t("table.signBtn")}
                    </Button>
                )}
            </Space>
        </ContentCard>
    );
};