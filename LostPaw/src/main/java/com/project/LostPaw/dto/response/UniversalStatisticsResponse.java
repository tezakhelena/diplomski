package com.project.LostPaw.dto.response;

import com.project.LostPaw.projections.UniversalStatisticsProjection;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UniversalStatisticsResponse {
    private String label;
    private Integer count;
    private LocalDate date;

    public UniversalStatisticsResponse(UniversalStatisticsProjection projection) {
        if (projection != null) {
            this.label = projection.getLabel();
            this.count = projection.getCount();
            this.date = projection.getDate();
        }
    }
}
