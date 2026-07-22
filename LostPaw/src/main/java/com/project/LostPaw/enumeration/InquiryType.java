package com.project.LostPaw.enumeration;

import lombok.Getter;

@Getter
public enum InquiryType {
    INQUIRY_TYPE_TECHNICAL_SUPPORT(91L, "Tehnička podrška"),
    INQUIRY_TYPE_ADOPTION(92L, "Pitanje o procesu udomljavanja"),
    INQUIRY_TYPE_PET_HEALTH(93L, "Savjet o zdravlju ljubimca"),
    INQUIRY_TYPE_PET_CARE(94L, "Savjet o njezi ljubimca");
    private Long code;
    private String value;

    private InquiryType(Long code, String value){
        this.code = code;
        this.value = value;
    }
}
