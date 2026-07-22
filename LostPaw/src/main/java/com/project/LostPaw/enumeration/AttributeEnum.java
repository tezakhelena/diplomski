package com.project.LostPaw.enumeration;

import lombok.Getter;

@Getter
public enum AttributeEnum {

    //Korisnički statusi
    USER_ACTIVE(11L, "Aktivan", 1),
    USER_PENDING(12L, "U provjeri", 1),
    USER_SUSPENDED(13L, "Obustavljen", 1),

    //Statusi oglasa
    AD_ACTIVE(21L, "Aktivan", 2),
    AD_BLOCKED(22L, "Blokiran", 2),
    AD_RESOLVED(23L, "Uspješno rješeno", 2),
    AD_PENDING(24L, "U provjeri", 2),
    AD_IN_ADOPTION(25L, "U procesu udomljavanja", 2),

    //Statusi ljubimca
    PET_STILL_ROAMING(31L, "Još luta", 3),
    PET_WITH_OWNER(32L, "U mojoj prisutnosti", 3),
    PET_IN_SHELTER(33L, "U skloništu", 3),

    //Kategorije oglasa
    CATEGORY_WANTED(41L, "Traži se", 4),
    CATEGORY_FOUND(42L, "Pronađen", 4),
    CATEGORY_ABANDONED(43L, "Napušten", 4),

    //Vrste životinja
    SPECIES_DOG(51L, "Pas", 5),
    SPECIES_CAT(52L, "Mačka", 5),
    SPECIES_BIRD(53L, "Ptica", 5),
    SPECIES_OTHER(54L, "Ostalo", 5),

    //Statusi zahtjeva za udomljavanje
    ADOPTION_RECEIVED(61L, "Zahtjev zaprimljen", 6),
    ADOPTION_UNDER_REVIEW(62L, "U razmatranju", 6),
    ADOPTION_REQUEST_APPROVED(63L, "Zahtjev odobren", 6),
    ADOPTION_CANCELLED(64L, "Zahtjev otkazan", 6),
    ADOPTION_REQUEST_REJECTED(65L, "Zahtjev odbijen", 6),
    ADOPTION_EVALUATION_IN_PROGRESS(66L, "Rezultat procjene u tijeku", 6),
    ADOPTION_FINAL_APPROVED(67L, "Udomljavanje odobreno", 6),
    ADOPTION_FINAL_REJECTED(68L, "Udomljavanje odbijeno", 6),
    ADOPTION_SIGNING_CONTRACT(69L, "Potpisivanje ugovora", 6),
    ADOPTION_FINISHED(70L, "Proces završen", 6),

    //Statusi prijava za volontiranje
    VOLUNTEER_SUBMITTED(71L, "Prijava poslana", 7),
    VOLUNTEER_ACCEPTED(72L, "Prijava prihvaćena", 7),
    VOLUNTEER_REJECTED(73L, "Prijava odbijena", 7),

    // Business user types (tip 8)
    BUSINESS_VETERINARY_STATION(81L, "Veterinarska stanica", 8),
    BUSINESS_SHELTER_ANIMAL_ASYLUM(82L, "Udruga/Azil za ljubimce", 8),
    BUSINESS_PET_SHOPS(83L, "Pet shopovi", 8),
    BUSINESS_GROOMING_SALON(84L, "Saloni za njegu životinja", 8),
    BUSINESS_DOG_TRAINING_SCHOOL(85L, "Škole za trening i dresuru pasa", 8);

    private Long code;
    private Integer type;
    private String value;

    private AttributeEnum(Long code, String value, Integer type){
        this.code = code;
        this.value = value;
        this.type = type;
    }
}
