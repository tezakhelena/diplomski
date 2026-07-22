package com.project.LostPaw.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "contracts") // U bazi: tablica 'contracts'
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Contract {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contract_id") // U bazi: kolona 'contract_id'
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonIgnore
    @JoinColumn(name = "adoption_id", nullable = false, insertable = false, updatable = false)
    private AdoptionRequest adoption; // Promijenjeno u jedninu (AdoptionRequest)

    @Column(name = "adoption_id")
    private Long adoptionId;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "new_file_name")
    private String newFileName;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonIgnore
    @JoinColumn(name = "user_id", nullable = false, insertable = false, updatable = false)
    private User user;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "signed_status")
    private Integer signedStatus;

    @Column(name = "uploaded_at")
    private LocalDateTime uploadedAt;
}