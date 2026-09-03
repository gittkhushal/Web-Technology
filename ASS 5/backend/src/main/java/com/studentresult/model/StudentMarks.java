package com.studentresult.model;

import jakarta.persistence.*;

@Entity
@Table(name = "student_marks")
public class StudentMarks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column(nullable = false)
    private String subjectName;

    @Column(nullable = false)
    private Double internalMarks;

    @Column(nullable = false)
    private Double externalMarks;

    @Column(nullable = false)
    private Double finalMarks;

    @Column(nullable = false)
    private Double percentage;

    @Column(nullable = false)
    private String grade;

    @PrePersist
    protected void calculateMarks() {
        this.finalMarks = this.internalMarks + this.externalMarks;
        this.percentage = (this.finalMarks / 100.0) * 100;
        calculateGrade();
    }

    private void calculateGrade() {
        if (percentage >= 90) this.grade = "A+";
        else if (percentage >= 80) this.grade = "A";
        else if (percentage >= 70) this.grade = "B+";
        else if (percentage >= 60) this.grade = "B";
        else if (percentage >= 50) this.grade = "C";
        else if (percentage >= 40) this.grade = "D";
        else this.grade = "F";
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public Double getInternalMarks() {
        return internalMarks;
    }

    public void setInternalMarks(Double internalMarks) {
        this.internalMarks = internalMarks;
    }

    public Double getExternalMarks() {
        return externalMarks;
    }

    public void setExternalMarks(Double externalMarks) {
        this.externalMarks = externalMarks;
    }

    public Double getFinalMarks() {
        return finalMarks;
    }

    public void setFinalMarks(Double finalMarks) {
        this.finalMarks = finalMarks;
    }

    public Double getPercentage() {
        return percentage;
    }

    public void setPercentage(Double percentage) {
        this.percentage = percentage;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }
}
