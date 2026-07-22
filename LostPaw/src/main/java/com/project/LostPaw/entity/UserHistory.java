package com.project.LostPaw.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_history")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "history_id")
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "content", columnDefinition = "TEXT")
    private String content;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "created_by") // onaj korisnik koji je pokrenuo akciju
    private Long createdBy;

    @Column(name = "notification")
    private String notification;

    @Column(name = "is_read")
    private Integer isRead;

    @Column(name = "type")
    private Integer type;

    @Column(name = "pet_ad_id")
    private Long petAdId;
}