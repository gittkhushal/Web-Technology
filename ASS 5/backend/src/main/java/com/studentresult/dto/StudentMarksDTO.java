package com.studentresult.dto;

public class StudentMarksDTO {
    private Long id;
    private String subjectName;
    private Double internalMarks;
    private Double externalMarks;
    private Double finalMarks;
    private Double percentage;
    private String grade;

    public StudentMarksDTO() {
    }

    public StudentMarksDTO(Long id, String subjectName, Double internalMarks, Double externalMarks,
                          Double finalMarks, Double percentage, String grade) {
        this.id = id;
        this.subjectName = subjectName;
        this.internalMarks = internalMarks;
        this.externalMarks = externalMarks;
        this.finalMarks = finalMarks;
        this.percentage = percentage;
        this.grade = grade;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
