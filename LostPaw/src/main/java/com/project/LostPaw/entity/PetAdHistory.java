package com.project.LostPaw.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "pet_ad_history") // povijest oglasa
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PetAdHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "history_id")
    private Long id;

    @Column(name = "pet_ad_id")
    private Long petAdId;

    @Column(name = "changed_at")
    private LocalDate changedAt;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonIgnore
    @JoinColumn(name = "status_id", nullable = false, insertable = false, updatable = false)
    private Attribute status;

    @Column(name = "status_id")
    private Long statusId;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "comment", columnDefinition = "TEXT")
    private String comment;

    @Column(name = "rate")
    private Integer rate;

    @Column(name = "reason") // razlog promjene statusa
    private String reason;
}