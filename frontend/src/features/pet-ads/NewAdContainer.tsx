import { Col, message, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import { Plus } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { resetForm, setKorisnik } from "../../redux/slices/oglasiSlice";
import { RootState } from "../../redux/store";
import { BreadCrumbItems } from "../../reusable/BreadCrumbItems";
import { SideIntroCard } from "../../reusable/two-column-page/SideIntroCard";
import { ConfirmNotMyPetModal } from "./components/create-ad/ConfirmNotMyPetModal";
import { NewAdSteps } from "./components/create-ad/NewAdSteps";
import { usePetAdMutations } from "./hooks/usePetAdMutations";

export const NewAdContainer = () => {
    const { t } = useTranslation("petAd");
    const [form] = useForm();
    const [fileList, setFileList] = useState<File[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [similarAds, setSimilarAds] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { adRequest } = useSelector((state: RootState) => state.oglasi);
    const { userId } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        dispatch(setKorisnik(userId));
    }, [dispatch, userId]);

    const handleSuccessCleanup = () => {
        form.resetFields();
        dispatch(resetForm());
        setFileList([]);
        setIsModalVisible(false);
    };

    const { createAd: mutateCreateAd, isCreating } = usePetAdMutations({
        onSuccess: handleSuccessCleanup,
        navigate
    });

    const buildFormData = (forceCreate = false) => {
        const formattedAdRequest = {
            ...adRequest,
            forceCreate,
            missingDate: adRequest.missingDate
                ? moment(adRequest.missingDate).format("YYYY-MM-DD")
                : null,
        };

        const formData = new FormData();
        formData.append("adRequest", JSON.stringify(formattedAdRequest));
        fileList.forEach((file) => formData.append("images", file));

        return formData;
    };

    const handleSubmit = () => {
        if (!fileList.length) {
            return message.error(t("newAd.validation.imageRequired"));
        }

        mutateCreateAd(buildFormData(false), {
            onError: (error: any) => {
                if (error.response?.status === 409) {
                    setSimilarAds(error.response.data);
                    setIsModalVisible(true);
                }
            }
        });
    };

    return (
        <>
            <BreadCrumbItems />
            <Row gutter={[22, 22]} align="top">
                <Col span={24}>
                    <SideIntroCard
                        icon={<Plus size={30} />}
                        title={t("newAd.page.title")}
                        description={t("newAd.page.description")}
                    />
                </Col>

                <Col span={24}>
                    <NewAdSteps
                        fileList={fileList}
                        onFileUpload={setFileList}
                        onSubmit={handleSubmit}
                        isLoading={isCreating}
                    />
                </Col>
            </Row>

            <ConfirmNotMyPetModal
                visible={isModalVisible}
                similarAds={similarAds}
                onProceed={() => mutateCreateAd(buildFormData(true))}
                onCancel={() => setIsModalVisible(false)}
                isLoading={isCreating}
            />
        </>
    );
};