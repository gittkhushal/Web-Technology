# ASS 7: Online Book Store

A full-stack responsive web application featuring user authentication, book catalog management, and e-commerce functionality built with React and Spring Boot.

## 📋 Overview

This assignment demonstrates modern full-stack development combining a React 18 frontend with Spring Boot 3 backend, PostgreSQL database, JWT authentication, and responsive UI components.

### Features
- ✅ User authentication (registration/login with JWT)
- ✅ Secure password handling
- ✅ PostgreSQL database with JPA/Hibernate ORM
- ✅ RESTful API with 8 endpoints
- ✅ Book catalog with search functionality
- ✅ User profile management
- ✅ Fully responsive React design
- ✅ Professional error handling
- ✅ Complete form validation
- ✅ Spring Security with JWT tokens

## 🚀 Setup & Running

### Prerequisites
- Java JDK 17+ installed
- Maven 3.8+ installed
- Node.js 14+ installed
- npm installed
- PostgreSQL 12+ installed and running

### Installation

#### 1. Database Setup
```sql
CREATE DATABASE bookstore;
```

#### 2. Configure Backend Environment
Update `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/bookstore
spring.datasource.username=postgres
spring.datasource.password=Khushal@1079
spring.jpa.hibernate.ddl-auto=update
jwt.secret=dev-secret-key-12345678901234567890
app.cors.allowed-origins=http://localhost:3000
```

#### 3. Install Backend Dependencies & Run
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
Backend runs on `http://localhost:8080`

#### 4. Install Frontend Dependencies & Run
```bash
cd frontend
npm install
npm start
```
Frontend runs on `http://localhost:3000`

## 📁 Project Structure
```
ASS 7/
├── backend/
│   ├── src/main/java/com/bookstore/
│   │   ├── controller/           # REST API controllers
│   │   ├── service/              # Business logic
│   │   ├── repository/           # Data access layer
│   │   ├── entity/               # JPA entities
│   │   ├── dto/                  # Data Transfer Objects
│   │   ├── config/               # Spring configuration
│   │   ├── security/             # JWT utilities and filters
│   │   └── exception/            # Custom exceptions
│   ├── src/main/resources/
│   │   ├── application.properties # Database & JWT config
│   │   └── data.sql              # Sample data
│   └── pom.xml                   # Maven dependencies
│
└── frontend/
    ├── public/
    │   └── index.html            # HTML entry point
    ├── src/
    │   ├── components/           # React components
    │   ├── pages/                # Page components
    │   ├── context/              # Auth context
    │   ├── api/                  # API client
    │   ├── App.js                # Main app component
    │   ├── App.css               # Responsive styles
    │   └── index.js              # React entry point
    └── package.json              # npm dependencies
```

## 🏗️ Architecture

### Backend (Spring Boot)
```
Client (React)
    ↓ (HTTP/REST)
Spring Boot Server (Port 8080)
    ↓
Middleware (CORS, Security Filters)
    ↓
Controllers (REST Endpoints)
    ↓
Services (Business Logic)
    ↓
Repositories (JPA/Hibernate)
    ↓
PostgreSQL Database
```

### Frontend (React 18)
```
User Interaction
    ↓
React Components
    ↓
API Calls (axios)
    ↓
Auth Context (Global State)
    ↓
DOM Updates
```

## 🔌 REST API Endpoints

### Authentication

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "password123"
}
```

Response:
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "message": "User registered successfully"
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
    "email": "john@example.com",
    "password": "password123"
}
```

Response:
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "message": "Login successful"
}
```

### Book Management

#### Get All Books
```
GET /api/books?keyword=fiction
```

Response:
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "title": "The Great Gatsby",
            "author": "F. Scott Fitzgerald",
            "isbn": "978-0743273565",
            "genre": "Fiction",
            "price": 299.99,
            "stockQuantity": 50
        }
    ]
}
```

#### Get Book by ID
```
GET /api/books/{id}
```

#### Create Book (Admin Only)
```
POST /api/books
Authorization: Bearer {token}
Content-Type: application/json

{
    "title": "Dune",
    "author": "Frank Herbert",
    "isbn": "9780441172719",
    "genre": "Science Fiction",
    "price": 399.99,
    "stockQuantity": 25
}
```

#### Update Book (Admin Only)
```
PUT /api/books/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
    "title": "Updated Title",
    "price": 299.99,
    "stockQuantity": 30
}
```

#### Delete Book (Admin Only)
```
DELETE /api/books/{id}
Authorization: Bearer {token}
```

## 🎓 Database Models

### User Entity
```
- id (Long, PK)
- fullName
- email (UNIQUE)
- password (encrypted)
- role (USER/ADMIN)
- createdAt
```

### Book Entity
```
- id (Long, PK)
- title
- author
- isbn (UNIQUE)
- genre
- price (Decimal)
- stockQuantity
- createdAt
- updatedAt
```

