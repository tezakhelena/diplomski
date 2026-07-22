package com.project.LostPaw.repository;

import com.project.LostPaw.entity.Pet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PetRepository extends JpaRepository<Pet, Long> {
    boolean existsByBreedId(Long breedId);
    boolean existsByStatusId(Long statusId);

}
