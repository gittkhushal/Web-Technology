-- PostgreSQL Database Setup Script for Student Result System

-- Create Database
CREATE DATABASE student_result_db;

-- Connect to the database
\c student_result_db

-- Create Students Table
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    roll_number VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Student Marks Table
CREATE TABLE student_marks (
    id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    subject_name VARCHAR(100) NOT NULL,
    internal_marks DECIMAL(5,2) NOT NULL,
    external_marks DECIMAL(5,2) NOT NULL,
    final_marks DECIMAL(5,2) NOT NULL,
    percentage DECIMAL(5,2) NOT NULL,
    grade VARCHAR(5) NOT NULL
);

-- Create Indexes
CREATE INDEX idx_roll_number ON students(roll_number);
CREATE INDEX idx_name ON students(name);
CREATE INDEX idx_student_id ON student_marks(student_id);

-- Insert Sample Data
INSERT INTO students (name, roll_number, email) VALUES
('John Doe', '101', 'john@example.com'),
('Jane Smith', '102', 'jane@example.com'),
('Bob Wilson', '103', 'bob@example.com');

INSERT INTO student_marks (student_id, subject_name, internal_marks, external_marks, final_marks, percentage, grade) VALUES
(1, 'Mathematics', 35, 55, 90, 90, 'A+'),
(1, 'Physics', 32, 52, 84, 84, 'A'),
(1, 'Chemistry', 38, 58, 96, 96, 'A+'),
(2, 'Mathematics', 25, 40, 65, 65, 'B'),
(2, 'Physics', 28, 42, 70, 70, 'B+'),
(2, 'Chemistry', 30, 45, 75, 75, 'B+'),
(3, 'Mathematics', 20, 20, 40, 40, 'D'),
(3, 'Physics', 22, 22, 44, 44, 'D'),
(3, 'Chemistry', 25, 25, 50, 50, 'C');
