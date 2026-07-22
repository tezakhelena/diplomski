package com.project.LostPaw.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaveAdRequest {
    private Long petAdId;
    private Long categoryId;
    private Long countyId;
    private Long speciesId;
    private boolean forceCreate;
    private String city;
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate missingDate; // Promijenjeno u LocalDate radi izbjegavanja konverzija
    private Long statusId;
    private String notes;
    private Long userId;
    private String gender;
    private String maturity;
    private Long breedId;
    private String petName;
    private String furColor;
    private BigDecimal reward;
}
