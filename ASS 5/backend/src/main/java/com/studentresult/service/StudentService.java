package com.studentresult.service;

import com.studentresult.dto.StudentDTO;
import com.studentresult.model.Student;
import com.studentresult.model.StudentMarks;
import com.studentresult.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    public StudentDTO createStudent(Student student) {
        Student savedStudent = studentRepository.save(student);
        return convertToDTO(savedStudent);
    }

    public StudentDTO getStudentById(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
        return convertToDTO(student);
    }

    public StudentDTO getStudentByRollNumber(String rollNumber) {
        Student student = studentRepository.findByRollNumber(rollNumber)
                .orElseThrow(() -> new RuntimeException("Student not found with roll number: " + rollNumber));
        return convertToDTO(student);
    }

    public List<StudentDTO> getAllStudents() {
        return studentRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<StudentDTO> searchStudentsByName(String name) {
        return studentRepository.findByNameContainingIgnoreCase(name)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public StudentDTO updateStudent(Long id, Student studentDetails) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
        
        student.setName(studentDetails.getName());
        student.setEmail(studentDetails.getEmail());
        
        Student updatedStudent = studentRepository.save(student);
        return convertToDTO(updatedStudent);
    }

    public void deleteStudent(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
        studentRepository.delete(student);
    }

    public StudentDTO calculateResult(Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + studentId));
        return convertToDTO(student);
    }

    private StudentDTO convertToDTO(Student student) {
        StudentDTO dto = new StudentDTO();
        dto.setId(student.getId());
        dto.setName(student.getName());
        dto.setRollNumber(student.getRollNumber());
        dto.setEmail(student.getEmail());

        if (student.getMarks() != null && !student.getMarks().isEmpty()) {
            dto.setMarks(student.getMarks().stream()
                    .map(m -> new com.studentresult.dto.StudentMarksDTO(
                            m.getId(), m.getSubjectName(), m.getInternalMarks(),
                            m.getExternalMarks(), m.getFinalMarks(), m.getPercentage(), m.getGrade()
                    ))
                    .collect(Collectors.toList()));

            double totalMarks = student.getMarks().stream()
                    .mapToDouble(StudentMarks::getFinalMarks)
                    .sum();
            dto.setTotalMarks(totalMarks);

            double overallPercentage = (totalMarks / (student.getMarks().size() * 100.0)) * 100;
            dto.setOverallPercentage(overallPercentage);

            dto.setOverallGrade(calculateOverallGrade(overallPercentage));
            dto.setResult(overallPercentage >= 40 ? "PASS" : "FAIL");
        }

        return dto;
    }

    private String calculateOverallGrade(double percentage) {
        if (percentage >= 90) return "A+";
        else if (percentage >= 80) return "A";
        else if (percentage >= 70) return "B+";
        else if (percentage >= 60) return "B";
        else if (percentage >= 50) return "C";
        else if (percentage >= 40) return "D";
        else return "F";
    }
}
