package com.project.LostPaw.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "inquiries") // Upiti
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Inquiry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "inquiry_id")
    private Long id;

    @Column(name = "user_id") // Korisnik koji je postavio upit
    private Long userId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonIgnore
    @JoinColumn(name = "user_id", nullable = false, insertable = false, updatable = false)
    private User user;

    @Column(name = "responder_id") // Korisnik koji je odgovorio na upit
    private Long responderId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonIgnore
    @JoinColumn(name = "responder_id", nullable = false, insertable = false, updatable = false)
    private User responder;

    @Column(name = "question", columnDefinition = "TEXT")
    private String question; //sadrzaj uputa

    @Column(name = "answer", columnDefinition = "TEXT")
    private String answer; //odgovor na upit

    @Column(name = "type")
    private Long type;

    @Column(name = "created_at") // datum postavljenog upita
    private LocalDateTime createdAt;

    @Column(name = "replied_at") // datum odgovora
    private LocalDateTime repliedAt;
}