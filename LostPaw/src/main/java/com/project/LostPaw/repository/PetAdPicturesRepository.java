package com.project.LostPaw.repository;

import com.project.LostPaw.entity.PetAdPicture;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PetAdPicturesRepository extends JpaRepository<PetAdPicture, Long> {
    List<PetAdPicture> findByPetAdId(Long petAdId);
}
