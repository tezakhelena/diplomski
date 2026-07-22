package com.project.LostPaw.controller;
import com.project.LostPaw.dto.request.AttributeFilterRequest;
import com.project.LostPaw.dto.response.AttributeResponse;
import com.project.LostPaw.entity.Attribute;
import com.project.LostPaw.service.AttributeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attribute")
@CrossOrigin
public class AttributeController {

    @Autowired
    AttributeService attributeService;

    @GetMapping("/categories")
    public ResponseEntity<List<AttributeResponse>> getCategories(){
        return ResponseEntity.ok(attributeService.getCategories());
    }

    @GetMapping("/species")
    public ResponseEntity<List<AttributeResponse>> getSpecies(){
        return ResponseEntity.ok(attributeService.getSpecies());
    }

    @GetMapping("/counties")
    public ResponseEntity<List<AttributeResponse>> getCounties() {
        return ResponseEntity.ok(attributeService.getCounties());
    }

    @GetMapping("/status/{type}")
    public ResponseEntity<List<AttributeResponse>> getStatusesByType(@PathVariable Integer type){
        return ResponseEntity.ok(attributeService.getStatusesByType(type));
    }

    @GetMapping("/breed/{speciesId}")
    public ResponseEntity<List<AttributeResponse>> getBreeds(@PathVariable("speciesId") Long speciesId) {
        return ResponseEntity.ok(attributeService.getBreedsBySpeciesId(speciesId));
    }

    @GetMapping("/roles")
    public ResponseEntity<List<AttributeResponse>> getRoles(){
        return ResponseEntity.ok(attributeService.getRoles());
    }

    @GetMapping("/bussiness_types")
    public ResponseEntity<List<AttributeResponse>> getBusinessUserTypes(){
        return ResponseEntity.ok(attributeService.getBusinessUserTypes());
    }

    @PostMapping("/all")
    public ResponseEntity<List<AttributeResponse>> getAllAttributes(@RequestBody AttributeFilterRequest request){
        return ResponseEntity.ok(attributeService.getAllAttributes(request));
    }

    @PostMapping("/admin/add")
    public ResponseEntity<Attribute> addAttribute(@RequestBody Attribute attribute) {
        return ResponseEntity.ok(attributeService.saveAttribute(attribute));
    }

    @PutMapping("/admin/update/{id}")
    public ResponseEntity<Attribute> updateAttribute(@PathVariable Long id, @RequestBody Attribute attribute) {
        return ResponseEntity.ok(attributeService.updateAttribute(id, attribute));
    }

    @DeleteMapping("/admin/delete/{id}")
    public ResponseEntity<Void> deleteAttribute(@PathVariable Long id) {
        attributeService.deleteAttribute(id);
        return ResponseEntity.noContent().build();
    }
}
