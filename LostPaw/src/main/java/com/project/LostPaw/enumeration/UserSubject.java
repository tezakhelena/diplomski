package com.project.LostPaw.enumeration;

import lombok.Getter;

@Getter
public enum UserSubject {
    VETERINARY_STATION(81L, "Veterinarska stanica"),
    SHELTER_ANIMAL_ASYLUM(82L, "Udruga/Azil za ljubimce"),
    PET_SHOPS(83L, "Pet shopovi"),
    GROOMING_SALON(84L, "Saloni za njegu životinja"),
    DOG_TRAINING_SCHOOL(85L, "Škole za trening i dresuru pasa");

    private final Long code;
    private final String value;

    UserSubject(Long code, String value) {
        this.code = code;
        this.value = value;
    }

    public static String getValueByCode(Long code) {
        for (UserSubject type : values()) {
            if (type.getCode().equals(code)) {
                return type.getValue();
            }
        }
        return null;
    }
}