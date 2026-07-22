import { Button, Col, Flex, Row, Space, Typography } from "antd";
import { CheckCircle, Flag, Heart } from "lucide-react";
import newAdStyle from "../features/pet-ads/style/NewAd.module.css";
import filterStyle from "../features/pet-ads/style/PetAds.module.css";
import { getCategoryDescriptionById } from "../utils/helperFunctions";
import { petTypeIcons } from "../utils/uiUtils/icons";
import { PetCategory } from "../enums/petEnums";

type FilterButtonOption = {
    label: string;
    value: string | number;
    description?: string;
    count?: number;
};

type FilterButtonProps = {
    options: FilterButtonOption[];
    value?: string | number | null;
    onChange: (value: string | number | null) => void;
    variant?: "default" | "petType" | "category";
    context?: "filter" | "newAd";
};

const FilterButtons = ({ options, value, onChange, variant = "default", context = "filter" }: FilterButtonProps) => {
    const isNewAd = context === "newAd";

    const renderNewAdButton = (option: FilterButtonOption) => {
        const isSelected = value === option.value;
        const categoryDescription = option.description ?? getCategoryDescriptionById(option.value)

        return (
            <Button
                block
                key={option.value}
                className={isSelected ? `${newAdStyle.newAdChoiceButton} ${newAdStyle.newAdChoiceButtonSelected}` : newAdStyle.newAdChoiceButton}
                onClick={() => onChange(isSelected ? null : option.value)}
            >
                {isSelected && <CheckCircle className={newAdStyle.choiceCheck} size={20} />}

                {variant === "petType" && (
                    <Space direction="vertical" align="center" size={8} className={newAdStyle.petTypeContent}>
                        <Flex align="center" justify="center" className={newAdStyle.petTypeIcon}>
                            {petTypeIcons[Number(option.value)]}
                        </Flex>
                        <Typography.Text strong>{option.label}</Typography.Text>
                        {option.count !== undefined && <Typography.Text type="secondary">{option.count} oglasa</Typography.Text>}
                    </Space>
                )}

                {variant === "category" && (
                    <Flex align="center" gap={18} className={newAdStyle.categoryContent}>
                        <Flex align="center" justify="center" className={newAdStyle.categoryIcon}>
                            {option.value === PetCategory.TraziSe ? <Flag size={28} /> : <Heart size={28} />}
                        </Flex>
                        <Space direction="vertical" size={4} align="start">
                            <Typography.Text strong>{option.label}</Typography.Text>
                            <Typography.Text type="secondary">{categoryDescription}</Typography.Text>
                        </Space>
                    </Flex>
                )}

                {variant === "default" && <Typography.Text>{option.label}</Typography.Text>}
            </Button>
        );
    };

    if (isNewAd) {
        return (
            <Row gutter={[18, 18]}>
                {options.map((option) => (
                    <Col xs={24} sm={variant === "category" ? 24 : 12} md={variant === "category" ? 12 : 8} xl={variant === "category" ? 12 : 4} key={option.value}>
                        {renderNewAdButton(option)}
                    </Col>
                ))}
            </Row>
        );
    }

    return (
        <Flex wrap gap={10}>
            {options.map((option) => {
                const isSelected = value === option.value;

                return (
                    <Button
                        key={option.value}
                        icon={variant === "petType" ? petTypeIcons[Number(option.value)] : undefined}
                        className={isSelected ? `${filterStyle.filterButton} ${filterStyle.filterButtonSelected}` : filterStyle.filterButton}
                        onClick={() => onChange(isSelected ? null : option.value)}
                    >
                        {option.label}
                    </Button>
                );
            })}
        </Flex>
    );
};

export default FilterButtons;