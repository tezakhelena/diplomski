import {
    Button,
    Form,
    FormInstance,
    FormProps,
    Space,
} from "antd";
import type {
    ButtonProps,
} from "antd";
import type {
    ReactNode,
} from "react";

type FormActionsType = | "none" | "submit" | "icon-submit" | "submit-cancel";

interface Props
    extends Omit<FormProps, "form" | "children"> {
    form: FormInstance;
    children: ReactNode;

    actionsType?: FormActionsType;
    actions?: ReactNode;

    submitText?: string;
    submitIcon?: ReactNode;
    submitButtonProps?: Omit<ButtonProps, "htmlType" | "children">;

    cancelText?: string;
    onCancel?: () => void;
    cancelButtonProps?: Omit<ButtonProps, "onClick" | "children">;
}

export const AppForm = ({
    form,
    children,
    layout = "vertical",
    requiredMark = false,

    actionsType = "none",
    actions,

    submitText = "Spremi",
    submitIcon,
    submitButtonProps,

    cancelText = "Odustani",
    onCancel,
    cancelButtonProps,

    ...formProps
}: Props) => {
    const renderActions = () => {
        if (actions) {
            return actions;
        }

        switch (actionsType) {
            case "submit":
                return (
                    <Button
                        type="primary"
                        htmlType="submit"
                        icon={submitIcon}
                        {...submitButtonProps}
                    >
                        {submitText}
                    </Button>
                );

            case "icon-submit":
                return (
                    <Button
                        type="primary"
                        htmlType="submit"
                        icon={submitIcon}
                        aria-label={submitText}
                        {...submitButtonProps}
                    />
                );

            case "submit-cancel":
                return (
                    <Space>
                        <Button
                            onClick={onCancel}
                            {...cancelButtonProps}
                        >
                            {cancelText}
                        </Button>

                        <Button
                            type="primary"
                            htmlType="submit"
                            icon={submitIcon}
                            {...submitButtonProps}
                        >
                            {submitText}
                        </Button>
                    </Space>
                );

            case "none":
            default:
                return null;
        }
    };

    const renderedActions = renderActions();

    return (
        <Form
            form={form}
            layout={layout}
            requiredMark={requiredMark}
            {...formProps}
        >
            {children}

            {renderedActions && (
                <Form.Item>
                    {renderedActions}
                </Form.Item>
            )}
        </Form>
    );
};