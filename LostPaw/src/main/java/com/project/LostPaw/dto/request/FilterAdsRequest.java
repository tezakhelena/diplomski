package com.project.LostPaw.dto.request;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FilterAdsRequest {
    private Long statusId;
    private Long categoryId;
    private Long speciesId;
    private Long countyId;
    private Long breedId;
    private Long petAdId;
    private Long userId;
    private String gender;
    private String maturity;
    private String sortDirection;
    private String search;
}
