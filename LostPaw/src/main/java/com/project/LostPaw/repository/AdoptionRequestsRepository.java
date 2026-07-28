package com.project.LostPaw.repository;

import com.project.LostPaw.projections.AdoptionRequestsProjection;
import com.project.LostPaw.entity.AdoptionRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdoptionRequestsRepository extends JpaRepository<AdoptionRequest, Long> {
    boolean existsByStatusId(Long statusId);

    @Query(value = """
       SELECT  
             ar.adoption_id AS adoptionId,  
             ar.pet_ad_id AS petAdId,  
             ar.created_at AS createdAt,  
             a.user_id AS applicantId,  
             a.username AS applicantUsername,  
             a.profile_picture_url AS applicantProfilePicture,  
             o.user_id AS adOwnerId,  
             o.username AS adOwnerUsername,  
             o.profile_picture_url AS adOwnerProfilePicture,  
             attr.attribute_id AS statusId,  
             attr.value AS statusValue   
        FROM adoption_requests ar   
        JOIN pet_ads pad ON ar.pet_ad_id = pad.pet_ad_id   
        JOIN users a ON ar.user_id = a.user_id   
        JOIN users o ON ar.ad_owner_id = o.user_id   
        LEFT JOIN pet_ad_pictures pap ON pad.pet_ad_id = pap.pet_ad_id AND pap.is_first = true  
        JOIN attributes attr ON ar.status_id = attr.attribute_id AND attr.attribute_type = 6  
        WHERE (
               (:search IS NULL OR UPPER(a.username) LIKE UPPER(CONCAT('%', :search, '%'))
               OR UPPER(o.username) LIKE UPPER(CONCAT('%', :search, '%'))
               OR UPPER(pad.generated_name) LIKE UPPER(CONCAT('%', :search, '%')))
           )
           AND (:statusId IS NULL OR attr.attribute_id = :statusId)
           AND (
               :filterBy IS NULL
               OR TRIM(:filterBy) = ''
               OR (
                   UPPER(:filterBy) = 'APPLICANT'
                   AND a.user_id = :userId
               )
               OR (
                   UPPER(:filterBy) = 'OWNER'
                   AND o.user_id = :userId
               )
           )
        ORDER BY
           CASE WHEN :sortDirection = 'ASC' THEN ar.created_at END ASC,
           CASE WHEN :sortDirection = 'DESC' THEN ar.created_at END DESC  
    """, nativeQuery = true)
    List<AdoptionRequestsProjection> findAdoptionRequests(String filterBy, Long userId, String sortDirection, String search, Long statusId);
}
