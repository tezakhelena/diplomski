package com.project.LostPaw.repository;
import com.project.LostPaw.entity.Breed;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BreedRepository extends JpaRepository<Breed, Long> {
    List<Breed> findBySpeciesIdOrderByNameAsc(Long speciesId);
}
