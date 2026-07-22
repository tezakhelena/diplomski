package com.project.LostPaw.repository;
import com.project.LostPaw.entity.PetAd;
import com.project.LostPaw.projections.PetAdProjection;
import com.project.LostPaw.projections.UniversalStatisticsProjection;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PetAdRepository extends JpaRepository<PetAd, Long> {

    List<PetAd> findByStatusId(Long statusId);
    long countByStatusId(Long statusId);
    boolean existsByStatusId(Long statusId);
    boolean existsByCategoryId(Long categoryId);

    @Query(value = """
        SELECT            
            pa.pet_ad_id AS petAdId,           
            p.missing_date AS missingDate,         
            pa.created_at AS createdAt,             
            pap.url AS primaryImage,             
            c.name AS county,         
            p.gender AS gender,         
            p.name AS petName,  
            p.maturity AS maturity,  
            a.value AS category,  
            a.attribute_id AS categoryId,  
            b.name AS breed,  
            pa.city AS city,  
            pa.views AS views,  
            pa.reward AS reward,
            pa.generated_name AS generatedTitle,
            pa.notes AS notes,
            pa.user_id AS userId,
            a2.value as species,
            a2.attribute_id as speciesId,
            a3.attribute_id AS statusId,  
            a3.value AS status 
        FROM pet_ads pa      
        JOIN pets p ON pa.pet_id = p.pet_id          
        JOIN attributes a ON pa.category_id = a.attribute_id AND a.attribute_type = 4             
        JOIN attributes a2 ON p.species_id = a2.attribute_id AND a2.attribute_type = 5             
        LEFT JOIN attributes a3 ON pa.status_id = a3.attribute_id          
        LEFT JOIN pet_ad_pictures pap ON pa.pet_ad_id = pap.pet_ad_id AND pap.is_first = true            
        LEFT JOIN counties c ON pa.county_id = c.county_id         
        JOIN users u ON pa.user_id = u.user_id      
        JOIN breeds b ON p.breed_id = b.breed_id   
        WHERE (
           :search IS NULL
                OR UPPER(c.name) LIKE UPPER(CONCAT('%', :search, '%'))
                OR UPPER(a.value) LIKE UPPER(CONCAT('%', :search, '%'))
                OR UPPER(b.name) LIKE UPPER(CONCAT('%', :search, '%'))
                OR UPPER(pa.city) LIKE UPPER(CONCAT('%', :search, '%'))
                OR UPPER(pa.generated_name) LIKE UPPER(CONCAT('%', :search, '%'))
                OR UPPER(a2.value) LIKE UPPER(CONCAT('%', :search, '%'))
            )
          AND (:statusId IS NULL OR pa.status_id = :statusId)            
          AND (:categoryId IS NULL OR pa.category_id = :categoryId)            
          AND (:speciesId IS NULL OR p.species_id = :speciesId)            
          AND (:petAdId IS NULL OR pa.pet_ad_id != :petAdId)            
          AND (:userId IS NULL OR pa.user_id = :userId)  
          AND (:breedId IS NULL OR p.breed_id = :breedId)         
          AND (:countyId IS NULL OR c.county_id = :countyId)     
          AND (:gender IS NULL OR p.gender = :gender)     
          AND (:maturity IS NULL OR p.maturity = :maturity)     
          AND u.status_id != 13  
          AND pa.status_id != 22
          ORDER BY
          CASE WHEN :sortDirection = 'ASC' THEN pa.created_at END ASC,
          CASE WHEN :sortDirection = 'DESC' THEN pa.created_at END DESC
    """, nativeQuery = true)
    List<PetAdProjection> findAllPetAds(
            Long statusId,
            Long categoryId,
            Long speciesId,
            Long countyId,
            Long petAdId,
            Long userId,
            Long breedId,
            String gender,
            String maturity,
            String sortDirection,
            String search
    );

    @Query(value = """
    SELECT            
            pa.pet_ad_id AS petAdId,           
            p.missing_date AS missingDate,         
            pa.created_at AS createdAt,             
            pap.url AS primaryImage,             
            c.name AS county,         
            p.gender AS gender,         
            p.name AS petName,  
            p.maturity AS maturity,  
            a.value AS category,  
            a.attribute_id AS categoryId,  
            b.name AS breed,  
            pa.city AS city,  
            pa.views AS views,  
            pa.reward AS reward,
            pa.generated_name AS generatedTitle,
            pa.notes AS notes,
            pa.user_id AS userId,
            a2.value as species,
            a2.attribute_id as speciesId,
            a3.attribute_id AS statusId,  
            a3.value AS status 
        FROM pet_ads pa      
        JOIN pets p ON pa.pet_id = p.pet_id          
        JOIN attributes a ON pa.category_id = a.attribute_id AND a.attribute_type = 4             
        JOIN attributes a2 ON p.species_id = a2.attribute_id AND a2.attribute_type = 5             
        LEFT JOIN attributes a3 ON pa.status_id = a3.attribute_id          
        LEFT JOIN pet_ad_pictures pap ON pa.pet_ad_id = pap.pet_ad_id AND pap.is_first = true            
        LEFT JOIN counties c ON pa.county_id = c.county_id         
        JOIN users u ON pa.user_id = u.user_id      
        JOIN breeds b ON p.breed_id = b.breed_id   
        WHERE (:userId IS NULL OR pa.user_id = :userId)  
        ORDER BY pa.created_at DESC
    """, nativeQuery = true)
    List<PetAdProjection> findAllPetAdsNoFilter(Long userId);

    @Query(value = """
        SELECT       
            pa.pet_ad_id AS petAdId,      
            p.missing_date AS missingDate,    
            pap.url AS primaryImage,        
            c.name AS county,    
            p.gender AS gender,    
            b.name AS breed,  
            p.name AS petName,    
            a.value AS category,  
            p.maturity AS maturity,
            a.attribute_id AS categoryId,
            pa.created_at AS createdAt,
            pa.city AS city,
            pa.views AS views,
            pa.reward AS reward,
            pa.generated_name AS generatedTitle,
            pa.notes AS notes,
            pa.user_id AS userId,
            a3.value as status,
            a3.attribute_id as statusId
        FROM pet_ads pa    
        JOIN pets p ON pa.pet_id = p.pet_id    
        JOIN breeds b ON p.breed_id = b.breed_id   
        JOIN attributes a ON pa.category_id = a.attribute_id AND a.attribute_type = 4
        JOIN attributes a3 ON pa.status_id = a3.attribute_id AND a3.attribute_type = 2   
        LEFT JOIN pet_ad_pictures pap ON pa.pet_ad_id = pap.pet_ad_id AND pap.is_first = true       
        LEFT JOIN counties c ON pa.county_id = c.county_id     
        WHERE pa.created_at >= CURRENT_DATE - INTERVAL '7 days'  
          AND pa.status_id != 22  
    """, nativeQuery = true)
    List<PetAdProjection> findPetAdsByLast7Days();

    @Query(value = """
        SELECT a.value, COUNT(pa.pet_ad_id) 
        FROM pet_ads o
        JOIN pets p ON pa.pet_id = p.pet_id
        JOIN attributes a ON p.species_id = a.attribute_id
        GROUP BY a.value
    """, nativeQuery = true)
    List<Object[]> countByPetType();

    @Query(value = """
    select  
        c.name as label,  
        count(pa.pet_ad_id) as count   
    from pet_ads pa   
    join counties c on pa.county_id = c.county_id   
    group by c.name  
    """, nativeQuery = true)
    List<UniversalStatisticsProjection> findPetAdsCountByRegion();

    @Query(value = """
    select  
        a.value as label,  
        count(pa.pet_ad_id) as count   
    from pet_ads pa   
    join attributes a on pa.category_id = a.attribute_id   
    group by a.value   
    """, nativeQuery = true)
    List<UniversalStatisticsProjection> findPetAdsCountByCategory();

    @Query(value = """
    select  
        pa.created_at AS date,  
        a.value as label,  
        count(pa.pet_ad_id) as count   
    from pet_ads pa   
    join attributes a on pa.category_id = a.attribute_id   
    group by pa.created_at, a.value   
    order by date asc 
    """, nativeQuery = true)
    List<UniversalStatisticsProjection> findPetAdsCategoryCountAndDate();

    @Query(value = """
    select  
        DATE(pa.created_at) AS date,  
        count(*) as count,  
        'Oglasi' AS label  
    from pet_ads pa  
    group by DATE(pa.created_at) 
    order by date asc 
    """, nativeQuery = true)
    List<UniversalStatisticsProjection> findPetAdsCountByCreationDate();

    @Modifying
    @Transactional
    @Query(value = "UPDATE pet_ads SET status_id = 21 where pet_ad_id = :petAdId", nativeQuery = true)
    void reactivatePetAd(Long petAdId);
}
