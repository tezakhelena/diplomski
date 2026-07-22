package com.project.LostPaw.repository;

import com.project.LostPaw.projections.CommentProjection;
import com.project.LostPaw.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query(value = """
        SELECT  
            c.comment_id as commentId,
            c.content AS content,  
            u.username AS username,  
            u.profile_picture_url AS profilePictureUrl,  
            c.created_at AS createdAt   
        FROM comments c   
        JOIN users u ON c.user_id = u.user_id   
        WHERE c.pet_ad_id = :petAdId
        ORDER BY c.created_at DESC
    """, nativeQuery = true)
    List<CommentProjection> findCommentsByPetAdId(Long petAdId);
    
}
