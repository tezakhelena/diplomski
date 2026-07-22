package com.project.LostPaw.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PetDetailResponse {
    private String name;
    private LocalDate missingDate;
    private String gender;
    private String maturity;
    private String furColor;

    // Status
    private Long statusId;
    private String status;

    // Vrsta (Species)
    private Long speciesId;
    private String species;

    // Pasmina (Breed)
    private Long breedId;
    private String breed;
}
