package com.project.LostPaw.dto.response;

import com.project.LostPaw.projections.CommentProjection;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CommentResponse {
    private Long commentId;
    private String content;
    private String username;
    private String profilePictureUrl;
    private LocalDateTime createdAt;

    public CommentResponse(CommentProjection projection) {
        if (projection != null) {
            this.commentId = projection.getCommentId();
            this.content = projection.getContent();
            this.username = projection.getUsername();
            this.profilePictureUrl = projection.getProfilePictureUrl();
            this.createdAt = projection.getCreatedAt();
        }
    }
}
