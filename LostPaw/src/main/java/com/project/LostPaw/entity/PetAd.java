package com.project.LostPaw.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "pet_ads") // oglasi
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PetAd {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pet_ad_id")
    private Long id;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    @Column(name = "created_at")
    private LocalDate createdAt;

    @Column(name = "expiration_date") // rok oglasa
    private LocalDate expirationDate;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonIgnore
    @JoinColumn(name = "status_id", nullable = false, insertable = false, updatable = false)
    private Attribute status;

    @Column(name = "status_id")
    private Long statusId;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "city")
    private String city;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonIgnore
    @JoinColumn(name = "user_id", nullable = false, insertable = false, updatable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonIgnore
    @JoinColumn(name = "category_id", nullable = false, insertable = false, updatable = false)
    private Attribute category; //kategorija

    @Column(name = "category_id")
    private Long categoryId;

    @Column(name = "generated_name") //generirani naziv oglasa
    private String generatedName;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonIgnore
    @JoinColumn(name = "county_id", nullable = false, insertable = false, updatable = false)
    private County county;

    @Column(name = "county_id")
    private Long countyId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonIgnore
    @JoinColumn(name = "pet_id", nullable = false, insertable = false, updatable = false)
    private Pet pet;

    @Column(name = "pet_id")
    private Long petId;

    @Column(name = "views")
    private Integer views;

    @Column(name = "reward", precision = 10, scale = 2)
    private BigDecimal reward;
}