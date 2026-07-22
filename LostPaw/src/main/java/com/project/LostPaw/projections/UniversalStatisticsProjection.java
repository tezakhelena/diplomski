package com.project.LostPaw.projections;

import java.time.LocalDate;

public interface UniversalStatisticsProjection {
    String getLabel();
    Integer getCount();
    LocalDate getDate();
}
