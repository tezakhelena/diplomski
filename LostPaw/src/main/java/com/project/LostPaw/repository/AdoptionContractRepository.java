package com.project.LostPaw.repository;

import com.project.LostPaw.projections.AdoptionContractProjection;
import com.project.LostPaw.entity.Contract;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Repository
public interface AdoptionContractRepository extends JpaRepository<Contract, Long> {
    Optional<Contract> findByAdoptionId(Long adoptionId);

    @Query(value = """
    select  
        c.contract_id as contractId,  
        c.file_name as fileName,  
        c.new_file_name as newFileName,  
        c.uploaded_at as uploadedAt,  
        c.signed_status as signedStatus,  
        u.username as username,  
        u.profile_picture_url as profilePicture
    from contracts c   
    join users u on c.user_id = u.user_id   
    where c.adoption_id = :adoptionId
    """, nativeQuery = true)
    Optional<AdoptionContractProjection> getByAdoptionId(Long adoptionId);
}
