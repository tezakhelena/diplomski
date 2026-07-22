package com.project.LostPaw.dto.response;

import com.project.LostPaw.entity.Attribute;
import com.project.LostPaw.entity.Breed;
import com.project.LostPaw.entity.County;
import com.project.LostPaw.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AttributeResponse {
    private Long code;
    private String value;
    private Integer type;
    private String description;
    private Long count;

    public AttributeResponse(Attribute entity, Long count) {
        if (entity != null) {
            this.code = entity.getId();
            this.value = entity.getValue();
            this.type = entity.getType();
            this.description = entity.getDescription();
            this.count = count;
        }
    }

    public AttributeResponse(County entity, Long count) {
        if (entity != null) {
            this.code = entity.getId();
            this.value = entity.getName();
            this.type = null;
            this.description = null;
            this.count = count;
        }
    }

    // 🌟 NOVO: Konstruktor za Breed (Pasminu)
    public AttributeResponse(Breed entity, Long count) {
        if (entity != null) {
            this.code = entity.getId(); // Ili getId() ovisno o entitetu Breed
            this.value = entity.getName(); // Naziv pasmine ide u 'value'
            this.type = null;
            this.description = null;
            this.count = count;
        }
    }

    public AttributeResponse(Role entity, Long count) {
        if (entity != null) {
            this.code = entity.getId(); // Ili getId() ovisno o entitetu Breed
            this.value = entity.getName(); // Naziv pasmine ide u 'value'
            this.type = null;
            this.description = null;
            this.count = count;
        }
    }
}
