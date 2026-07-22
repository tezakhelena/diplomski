package com.project.LostPaw.repository;

import com.project.LostPaw.projections.InquiryProjection;
import com.project.LostPaw.entity.Inquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InquiryRepository extends JpaRepository<Inquiry, Long> {
    boolean existsByType(Long type);

    @Query(value = """
       SELECT  
             i.inquiry_id AS inquiryId,  
             i.question AS question,  
             i.user_id AS userId,  
             i.responder_id AS responderId,  
             i.type AS type,  
             i.created_at AS createdAt,  
             i.replied_at AS repliedAt,  
             i.answer AS answer,  
             u.username AS username,  
             u.profile_picture_url AS userProfilePicture,  
             r.username AS responderUsername,  
             r.profile_picture_url AS responderProfilePicture,
             a.value as typeValue
         FROM inquiries i   
         LEFT JOIN users u ON i.user_id = u.user_id   
         LEFT JOIN users r ON i.responder_id = r.user_id  
         LEFT JOIN attributes a on i.type = a.attribute_id and a.attribute_type = 9 
         WHERE (
            :search IS NULL
                 OR UPPER(i.question) LIKE UPPER(CONCAT('%', :search, '%'))
                 OR UPPER(i.answer) LIKE UPPER(CONCAT('%', :search, '%'))
                 OR UPPER(u.username) LIKE UPPER(CONCAT('%', :search, '%'))
                 OR UPPER(r.username) LIKE UPPER(CONCAT('%', :search, '%'))
             ) 
         AND (:userId IS NULL OR i.user_id = :userId)
         AND (:type IS NULL OR i.type = :type)
         ORDER BY
           CASE WHEN :sortDirection = 'ASC' THEN i.created_at END ASC,
           CASE WHEN :sortDirection = 'DESC' THEN i.created_at END DESC
    """, nativeQuery = true)
    List<InquiryProjection> findAllInquiries(
            Long userId,
            Integer type,
            String sortDirection,
            String search
    );
}
