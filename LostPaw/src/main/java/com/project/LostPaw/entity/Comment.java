package com.project.LostPaw.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "comments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long id;

    @Column(name = "pet_ad_id")
    private Long petAdId; // oglas na koji se stavlja komentar

    @Column(name = "user_id")
    private Long userId; // korisnik koji stavlja komentar

    @Column(name = "content", columnDefinition = "TEXT")
    private String content; //sadrzaj komentara

    @Column(name = "created_at") // datum i vrijeme komentara
    private LocalDateTime createdAt;
}