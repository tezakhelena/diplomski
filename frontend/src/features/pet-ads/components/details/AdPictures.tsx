import { Button, Empty, Flex, Image, Space } from "antd";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import style from "../../style/AdDetails.module.css";
import { PetAdDetailResponse } from "../../types/response-types";
import { getImage } from "../../../../utils/urlUtils";

interface Props {
    petAd?: PetAdDetailResponse;
}

export const AdPictures = ({ petAd }: Props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const pictures = petAd?.adPictures ?? [];

    useEffect(() => {
        if (activeIndex >= pictures.length) setActiveIndex(0);
    }, [activeIndex, pictures.length]);

    if (!pictures.length) {
        return (
            <Flex align="center" justify="center" className={style.emptyGallery}>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Nema dostupnih slika." />
            </Flex>
        );
    }

    const activePicture = pictures[activeIndex];
    const changeImage = (direction: -1 | 1) => setActiveIndex((current) => (current + direction + pictures.length) % pictures.length);

    return (
        <Space direction="vertical" size={10} className="app-full">
            <Flex className={style.mainImageWrap}>
                <Image
                    preview={false}
                    src={getImage(activePicture.url)}
                    alt={`${petAd?.generatedTitle ?? "Slika oglasa"} – ${activeIndex + 1}`}
                    width="100%"
                    className={style.mainImage}
                />

                {pictures.length > 1 && (
                    <>
                        <Button
                            className="app-icon-button galleryArrowLeft"
                            icon={<ChevronLeft size={24} />}
                            onClick={() => changeImage(-1)}
                        />
                        <Button
                            className="app-icon-button galleryArrowRight"
                            icon={<ChevronRight size={24} />}
                            onClick={() => changeImage(1)}
                        />
                    </>
                )}
            </Flex>

            {pictures.length > 1 && (
                <Flex wrap gap={10} className={style.thumbnailRow}>
                    {pictures.map((picture, index) => (
                        <Button
                            type="text"
                            aria-label={`Prikaži sliku ${index + 1}`}
                            key={picture.url}
                            className={`${style.thumbnailButton} ${index === activeIndex ? style.thumbnailButtonActive : ""}`}
                            onClick={() => setActiveIndex(index)}
                        >
                            <Image preview={false} src={getImage(picture.url)} alt={`Slika ${index + 1}`} width="100%" height="100%" className={style.thumbnailImage} />
                        </Button>
                    ))}
                </Flex>
            )}
        </Space>
    );
};