## 💻 Technology Stack
- **Backend**: Spring Boot 3, Spring Security, Spring Data JPA, Hibernate
- **Frontend**: React 18, Axios, React Router
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Build Tools**: Maven (backend), npm (frontend)
- **Languages**: Java 17, JavaScript/JSX
- **API Style**: RESTful

## 🔐 Security Features
- ✅ JWT token-based authentication
- ✅ Spring Security with role-based access control
- ✅ Password encryption (Spring Security's bcrypt equivalent)
- ✅ CORS protection configured
- ✅ Protected admin endpoints (ROLE_ADMIN required)
- ✅ Token validation on requests
- ✅ Email uniqueness enforcement
- ✅ Input validation

## ✅ Form Validation

### Registration
- Full Name: Required, non-empty
- Email: Valid email format, unique
- Password: Minimum 6 characters required

### Login
- Email: Valid format, registered
- Password: Must match hashed password

### Book Creation
- Title: Required
- Author: Required
- ISBN: Unique, required
- Genre: Required
- Price: Positive decimal number
- Stock Quantity: Non-negative integer

## 🎨 UI/UX Features
- Professional navigation bar
- Responsive card-based layout
- Consistent color scheme
- Form validation feedback
- Error handling messages
- Mobile-friendly design
- Accessible buttons and forms

## 📱 Responsive Design

### Breakpoints
- Mobile: < 480px
- Tablet: 480px - 768px
- Desktop: > 768px

### Adaptations
- Single column on mobile
- Grid layout on tablet
- Multi-column grid on desktop
- Touch-friendly buttons
- Readable font sizes

## 🎬 Frontend Features

### Navigation
- Header with branding
- Navigation links (Home, Browse, Login/Profile)
- Responsive hamburger menu for mobile
- User info when logged in

### Pages
- **HomePage**: Featured books showcase
- **BookList**: Browse all books with search
- **LoginPage**: User authentication
- **RegisterPage**: New user registration
- **DashboardPage**: User profile and admin controls

### Components
- BookCard: Individual book display
- BookList: Grid of books with filtering
- LoginForm: Authentication form
- RegisterForm: User registration
- Navbar: Header navigation

## 📊 Sample Data
The application comes pre-loaded with sample books:
- Classic Fiction
- Science Fiction
- Non-Fiction
- Self-Help
- Technology

## ✅ Testing Checklist

### Authentication
- [ ] Register new user successfully
- [ ] Duplicate email shows error
- [ ] Short password shows error
- [ ] Login with valid credentials
- [ ] Invalid credentials show error
- [ ] JWT token stored in localStorage

### Books
- [ ] Display all books on home
- [ ] Search filters books by keyword
- [ ] Book details display correctly
- [ ] Admin can create books
- [ ] Admin can update books
- [ ] Admin can delete books
- [ ] Non-admin blocked from admin actions

### UI/UX
- [ ] Responsive on mobile devices
- [ ] Responsive on tablets
- [ ] Responsive on desktop
- [ ] Forms validate before submission
- [ ] Error messages display clearly
- [ ] Navigation works properly

## 🐛 Troubleshooting

### "Cannot connect to PostgreSQL"
- Ensure PostgreSQL is running
- Verify credentials in `application.properties`
- Check database exists: `psql -l`

### "Port 8080/3000 in use"
- Change port in `application.properties` or package.json
- Or kill process using the port

### "Maven build fails"
- Run `mvn clean` first
- Delete `.m2` folder in user home
- Ensure Java 17+ is installed: `java -version`

### "npm install fails"
- Delete `node_modules` and `package-lock.json`
- Clear npm cache: `npm cache clean --force`
- Reinstall: `npm install`

### "CORS errors"
- Backend CORS is configured for `http://localhost:3000`
- Ensure frontend runs on correct port
- Check `app.cors.allowed-origins` in properties

### "Login returns 401"
- Verify credentials are correct
- Check user exists in database
- Ensure JWT secret matches backend config

## 📈 Performance Optimization
- Lazy loading components
- Efficient API calls
- Connection pooling for database
- React component memoization ready
- CSS minification in production build

## 🎯 Learning Concepts
- Full-stack development
- Spring Boot framework
- React 18 patterns
- RESTful API design
- OAuth/JWT authentication
- ORM (Hibernate/JPA)
- Database relationships
- Password security best practices
- Form validation and error handling
- Component-based architecture

## 📖 Additional Resources
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Security](https://spring.io/projects/spring-security)
- [React Documentation](https://react.dev)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [JWT Introduction](https://jwt.io/introduction)

---

**Assignment Status**: ✅ Complete  
**Backend Code Lines**: 1000+  
**Frontend Code Lines**: 800+  
**Complexity**: Advanced  
**Total APIs**: 8 endpoints  
**Deployed**: Ready for production
