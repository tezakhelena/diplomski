import { Form, Select } from "antd";
import { useBreeds, useCounties, useStatuses, useCategories, useRoles, useBusinessTypes } from "../hooks/useAttributes";
import { toSelectOptions } from "../util/attributeUtils";
import { ValidationRules } from "../../../utils/validationRules";
import styles from "../style/Attributes.module.css";

type AttrType = 'breed' | 'county' | 'status' | 'category' | 'roles' | 'business-types';

interface Props {
    type: AttrType;
    name: string;
    label?: string;
    placeholder: string;
    speciesId?: number;
    statusType?: number;
    isFilter?: boolean;
    disabled?: boolean;
    value?: any;
    onChange?: (val: any) => void;
    style?: React.CSSProperties;
    noForm?: boolean;
}

export const AttributeSelect = ({ type, name, label, placeholder, speciesId, statusType, isFilter, disabled, value, onChange, style, noForm }: Props) => {

    const { data: breeds } = useBreeds(speciesId);
    const { data: counties } = useCounties();
    const { data: statuses } = useStatuses(statusType);
    const { data: categories } = useCategories();
    const { data: roles } = useRoles();
    const { data: businessTypes } = useBusinessTypes();

    const getData = () => {
        switch (type) {
            case 'breed': return breeds;
            case 'county': return counties;
            case 'status': return statuses;
            case 'category': return categories;
            case 'roles': return roles;
            case 'business-types': return businessTypes;
            default: return [];
        }
    };

    const isDisabled = disabled || (type === 'breed' && !speciesId);

    const selectElement = (
        <Select
            options={toSelectOptions(getData())}
            placeholder={placeholder}
            disabled={isDisabled}
            size="large"
            showSearch
            allowClear
            value={value}
            onChange={onChange}
            style={style}
            filterOption={(input, option) =>
                (option?.label ?? "").toString().toLowerCase().includes(input.toLowerCase())
            }
        />
    );

    if (noForm) return selectElement;

    return (
        <Form.Item
            name={name}
            label={label}
            className={styles.selectWrapper}
            rules={isFilter ? undefined : [ValidationRules.required(label!)]}
            required={false}
        >
            {selectElement}
        </Form.Item>
    );
};