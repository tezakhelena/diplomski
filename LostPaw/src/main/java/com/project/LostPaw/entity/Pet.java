package com.project.LostPaw.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "pets") //ljubimac
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pet_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonIgnore
    @JoinColumn(name = "status_id", nullable = false, insertable = false, updatable = false)
    private Attribute status;

    @Column(name = "status_id")
    private Long statusId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonIgnore
    @JoinColumn(name = "species_id", nullable = false, insertable = false, updatable = false)
    private Attribute species; // vrsta ljubimca

    @Column(name = "species_id")
    private Long speciesId;

    @Column(name = "missing_date")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate missingDate;

    @Column(name = "gender")
    private String gender;

    @Column(name = "maturity") //odnosi se na štene, odrastao pas...
    private String maturity;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "breed_id", nullable = false, insertable = false, updatable = false)
    private Breed breed;

    @Column(name = "breed_id") //pasmina
    private Long breedId;

    @Column(name = "fur_color")
    private String furColor;

    @Column(name = "name")
    private String name;
}