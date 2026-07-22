package com.project.LostPaw.enumeration;

import lombok.Getter;

@Getter
public enum RolesEnum {

    ADMINISTRATOR(1L, "Administrator"),
    KORISNIK(2L, "Korisnik"),
    NEPOTPUNI_PROFIL(3L, "Nepotpuni profil");

    private Long code;
    private String value;

    private RolesEnum(Long code, String value){
        this.code = code;
        this.value = value;
    }
}
