package com.project.LostPaw.repository;

import com.project.LostPaw.projections.PetAdHistoryProjection;
import com.project.LostPaw.entity.PetAdHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PetAdHistoryRepository extends JpaRepository<PetAdHistory, Long> {

    @Query(value = """
        SELECT ph.user_id 
        FROM pet_ad_history ph 
        WHERE ph.status_id = 1
          AND ph.pet_ad_id = :petAdId
    """, nativeQuery = true)
    List<Long> findReportedUserIdsByPetAdId(Long petAdId);

    @Query(value = """
            select  
                ph.pet_ad_id as petAdId,  
                ph.changed_at as latestChangeDate,  
                ph.status_id as statusId,  
                ph.user_id as userId,  
                ph.reason as reason,  
                ai.url as primaryImage,  
                pa.generated_name as generatedName,  
                u.username as username  
            FROM pet_ad_history ph    
            join pet_ads pa on ph.pet_ad_id = pa.pet_ad_id   
            join pet_ad_pictures ai on pa.pet_ad_id = ai.pet_ad_id and ai.is_first = true  
            join users u on pa.user_id = u.user_id   
            where ph.status_id = :statusId 
            and pa.status_id = :statusId  
    """, nativeQuery = true)
    List<PetAdHistoryProjection> findAdStatusByStatusId(Long statusId);

    // 3. Native SQL upit - zadnji prijavljeni oglasi
    @Query(value = """
    SELECT   
        pa.generated_name as generatedName,  
        ph.pet_ad_id as petAdId,  
        MAX(ph.changed_at) AS latestChangeDate,  
        COUNT(ph.pet_ad_id) AS blockCount,  
        ph.status_id as statusId,  
        ai.url AS primaryImage  
    FROM pet_ad_history ph  
    JOIN pet_ads pa ON ph.pet_ad_id = pa.pet_ad_id  
    JOIN pet_ad_pictures ai ON pa.pet_ad_id = ai.pet_ad_id AND ai.is_first = true  
    WHERE ph.status_id = :statusId  
    GROUP BY ph.pet_ad_id, ph.status_id, ai.url, pa.generated_name 
    """, nativeQuery = true)
    List<PetAdHistoryProjection> findLastReportedAds(Long statusId);

    // 4. Native SQL upit - korisnici koji su prijavili oglas
    @Query(value = """
    select  
        ph.pet_ad_id as petAdId,  
        ph.changed_at as latestChangeDate,  
        ph.user_id as userId,  
        ph.comment as comment,  
        ph.reason as reason,  
        u.username as username,  
        u.profile_picture_url as profilePictureUrl  
    from pet_ad_history ph   
    join users u on ph.user_id = u.user_id   
    where ph.status_id = 24  
    and ph.pet_ad_id = :petAdId 
    """, nativeQuery = true)
    List<PetAdHistoryProjection> findUserReportedAd(Long petAdId);

    // 5. Native SQL upit - oglasi blokiranog korisnika
    @Query(value = """
    select   
            ph.pet_ad_id as petAdId,   
            MAX(ph.changed_at) as latestChangeDate,   
            ph.status_id as statusId,   
            pa.user_id as userId,   
            ph.reason as reason,   
            ai.url as primaryImage,   
            pa.generated_name as generatedName,
            a.value as statusValue
        FROM pet_ad_history ph     
        join pet_ads pa on ph.pet_ad_id = pa.pet_ad_id    
        join pet_ad_pictures ai on pa.pet_ad_id = ai.pet_ad_id and ai.is_first = true   
        join users u on pa.user_id = u.user_id    
        join attributes a on ph.status_id = a.attribute_id and a.attribute_type = 2
        where pa.user_id = :userId  
        and pa.status_id = 22 
        and ph.status_id = 22 
        group by ph.pet_ad_id, ph.status_id, pa.user_id, ph.reason, ai.url, pa.generated_name, a.value 
    """, nativeQuery = true)
    List<PetAdHistoryProjection> findAdsOfBlockedUser(Long userId);
}
