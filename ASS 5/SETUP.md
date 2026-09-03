# ASS 5: Spring Boot Full-Stack Student Result System - Setup Instructions

## Project Overview
A complete full-stack application for managing student results with Spring Boot backend, REST APIs, MySQL database, and React frontend.

### Architecture:
- **Backend**: Spring Boot REST APIs
- **Database**: MySQL
- **Frontend**: React (to be deployed)
- **Communication**: RESTful APIs with JSON

### Features:
- Create, read, update, delete student information
- Manage student marks (internal and external)
- Calculate final marks and grades automatically
- Generate comprehensive result reports
- Search students by name or roll number
- Responsive frontend interface
- Complete CRUD operations

## Prerequisites

### Backend Requirements
- Java 17 or higher
- Maven 3.6.0 or higher
- MySQL Server 8.0 or higher
- IDE: IntelliJ IDEA or VS Code with Java extension

### Frontend Requirements
- Node.js v14 or higher
- npm (comes with Node.js)

## Database Setup

### Step 1: Install MySQL
1. Download MySQL from: https://www.mysql.com/downloads/
2. Install and start MySQL service
3. Create root user with password (default: root)

### Step 2: Create Database
```sql
-- Open MySQL Command Line Client or MySQL Workbench

-- Run the database script
source DATABASE.sql

-- Or manually create:
CREATE DATABASE IF NOT EXISTS student_result_db;
USE student_result_db;

CREATE TABLE students (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    roll_number VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE student_marks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    subject_name VARCHAR(100) NOT NULL,
    internal_marks DECIMAL(5,2) NOT NULL,
    external_marks DECIMAL(5,2) NOT NULL,
    final_marks DECIMAL(5,2) NOT NULL,
    percentage DECIMAL(5,2) NOT NULL,
    grade VARCHAR(5) NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);
```

### Step 3: Verify Connection
```bash
mysql -u root -p
password: root
```

## Backend Setup

### Step 1: Configure Database Connection
Edit `application.yml`:
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/student_result_db
    username: root          # Change if different
    password: root          # Change if different
```

### Step 2: Build Backend
```bash
cd backend
mvn clean install
```

### Step 3: Run Backend
```bash
mvn spring-boot:run
```

Backend will start at: `http://localhost:8080/api`

## Frontend Setup

### Step 1: Install Dependencies
```bash
cd frontend
npm install
```

### Step 2: Configure API Base URL
Edit `.env` file or API configuration:
```
REACT_APP_API_URL=http://localhost:8080/api
```

### Step 3: Start Frontend
```bash
npm start
```

Frontend will open at: `http://localhost:3000`

## Project Structure

```
ASS 5/
├── backend/
│   ├── pom.xml                          # Maven configuration
│   ├── application.yml                  # Spring Boot configuration
│   ├── src/main/java/com/studentresult/
│   │   ├── model/
│   │   │   ├── Student.java            # Student entity
│   │   │   └── StudentMarks.java       # Marks entity
│   │   ├── dto/
│   │   │   └── StudentDTO.java         # Data transfer objects
│   │   ├── repository/
│   │   │   └── StudentRepository.java  # Database queries
│   │   ├── service/
│   │   │   └── StudentService.java     # Business logic
│   │   ├── controller/
│   │   │   └── StudentController.java  # REST endpoints
│   │   └── StudentResultSystemApplication.java
│   └── DATABASE.sql                     # SQL setup script
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ... (React files)
│
└── SETUP.md                             # This file
```

## REST API Endpoints

### Create Student
```
POST /api/students
Content-Type: application/json

{
  "name": "John Doe",
  "rollNumber": "101",
  "email": "john@example.com",
  "marks": [
    {
      "subjectName": "Mathematics",
      "internalMarks": 35,
      "externalMarks": 55
    }
  ]
}
```

### Get All Students
```
GET /api/students
```

### Get Student by ID
```
GET /api/students/{id}
```

### Get Student by Roll Number
```
GET /api/students/roll/{rollNumber}
```

### Search Students
```
GET /api/students/search?name=John
```

### Update Student
```
PUT /api/students/{id}
Content-Type: application/json

{
  "name": "John Doe Updated",
  "email": "john.updated@example.com"
}
```

### Delete Student
```
DELETE /api/students/{id}
```

### Get Student Result
```
GET /api/students/{id}/result
```

## Database Schema

### Students Table
```
id              - Primary Key (Auto-increment)
name            - Student's full name
roll_number     - Unique roll number
email           - Student's email
created_at      - Creation timestamp
updated_at      - Last update timestamp
```

### Student_Marks Table
```
id              - Primary Key (Auto-increment)
student_id      - Foreign Key to students
subject_name    - Name of the subject
internal_marks  - Internal assessment marks (0-40)
external_marks  - External exam marks (0-60)
final_marks     - Total marks (internal + external)
percentage      - Percentage score
grade           - Letter grade (A+, A, B+, B, C, D, F)
```

## Grade Calculation

| Percentage | Grade |
|-----------|-------|
| 90+       | A+    |
| 80-89     | A     |
| 70-79     | B+    |
| 60-69     | B     |
| 50-59     | C     |
| 40-49     | D     |
| <40       | F     |

## Testing

### Test Case 1: Create Student
```bash
curl -X POST http://localhost:8080/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Student",
    "rollNumber": "999",
    "email": "test@example.com"
  }'
```

### Test Case 2: Get All Students
```bash
curl http://localhost:8080/api/students
```

