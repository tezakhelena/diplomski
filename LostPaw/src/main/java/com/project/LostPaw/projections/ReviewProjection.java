package com.project.LostPaw.projections;

public interface ReviewProjection {
    Long getUserId();
    Long getReviewId();
    String getUsername();
    String getProfilePictureUrl();
    String getComment();
    Integer getRate();
}
