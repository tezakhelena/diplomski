package com.project.LostPaw.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "volunteering")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Volunteer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "volunteer_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonIgnore
    @JoinColumn(name = "applicant_id", nullable = false, insertable = false, updatable = false)
    private User applicant;

    @Column(name = "applicant_id")
    private Long applicantId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonIgnore
    @JoinColumn(name = "organization_id", nullable = false, insertable = false, updatable = false)
    private User organization;

    @Column(name = "organization_id")
    private Long organizationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "volunteer_type", insertable = false, updatable = false)
    private Attribute attribute;

    @Column(name = "volunteer_type")
    private Long volunteerType;

    @Column(name = "motivation", columnDefinition = "TEXT")
    private String motivation;

    @Column(name = "availability")
    private String availability;

    @Column(name = "applied_at")
    private LocalDateTime appliedAt;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonIgnore
    @JoinColumn(name = "status_id", nullable = false, insertable = false, updatable = false)
    private Attribute status;

    @Column(name = "status_id")
    private Long statusId;

    @Column(name = "experience", columnDefinition = "TEXT")
    private String experience;
}