package com.project.LostPaw.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlockedUserAdResponse {
    private Long petAdId;
    private LocalDate latestChangeDate;
    private Long statusId;
    private String statusValue;
    private String reason;
    private String primaryImage; // URL prve slike
    private String generatedName; // Naslov oglasa
    private Long userId;
}
