package com.project.LostPaw.repository;

import com.project.LostPaw.entity.Volunteer;
import com.project.LostPaw.projections.VolunteerApplicationProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface VolunteeringRepository extends JpaRepository<Volunteer, Long> {
    boolean existsByStatusId(Long statusId);
    boolean existsByVolunteerType(Long volunteerType);

    @Query(value = """
    select  
            v.volunteer_id as volunteerId,  
            v.applied_at as appliedAtDate,  
            v.applicant_id as applicantId,  
            v.organization_id as organizationId,   
            a.attribute_id as statusId,  
            a.value as status,
            a2.value as volunteerType,
            u1.username as applicantUsername,
            u2.username as organizationUsername,
            u1.profile_picture_url as applicantProfilePicture,
            u2.profile_picture_url as organizationProfilePicture,
            u1.city as applicantCity,
            u2.city as organizationCity
        from volunteering v   
        join users u1 on v.applicant_id = u1.user_id   
        join users u2 on v.organization_id = u2.user_id   
        left join attributes a on v.status_id = a.attribute_id and a.attribute_type = 7  
        left join attributes a2 on v.volunteer_type = a2.attribute_id and a2.attribute_type = 10
        WHERE (
          :search IS NULL
               OR UPPER(u1.username) LIKE UPPER(CONCAT('%', :search, '%'))
               OR UPPER(u2.username) LIKE UPPER(CONCAT('%', :search, '%'))
           )  
           AND (:statusId IS NULL OR a.attribute_id = :statusId)   
           AND (:volunteerType IS NULL OR a2.attribute_id = :volunteerType)   
           AND (
               (UPPER(:filterBy) = 'PODNOSITELJ' AND u1.user_id = :userId) 
               OR 
               (UPPER(:filterBy) = 'PODUZECE' AND u2.user_id = :userId)
           )
        ORDER BY
          CASE WHEN :sortDirection = 'ASC' THEN v.applied_at END ASC,
          CASE WHEN :sortDirection = 'DESC' THEN v.applied_at END DESC
""", nativeQuery = true)
    List<VolunteerApplicationProjection> getVolunteerApplications(
            String filterBy,
            Long userId,
            String sortDirection,
            String search,
            Long statusId,
            Long volunteerType
    );
}
