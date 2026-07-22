package com.project.LostPaw.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "pet_ad_pictures")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PetAdPicture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "picture_id")
    private Long id;

    @Column(name = "pet_ad_id")
    private Long petAdId;

    @Column(name = "url")
    private String url;

    @Column(name = "is_first") //dal je prva slika, primarna
    private boolean isFirst;
}