### Test Case 3: Search Student
```bash
curl http://localhost:8080/api/students/search?name=John
```

### Test Case 4: Get Student Result
```bash
curl http://localhost:8080/api/students/1/result
```

## Troubleshooting

### Backend Issues

#### Port 8080 already in use
Edit `application.yml`:
```yaml
server:
  port: 8081  # Use different port
```

#### Database connection failed
1. Verify MySQL is running
2. Check credentials in `application.yml`
3. Verify database exists: `SHOW DATABASES;`
4. Check MySQL port (default: 3306)

#### Maven build failed
```bash
mvn clean compile
mvn dependency:resolve
```

### Frontend Issues

#### Port 3000 already in use
```bash
npm start -- --port 3001
```

#### API connection errors
1. Verify backend is running on `http://localhost:8080`
2. Check CORS configuration in backend
3. Verify API URL in frontend configuration
4. Check browser console for detailed errors

#### Node modules issues
```bash
rm -rf node_modules package-lock.json
npm install
```

## Performance Optimization

### Backend
1. Use database indexes on frequently queried fields
2. Implement caching for student data
3. Use pagination for large datasets
4. Optimize JPA queries with projections

### Frontend
1. Code splitting and lazy loading
2. Memoization of components
3. Efficient state management
4. Image optimization

## Security Considerations

1. **Input Validation**
   - Validate all user inputs
   - Use @Valid annotations in controller

2. **Database Security**
   - Use parameterized queries (JPA handles this)
   - Strong database passwords

3. **API Security**
   - CORS configuration
   - Authentication/Authorization (can be added)
   - Rate limiting (can be added)

4. **Data Protection**
   - Encrypt sensitive data
   - Secure API endpoints
   - Use HTTPS in production

## Deployment

### Backend Deployment
1. Build JAR file:
   ```bash
   mvn clean package
   ```

2. Deploy to server (AWS, Heroku, etc.)

3. Set environment variables:
   ```
   DB_URL=your_database_url
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

### Frontend Deployment
1. Build optimized bundle:
   ```bash
   npm run build
   ```

2. Deploy to hosting (Vercel, Netlify, GitHub Pages, etc.)

## API Response Examples

### Success Response
```json
{
  "id": 1,
  "name": "John Doe",
  "rollNumber": "101",
  "email": "john@example.com",
  "marks": [
    {
      "id": 1,
      "subjectName": "Mathematics",
      "internalMarks": 35,
      "externalMarks": 55,
      "finalMarks": 90,
      "percentage": 90,
      "grade": "A+"
    }
  ],
  "totalMarks": 90,
  "overallPercentage": 90,
  "overallGrade": "A+",
  "result": "PASS"
}
```

### Error Response
```json
{
  "error": "Student not found with id: 999"
}
```

## Environment Variables

### Backend (application.yml)
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/student_result_db
    username: root
    password: root
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_ENV=development
```

## Development Workflow

1. **Start Database**
   ```bash
   mysql -u root -p
   ```

2. **Start Backend**
   ```bash
   cd backend
   mvn spring-boot:run
   ```

3. **Start Frontend**
   ```bash
   cd frontend
   npm start
   ```

4. **Make Changes**
   - Backend: Changes auto-reload with DevTools
   - Frontend: Changes auto-reload with Hot Module Replacement

## Technology Stack

### Backend
- Spring Boot 3.0.0
- Spring Data JPA
- MySQL 8.0
- Maven
- Lombok
- Validation API

### Frontend
- React 18.2
- Bootstrap 5.3
- Bootstrap Icons
- Axios (for API calls)
- CSS3

### Database
- MySQL 8.0+
- SQL

## Best Practices

1. **Code Organization**
   - Separate concerns (Model, Service, Controller)
   - Use DTOs for data transfer
   - Implement proper exception handling

2. **Database**
   - Use prepared statements
   - Implement proper indexing
   - Follow normalization rules

3. **API Design**
   - RESTful principles
   - Proper HTTP status codes
   - Consistent response format
   - Error handling

4. **Frontend**
   - Component-based architecture
   - State management
   - Error boundaries
   - Responsive design

## Future Enhancements

1. **Authentication & Authorization**
   - JWT tokens
   - Role-based access control

2. **Advanced Features**
   - Semester management
   - Class-wise analytics
   - Performance charts
   - Export to PDF/Excel

3. **Scalability**
   - Caching layer (Redis)
   - Load balancing
   - Microservices architecture

4. **Monitoring**
   - Application monitoring
   - Database performance tracking
   - Error logging and tracking

## Submission Checklist

- [x] Spring Boot backend with REST APIs
- [x] MySQL database with proper schema
- [x] JPA entity and repository
- [x] Service layer with business logic
- [x] Controller with API endpoints
- [x] Database setup script
- [x] Configuration file
- [x] SETUP.md documentation
- [ ] React frontend application
- [ ] Screenshots of working application
- [ ] API testing results

## Support Resources

- Spring Boot: https://spring.io/projects/spring-boot
- Spring Data JPA: https://spring.io/projects/spring-data-jpa
- MySQL: https://www.mysql.com/
- React: https://react.dev
- Maven: https://maven.apache.org/

## Conclusion

ASS 5 demonstrates:
- Full-stack application development
- RESTful API design
- Spring Boot framework expertise
- Database design and management
- Frontend-backend integration
- CRUD operations
- Enterprise application patterns

For questions, refer to official documentation or seek guidance from your instructor.
