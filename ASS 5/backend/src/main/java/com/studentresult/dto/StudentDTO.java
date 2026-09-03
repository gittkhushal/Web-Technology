package com.studentresult.dto;

import java.util.List;

public class StudentDTO {
    private Long id;
    private String name;
    private String rollNumber;
    private String email;
    private List<StudentMarksDTO> marks;
    private Double totalMarks;
    private Double overallPercentage;
    private String overallGrade;
    private String result;

    public StudentDTO() {
    }

    public StudentDTO(Long id, String name, String rollNumber, String email, List<StudentMarksDTO> marks,
                      Double totalMarks, Double overallPercentage, String overallGrade, String result) {
        this.id = id;
        this.name = name;
        this.rollNumber = rollNumber;
        this.email = email;
        this.marks = marks;
        this.totalMarks = totalMarks;
        this.overallPercentage = overallPercentage;
        this.overallGrade = overallGrade;
        this.result = result;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRollNumber() {
        return rollNumber;
    }

    public void setRollNumber(String rollNumber) {
        this.rollNumber = rollNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<StudentMarksDTO> getMarks() {
        return marks;
    }

    public void setMarks(List<StudentMarksDTO> marks) {
        this.marks = marks;
    }

    public Double getTotalMarks() {
        return totalMarks;
    }

    public void setTotalMarks(Double totalMarks) {
        this.totalMarks = totalMarks;
    }

    public Double getOverallPercentage() {
        return overallPercentage;
    }

    public void setOverallPercentage(Double overallPercentage) {
        this.overallPercentage = overallPercentage;
    }

    public String getOverallGrade() {
        return overallGrade;
    }

    public void setOverallGrade(String overallGrade) {
        this.overallGrade = overallGrade;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }
}
