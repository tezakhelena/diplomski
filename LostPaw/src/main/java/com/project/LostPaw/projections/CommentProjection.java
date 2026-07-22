package com.project.LostPaw.projections;
import java.time.LocalDateTime;

public interface CommentProjection {
    Long getCommentId();
    String getContent();
    String getUsername();
    String getProfilePictureUrl();
    LocalDateTime getCreatedAt();
}
