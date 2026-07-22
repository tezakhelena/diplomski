import { Form } from "antd";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { resetFilter, setFilter } from "../redux/slices/filterSlice";
import { FiltersState } from "../redux/slices/filterSlice";

interface Props<T extends object> {
    filterName: keyof FiltersState;
    filterValues?: Partial<T>;
}

export const useFilterPage = <T extends object>({
    filterName,
    filterValues,
}: Props<T>) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        form.setFieldsValue(filterValues ?? {});
    }, [filterValues, form]);

    const request = useMemo(() => filterValues ?? {}, [filterValues]);

    const applyFilters = () => {
        dispatch(
            setFilter({
                filterName,
                values: form.getFieldsValue(),
            })
        );
    };

    const clearFilters = () => {
        dispatch(resetFilter());
        form.resetFields();
    };

    const removeFilter = (fieldName: string) => {
        dispatch(
            setFilter({
                filterName,
                values: {
                    [fieldName]: null,
                },
            })
        );

        form.setFieldsValue({
            [fieldName]: null,
        });
    };

    return {
        form,
        request,
        applyFilters,
        clearFilters,
        removeFilter,
    };
};