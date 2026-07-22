import { Avatar, Flex, Space, Typography } from "antd";
import { User } from "lucide-react";

import { CommentResponse } from "../types/response-types";
import style from "../style/Comments.module.css";
import { formatDate } from "../../../utils/dateUtils";
import { getImage } from "../../../utils/urlUtils";

interface Props {
    comment: CommentResponse;
}

export const CommentItem = ({ comment }: Props) => {
    return (
        <Flex align="flex-start" gap={12} className={style.commentItem}>
            <Avatar src={comment.profilePictureUrl ? getImage(comment.profilePictureUrl) : undefined}
                icon={<User size={17} />}
                size={40}
            />

            <Space direction="vertical" size={4} className={style.commentBody}>
                <Flex align="center" justify="space-between" gap={12} wrap className={style.commentHeader}>
                    <Typography.Text strong>
                        {comment.username}
                    </Typography.Text>

                    <Typography.Text type="secondary">
                        {formatDate(comment.createdAt)}
                    </Typography.Text>
                </Flex>

                <Typography.Paragraph
                    className={style.commentContent}
                >
                    {comment.content}
                </Typography.Paragraph>
            </Space>
        </Flex>
    );
};