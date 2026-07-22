import { Avatar, Form, Upload, UploadFile } from "antd";
import { Edit2 } from "lucide-react";
import { useEffect, useState } from "react";
import style from "../../style/UserDetail.module.css";
import { getImage } from "../../../../utils/urlUtils";

interface Props {
    edit?: boolean;
    profilna?: string;
    disableImageChange?: boolean;
}

export const ImageUpload = ({ profilna, disableImageChange }: Props) => {

    const [previewUrl, setPreviewUrl] = useState<string | undefined>(
        profilna ? getImage(profilna) : undefined
    );

    useEffect(() => {
        return () => {
            if (previewUrl?.startsWith("blob:")) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const handleChange = ({ fileList }: { fileList: UploadFile[] }) => {
        const file = fileList[0]?.originFileObj;

        if (!file) {
            setPreviewUrl(profilna ? getImage(profilna) : undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
    };

    return (
        <Form.Item
            name="image"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            className={style.profileImageFormItem}
        >
            <Upload
                beforeUpload={() => false}
                maxCount={1}
                accept="image/*"
                showUploadList={false}
                onChange={handleChange}
                disabled={disableImageChange}
            >
                <div className={style.avatarWrap}>
                    <Avatar
                        src={previewUrl}
                        size={118}
                        className={style.avatar}
                    />
                    {/*kamera se prikazuje samo ako editamo ili ako nije onemogućeno*/}
                    {!disableImageChange && (
                        <button type="button" className={style.cameraButton}>
                            <Edit2 size={15} />
                        </button>
                    )}
                </div>
            </Upload>
        </Form.Item>
    )
}