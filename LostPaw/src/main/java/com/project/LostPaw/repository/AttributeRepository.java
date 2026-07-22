package com.project.LostPaw.repository;

import com.project.LostPaw.entity.Attribute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AttributeRepository extends JpaRepository<Attribute, Long> {

    List<Attribute> findByTypeOrderByIdAsc(Integer type);

    @Query("""
        SELECT a FROM Attribute a 
        WHERE (:search IS NULL OR 
               UPPER(a.value) LIKE UPPER(CONCAT('%', :search, '%')) OR 
               UPPER(a.description) LIKE UPPER(CONCAT('%', :search, '%')))
        AND (:type IS NULL OR a.type = :type) 
        ORDER BY a.id ASC
    """)
    List<Attribute> getAllAttributes(String search, Integer type);
}
