package com.project.LostPaw.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChartStatisticsResponse {
    private List<UniversalStatisticsResponse> countyStatistics;
    private List<UniversalStatisticsResponse> businessUserStatistics;
    private List<UniversalStatisticsResponse> adsCountyStatistics;
    private List<UniversalStatisticsResponse> categoryStatistics;
    private List<UniversalStatisticsResponse> categoryAndDateStatistics;

    private List<UniversalStatisticsResponse> lastLoginCount;
    private List<UniversalStatisticsResponse> userActivityCount;
    private List<UniversalStatisticsResponse> adsByDate;
}
