package com.project.LostPaw.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "adoption_requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdoptionRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "adoption_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonIgnore
    @JoinColumn(name = "pet_ad_id", nullable = false, insertable = false, updatable = false)
    private PetAd petAd; // Oglas za koji se šalje zahtjev

    @Column(name = "pet_ad_id")
    private Long petAdId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonIgnore
    @JoinColumn(name = "user_id", nullable = false, insertable = false, updatable = false)
    private User user; // Korisnik

    @Column(name = "user_id")
    private Long userId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonIgnore
    @JoinColumn(name = "status_id", nullable = false, insertable = false, updatable = false)
    private Attribute status; // Status zahtjeva za udomljavanje

    @Column(name = "status_id")
    private Long statusId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonIgnore
    @JoinColumn(name = "ad_owner_id", nullable = false, insertable = false, updatable = false)
    private User adOwner; // Tko je objavio oglas

    @Column(name = "ad_owner_id")
    private Long adOwnerId;

    @Column(name = "created_at") // Datum kreiranja zahtjeva
    private LocalDateTime createdAt;

    private String experience;   // Iskustvo
    private String environment;
    private String reason;       // Razlog udomljavanja

    @Column(name = "is_evaluated") // Obavljena procjena potencijalnog udomitelja
    private boolean isEvaluated;

    @Column(name = "household_members") // Osoba za koju se udomljava životinja
    private String householdMembers;

    private String schedule;     // Zauzetost osobe
    private String allergies;    // Ima li osoba alergije
    private String address;      // Adresa udomitelja

    @Column(name = "is_open")    // Otvoren zahtjev
    private boolean isOpen;
}