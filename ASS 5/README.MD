# ASS 5: Student Result Management System (Spring Boot)

A comprehensive RESTful backend API built with Spring Boot for managing student information and calculating results.

## 📋 Overview

This assignment demonstrates enterprise Java development with Spring Boot, RESTful API design, database integration, and modern backend architecture.

### Features
- ✅ Spring Boot REST API
- ✅ PostgreSQL database integration
- ✅ Complete CRUD operations
- ✅ Student and marks management
- ✅ Automatic grade calculation
- ✅ Search functionality
- ✅ Input validation and error handling
- ✅ CORS enabled for frontend integration

## 🏗️ Architecture

```
┌─────────────────────┐
│   Frontend (React)  │
└──────────┬──────────┘
           │ REST API
           ▼
┌─────────────────────────┐
│  Spring Boot Controller │
├─────────────────────────┤
│   Service Layer         │
├─────────────────────────┤
│   Repository Layer      │
└──────────┬──────────────┘
           │ JPA/Hibernate
           ▼
     ┌──────────────┐
     │ PostgreSQL   │
     └──────────────┘
```

## 🚀 Setup & Running

### Prerequisites
- JDK 17+ installed
- Maven installed
- PostgreSQL 12+ installed and running

### Installation

#### 1. Database Setup
```sql
CREATE DATABASE student_result_db;
\c student_result_db

-- Tables created automatically by Hibernate
```

#### 2. Configure Application
Edit `src/main/resources/application.yml`:
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/student_result_db
    username: postgres
    password: your_password
```

#### 3. Build and Run
```bash
cd ASS 5/backend
mvn clean install
mvn spring-boot:run
```

### API Base URL
```
http://localhost:8080/api
```

## 📁 Project Structure
```
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/studentresult/
│   │   │       ├── controller/
│   │   │       ├── service/
│   │   │       ├── repository/
│   │   │       ├── model/
│   │   │       ├── dto/
│   │   │       └── Application.java
│   │   └── resources/
│   │       ├── application.yml
│   │       └── application-dev.yml
│   └── test/
├── pom.xml
└── README.md
```

## 📊 Database Schema

### Students Table
```sql
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    roll_number VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Student Marks Table
```sql
CREATE TABLE student_marks (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id),
    subject_name VARCHAR(100) NOT NULL,
    internal_marks DECIMAL(5,2),
    external_marks DECIMAL(5,2),
    final_marks DECIMAL(5,2),
    percentage DECIMAL(5,2),
    grade VARCHAR(5)
);
```

## 🔌 REST API Endpoints

### Students Management

#### Create Student
```
POST /api/students
Content-Type: application/json

{
    "name": "John Doe",
    "rollNumber": "001",
    "email": "john@example.com"
}
```

#### Get All Students
```
GET /api/students
```

#### Get Student by ID
```
GET /api/students/{id}
```

#### Get Student by Roll Number
```
GET /api/students/roll/{rollNumber}
```

#### Search Students
```
GET /api/students/search?name=John
```

#### Update Student
```
PUT /api/students/{id}
Content-Type: application/json

{
    "name": "Jane Doe",
    "email": "jane@example.com"
}
```

#### Delete Student
```
DELETE /api/students/{id}
```

#### Get Student Result
```
GET /api/students/{id}/result
```

## 💻 Technology Stack
- **Framework**: Spring Boot 3.0
- **Language**: Java 17
- **ORM**: Hibernate/JPA
- **Database**: PostgreSQL
- **Build Tool**: Maven
- **API Documentation**: Swagger (optional)

## 🎯 Key Features

### 1. Student Management
- Create, read, update, delete students
- Search by name
- Search by roll number
- Email validation

### 2. Marks Management
- Add marks for each subject
- Track internal and external marks
- Calculate final marks automatically
- Calculate percentage

### 3. Grade Calculation
- Automatic grade assignment
- Based on percentage
- Grade scale:
  - A+: 90%+
  - A: 80-89%
  - B+: 70-79%
  - B: 60-69%
  - C: 50-59%
  - D: 40-49%
  - F: <40%

### 4. Validation
- Required fields validation
- Email format validation
- Mark range validation (0-100)
- Unique roll number constraint

## 📋 Model Classes

### Student
```java
- id: Long
- name: String
- rollNumber: String
- email: String
- createdAt: LocalDateTime
```

### StudentMarks
```java
- id: Long
- student: Student
- subjectName: String
- internalMarks: Double
- externalMarks: Double
- finalMarks: Double
- percentage: Double
- grade: String
```

## 🔄 Service Layer

### StudentService
- Business logic implementation
- Calculation methods
- Validation methods
- Transaction management

### Key Methods
- `getAllStudents()` - Get all students with results
- `getStudentById(id)` - Get student by ID
- `createStudent(dto)` - Create new student
- `updateStudent(id, dto)` - Update existing student
- `deleteStudent(id)` - Delete student
- `searchByName(name)` - Search functionality
- `calculateResult(id)` - Calculate grade and percentage

## 📝 Request/Response Examples

### Create Student Request
```json
{
    "name": "Rajesh Kumar",
    "rollNumber": "2024001",
    "email": "rajesh@example.com"
}
```

### Student Response
```json
{
    "id": 1,
    "name": "Rajesh Kumar",
    "rollNumber": "2024001",
    "email": "rajesh@example.com",
    "createdAt": "2024-08-23T10:30:00"
}
```

## ✅ Testing

### Using curl
```bash
# Get all students
curl http://localhost:8080/api/students

# Create student
curl -X POST http://localhost:8080/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","rollNumber":"001"}'

# Get by ID
curl http://localhost:8080/api/students/1
```

### Using Postman
1. Import collection (if provided)
2. Set base URL: `http://localhost:8080/api`
3. Test each endpoint

## 🔐 Security Features
- CORS enabled for frontend
- Input validation on all endpoints
- Exception handling for errors
- Proper HTTP status codes
- Error response formatting

## 📈 Performance
- Database indexing on roll_number
- Efficient queries with JPA
- Connection pooling
- Lazy loading for relationships

## 🐛 Common Issues

### Database Connection Error
- Ensure PostgreSQL is running
- Check connection string
- Verify credentials
- Check database exists

### Port 8080 in Use
- Change port in `application.yml`:
  ```yaml
  server:
    port: 8081
  ```

### Hibernate DDL Errors
- Set `ddl-auto: update` in application.yml
- Or: `ddl-auto: create-drop` for fresh start

## 📚 Learning Concepts
- Spring Boot framework
- RESTful API design
- JPA/Hibernate ORM
- Spring Data repositories
- Service layer pattern
- Exception handling
- Transaction management
- Database design

## 📖 Additional Resources
- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [RESTful API Best Practices](https://restfulapi.net/)

---

**Assignment Status**: ✅ Complete  
**Code Lines**: ~1000  
**Complexity**: Advanced  
**Files**: 11
