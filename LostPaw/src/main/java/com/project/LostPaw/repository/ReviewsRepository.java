package com.project.LostPaw.repository;

import com.project.LostPaw.projections.ReviewProjection;
import com.project.LostPaw.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReviewsRepository extends JpaRepository<Review, Long> {

    @Query(value = """
    select  
        r.rate as rate,  
        r.review_id as reviewId,  
        r.comment,  
        u.username as username,  
        u.user_id as userId,  
        u.profile_picture_url as profilePictureUrl  
    from reviews r   
    left join users u on r.user_id = u.user_id 
    """, nativeQuery = true)
    List<ReviewProjection> getReviews();

    @Query(value = "select coalesce(avg(r.rate), 0) from reviews r", nativeQuery = true)
    Double getAverageRating();

}
