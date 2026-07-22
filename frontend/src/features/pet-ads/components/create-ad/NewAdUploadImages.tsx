import { Card, Flex, Image, Modal, Space, Typography, Upload } from "antd";
import type {
    RcFile,
    UploadChangeParam,
    UploadFile
} from "antd/es/upload/interface";
import { CloudUpload } from "lucide-react";
import { useTranslation } from "react-i18next";
import style from "../../style/NewAd.module.css";

interface Props {
    fileList: File[];
    onFileUpload: (files: File[]) => void;
}

export const NewAdUploadImages = ({ onFileUpload }: Props) => {
    const { t } = useTranslation("petAd");

    const handleUploadChange = ({
        fileList
    }: UploadChangeParam<UploadFile>) => {
        const files = fileList
            .map((file) => file.originFileObj)
            .filter((file): file is RcFile => file !== undefined);

        onFileUpload(files);
    };

    const handlePreview = (file: UploadFile) => {
        Modal.info({
            title: file.name,
            width: 700,
            content: (
                <Image
                    src={file.url || file.thumbUrl}
                    alt={file.name}
                    preview={false}
                    width="100%"
                />
            ),
        });
    };

    return (
        <Card>
            <Space direction="vertical" size={20} className="app-full">
                <Space direction="vertical" size={4}>
                    <Typography.Title level={4} style={{ margin: 0 }}>
                        {t("newAd.upload.title")}
                    </Typography.Title>

                    <Typography.Text type="secondary">
                        {t("newAd.upload.description")}
                    </Typography.Text>
                </Space>

                <Upload
                    customRequest={({ onSuccess }) => onSuccess?.("ok")}
                    listType="picture-card"
                    multiple
                    accept="image/png,image/jpeg,image/webp,image/heic"
                    className={style.upload}
                    onChange={handleUploadChange}
                    onPreview={handlePreview}
                >
                    <Flex
                        vertical
                        align="center"
                        justify="center"
                        gap={8}
                        className={style.uploadButton}
                    >
                        <CloudUpload size={42} />

                        <Typography.Text
                            strong
                            className={style.uploadTitle}
                        >
                            {t("newAd.upload.action")}
                        </Typography.Text>

                        <Typography.Text
                            type="secondary"
                            className={style.uploadDescription}
                        >
                            {t("newAd.upload.formats")}
                        </Typography.Text>
                    </Flex>
                </Upload>
            </Space>
        </Card>
    );
};