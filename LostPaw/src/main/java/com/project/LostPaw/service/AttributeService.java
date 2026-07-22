package com.project.LostPaw.service;
import com.project.LostPaw.dto.request.AttributeFilterRequest;
import com.project.LostPaw.dto.response.AttributeResponse;
import com.project.LostPaw.entity.Attribute;

import java.util.List;

public interface AttributeService {
    List<AttributeResponse> getStatusesByType(Integer type);
    List<AttributeResponse> getCategories();
    List<AttributeResponse> getSpecies();
    List<AttributeResponse> getCounties();
    List<AttributeResponse> getBreedsBySpeciesId(Long speciesId);
    List<AttributeResponse> getRoles();
    List<AttributeResponse> getBusinessUserTypes();
    Attribute saveAttribute(Attribute attribute);
    Attribute updateAttribute(Long id, Attribute attribute);
    void deleteAttribute(Long id);
    List<AttributeResponse> getAllAttributes(AttributeFilterRequest request);

}
