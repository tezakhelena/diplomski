package com.project.LostPaw.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "pet_ad_contact")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PetAdContact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contact_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonIgnore
    @JoinColumn(name = "pet_ad_id", nullable = false, insertable = false, updatable = false)
    private PetAd petAd;

    @Column(name = "pet_ad_id")
    private Long petAdId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonIgnore
    @JoinColumn(name = "sender_id", nullable = false, insertable = false, updatable = false)
    private User user;

    @Column(name = "sender_id")
    private Long senderId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonIgnore
    @JoinColumn(name = "receiver_id", nullable = false, insertable = false, updatable = false)
    private User receiver;

    @Column(name = "receiver_id")
    private Long receiverId;

    private String subject;
    private String message;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    private String answer;
    @Column(name = "replied_at")
    private LocalDateTime repliedAt;

    @Column(name = "is_read")
    private boolean isRead;
}
