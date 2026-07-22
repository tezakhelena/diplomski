package com.project.LostPaw.repository;
import com.project.LostPaw.entity.User;
import com.project.LostPaw.projections.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);
    User findByEmail(String email);
    List<User> findByStatusId(Long statusId);
    long countByStatusId(Long statusId);
    boolean existsByStatusId(Long statusId);

    @Query(value = """
        SELECT          
           k.user_id AS userId,          
           k.first_name AS firstName,          
           k.last_name AS lastName,          
           k.username AS username,          
           r.name AS roleName,          
           v.value AS status,      
           k.profile_picture_url AS profilePictureUrl,      
           k.status_id AS statusId,   
           k.registration_date AS registrationDate, 
           attr.value AS businessUserType, 
           attr.attribute_id as businessTypeId,
           bp.website AS website, 
           k.private_user AS privateUser,
           k.email  
        FROM users k          
        LEFT JOIN attributes v ON k.status_id = v.attribute_id AND v.attribute_type = 1   
        LEFT JOIN roles r ON k.role_id = r.role_id
        LEFT JOIN business_profiles bp ON k.user_id = bp.user_id
        LEFT JOIN attributes attr ON bp.business_type_id = attr.attribute_id AND attr.attribute_type = 8
        WHERE (
           :search IS NULL
                OR UPPER(k.first_name) LIKE UPPER(CONCAT('%', :search, '%'))
                OR UPPER(k.last_name) LIKE UPPER(CONCAT('%', :search, '%'))
                OR UPPER(k.username) LIKE UPPER(CONCAT('%', :search, '%'))
                OR UPPER(k.email) LIKE UPPER(CONCAT('%', :search, '%'))
                OR UPPER(attr.value) LIKE UPPER(CONCAT('%', :search, '%'))
                OR UPPER(bp.oib) LIKE UPPER(CONCAT('%', :search, '%'))
            )
          AND (:firstName IS NULL OR UPPER(k.first_name) LIKE UPPER(CONCAT('%', :firstName, '%')))          
          AND (:lastName IS NULL OR UPPER(k.last_name) LIKE UPPER(CONCAT('%', :lastName, '%')))          
          AND (:username IS NULL OR UPPER(k.username) LIKE UPPER(CONCAT('%', :username, '%')))          
          AND (:statusId IS NULL OR k.status_id = :statusId)          
          AND (:roleId IS NULL OR k.role_id = :roleId) 
          AND (:businessTypeId IS NULL OR bp.business_type_id = :businessTypeId)   
          AND (:isPrivateUser IS NULL OR k.private_user = :isPrivateUser)
          ORDER BY
          CASE WHEN :sortDirection = 'ASC' THEN k.registration_date END ASC,
          CASE WHEN :sortDirection = 'DESC' THEN k.registration_date END DESC
    """, nativeQuery = true)
    List<UserProjection> getAllUsers(
            String firstName,
            String lastName,
            String username,
            Long statusId,
            Long roleId,
            Boolean isPrivateUser,
            Long businessTypeId,
            String sortDirection,
            String search
    );

    @Query(value = "SELECT k.user_id AS userId FROM users k WHERE k.county_id = :countyId AND k.city = :city", nativeQuery = true)
    List<UserProjection> getUsersFromCountyAndCity(Long countyId, String city);

    @Query(value = """
    SELECT   
        c.name AS label,   
        COUNT(u.user_id) AS count   
    FROM users u  
    JOIN counties c ON u.county_id = c.county_id  
    GROUP BY c.name 
    """, nativeQuery = true)
    List<UniversalStatisticsProjection> findUserCountByRegion();

    @Query(value = """
    SELECT    
        CASE 
            WHEN u.private_user = true THEN 'Privatni korisnik' 
            ELSE 'Poslovni korisnik' 
        END AS label,   
        COUNT(u.user_id) AS count   
    FROM users u  
    GROUP BY u.private_user  
    """, nativeQuery = true)
    List<UniversalStatisticsProjection> findUserCountBySubject();

    @Query(value = """
    select  
        DATE(u.last_login) AS date,  
        count(*) as count,  
        'Logins' AS label  
    from users u  
    group by DATE(u.last_login) 
    order by date asc   
    """, nativeQuery = true)
    List<UniversalStatisticsProjection> findUserCountByLastLogin();

    @Query(value = """
    select  
        DATE(uh.created_at) AS date,  
        count(*) as count,  
        'Activity' AS label  
    from user_history uh  
    group by DATE(uh.created_at) 
    order by date asc   
    """, nativeQuery = true)
    List<UniversalStatisticsProjection> findUserActivityCountByDate();

    @Query(value = """
        SELECT DISTINCT   
            u.user_id AS userId,  
            u.first_name AS firstName,            
            u.last_name AS lastName,            
            u.username AS username,            
            r.name AS roleName,            
            a.value AS status,        
            u.profile_picture_url AS profilePictureUrl,        
            u.registration_date AS registrationDate,    
            uh.notification AS reason,    
            u.status_id AS statusId,
            u.private_user AS privateUser   
        FROM users u            
        LEFT JOIN attributes a ON u.status_id = a.attribute_id AND a.attribute_type = 1     
        LEFT JOIN roles r ON u.role_id = r.role_id      
        INNER JOIN user_history uh ON uh.user_id = u.user_id AND uh.type = :tip  
        INNER JOIN (  
            SELECT   
                user_id,   
                MAX(created_at) AS last_blocked_date  
            FROM user_history  
            WHERE type = :tip  
            GROUP BY user_id  
        ) latest_block   
        ON uh.user_id = latest_block.user_id   
        AND uh.created_at = latest_block.last_blocked_date  
        WHERE u.status_id = :idStatusa         
    """, nativeQuery = true)
    List<UserProjection> findBlockedUsers(Long idStatusa, Integer tip);

    @Query(value = """
    SELECT 
        u.user_id AS subjectId, 
        u.first_name AS subject, 
        attr.value AS businessUserType,
        u.profile_picture_url AS profilePictureUrl
    FROM users u 
    JOIN business_profiles bp ON u.user_id = bp.user_id
    LEFT JOIN attributes attr ON bp.business_type_id = attr.attribute_id AND attr.attribute_type = 8
    WHERE u.private_user = false
    """, nativeQuery = true)
    List<BusinessUsersProjection> getBusinessUsers();
}
