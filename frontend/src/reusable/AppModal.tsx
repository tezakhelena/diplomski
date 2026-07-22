import { Button, Flex, Modal, Typography } from "antd";
import { X } from "lucide-react";
import { ReactNode } from "react";
import { AntSpin } from "./AntSpin";
import style from "./style/AppModal.module.css";

interface Props {
    open: boolean;
    title: string;
    description?: string;
    icon?: ReactNode;
    loading?: boolean;
    danger?: boolean;
    confirmText?: string;
    cancelText?: string;
    hideFooter?: boolean;
    confirmTitle?: string;
    confirmDescription?: string;
    confirmIcon?: ReactNode;
    width?: number;
    onConfirm?: () => void;
    onCancel: () => void;
    children?: ReactNode;
}

export const AppModal = ({
    open,
    title,
    description,
    icon,
    loading = false,
    danger = false,
    confirmText = "Potvrdi",
    cancelText = "Odustani",
    hideFooter = false,
    confirmTitle,
    confirmDescription,
    confirmIcon,
    width = 560,
    onConfirm,
    onCancel,
    children,
}: Props) => {
    return (
        <Modal
            open={open}
            footer={null}
            centered
            closable={false}
            width={width}
            className={style.modal}
            onCancel={onCancel}
        >
            <AntSpin loading={loading}>
                <Flex vertical>
                    <Flex
                        align="flex-start"
                        gap={16}
                        className={style.header}
                    >
                        {icon && (
                            <Flex
                                align="center"
                                justify="center"
                                className={
                                    danger
                                        ? style.dangerIcon
                                        : style.icon
                                }
                            >
                                {icon}
                            </Flex>
                        )}

                        <Flex vertical className={style.titleBlock}>
                            <Typography.Title level={3}>
                                {title}
                            </Typography.Title>

                            {description && (
                                <Typography.Text type="secondary">
                                    {description}
                                </Typography.Text>
                            )}
                        </Flex>

                        <Button
                            type="text"
                            shape="circle"
                            icon={<X size={20} />}
                            className={style.closeButton}
                            onClick={onCancel}
                        />
                    </Flex>

                    <Flex vertical gap={16} className={style.body}>
                        {(confirmTitle || confirmDescription) && (
                            <Flex vertical gap={8}>
                                {confirmTitle && (
                                    <Typography.Text strong>
                                        {confirmTitle}
                                    </Typography.Text>
                                )}

                                {confirmDescription && (
                                    <Typography.Text type="secondary">
                                        {confirmDescription}
                                    </Typography.Text>
                                )}
                            </Flex>
                        )}

                        {children}
                    </Flex>

                    {!hideFooter && (
                        <Flex
                            justify="flex-end"
                            gap={12}
                            className={style.actions}
                        >
                            <Button onClick={onCancel}>
                                {cancelText}
                            </Button>

                            <Button
                                type="primary"
                                danger={danger}
                                icon={confirmIcon}
                                onClick={onConfirm}
                            >
                                {confirmText}
                            </Button>
                        </Flex>
                    )}
                </Flex>
            </AntSpin>
        </Modal>
    );
};