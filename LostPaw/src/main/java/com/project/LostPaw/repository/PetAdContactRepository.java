package com.project.LostPaw.repository;

import com.project.LostPaw.entity.PetAdContact;
import com.project.LostPaw.projections.PetAdContactProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PetAdContactRepository extends JpaRepository<PetAdContact, Long> {
    @Query(value = """
    SELECT
        pac.contact_id AS contactId,
        pac.pet_ad_id AS petAdId,
        pac.sender_id AS senderId,
        pac.receiver_id AS receiverId,
        pac.subject,
        pac.message,
        pac.answer,
        pac.replied_at AS repliedAt,
        pac.created_at AS createdAt,
        pac.is_read AS isRead,
        CASE 
           WHEN :filterBy = 'zaprimljeno'
           THEN sender.user_id
           ELSE receiver.user_id
       END AS contactUserId,
       CASE
           WHEN :filterBy = 'zaprimljeno'
           THEN sender.username
           ELSE receiver.username
       END AS contactUsername,
       CASE
           WHEN :filterBy = 'zaprimljeno'
           THEN sender.profile_picture_url
           ELSE receiver.profile_picture_url
       END AS contactUserProfilePicture
    FROM pet_ad_contact pac
    JOIN users sender ON pac.sender_id = sender.user_id
    JOIN users receiver ON pac.receiver_id = receiver.user_id
    JOIN pet_ads pa ON pac.pet_ad_id = pa.pet_ad_id
    WHERE (
        :search IS NULL
        OR UPPER(pac.subject) LIKE UPPER(CONCAT('%', :search, '%'))
        OR UPPER(pac.message) LIKE UPPER(CONCAT('%', :search, '%'))
        OR UPPER(sender.username) LIKE UPPER(CONCAT('%', :search, '%'))
        OR UPPER(receiver.username) LIKE UPPER(CONCAT('%', :search, '%'))
        OR UPPER(pa.generated_name) LIKE UPPER(CONCAT('%', :search, '%'))
    )
    AND (
        (:filterBy = 'poslano' AND pac.sender_id = :userId)
        OR
        (:filterBy = 'zaprimljeno' AND pac.receiver_id = :userId)
    )
    ORDER BY
           CASE WHEN :sortDirection = 'ASC' THEN pac.created_at END ASC,
           CASE WHEN :sortDirection = 'DESC' THEN pac.created_at END DESC
    """, nativeQuery = true)
    List<PetAdContactProjection> findAllPetAdContacts(
            Long userId,
            String filterBy,
            String sortDirection,
            String search
    );
}
