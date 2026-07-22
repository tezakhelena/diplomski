package com.project.LostPaw.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChangeAdStatusRequest {
    private Long petAdId;
    private Integer reasonCode;
    private Long userId;
    private Integer rate;
    private Long statusId;
    private String comment;
}
