package com.project.LostPaw.enumeration;

import lombok.Getter;

@Getter
public enum AttributeTypeEnum {
    USER_STATUS(1, "Statusi korisnika"),
    AD_STATUS(2, "Statusi oglasa"),
    PET_STATUS(3, "Statusi ljubimca"),
    AD_CATEGORIES(4, "Kategorije oglasa"),
    PET_TYPE(5, "Vrsta životinje"),
    ADOPTION_STATUS(6, "Status udomljavanja"),
    VOLUNTEER_STATUS(7, "Status volontiranja"),
    BUSINESS_TYPE(8, "Tipovi poslovnih subjekata"),
    INQUIRY_TYPE(9, "Tipovi upita"),
    VOLUNTEER_TYPE(10, "Tipovi volontiranja"),
    BLOCK_REASON(11, "Razlozi blokiranja/prijave oglasa");

    private Integer code;
    private String value;

    private AttributeTypeEnum(Integer code, String value){
        this.code = code;
        this.value = value;
    }

    public static AttributeTypeEnum fromCode(Integer code) {
        for (AttributeTypeEnum type : values()) {
            if (type.getCode().equals(code)) {
                return type;
            }
        }
        return null;
    }
}
