package com.onlinecourse.portal.entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "assignments")
public class Assignment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(optional = false)
    private Course course;
    @ManyToOne(optional = false)
    private User student;
    private String title;
    private String submissionUrl;
    private Instant submittedAt = Instant.now();
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Course getCourse() { return course; }
    public void setCourse(Course course) { this.course = course; }
    public User getStudent() { return student; }
    public void setStudent(User student) { this.student = student; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getSubmissionUrl() { return submissionUrl; }
    public void setSubmissionUrl(String submissionUrl) { this.submissionUrl = submissionUrl; }
    public Instant getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(Instant submittedAt) { this.submittedAt = submittedAt; }
}
