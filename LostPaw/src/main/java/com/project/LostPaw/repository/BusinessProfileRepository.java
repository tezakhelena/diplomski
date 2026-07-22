package com.project.LostPaw.repository;

import com.project.LostPaw.entity.BusinessProfiles;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BusinessProfileRepository extends JpaRepository<BusinessProfiles, Long> {
    Optional<BusinessProfiles> findByUserId(Long userId);
    boolean existsByBusinessType(Long id);
    boolean existsByOib(String oib);
}
