# ASS 3: Bill Calculator (Java Servlet/JSP)

An enterprise Java web application for calculating electricity bills using Servlet and JSP technologies.

## 📋 Overview

This assignment demonstrates server-side Java development, servlet request handling, dynamic JSP pages, and MVC architecture patterns.

### Features
- ✅ Java Servlet for business logic
- ✅ Dynamic JSP pages for UI
- ✅ Same tariff logic as ASS 1
- ✅ Complete input validation
- ✅ Professional error handling
- ✅ Responsive HTML design

## 🎯 Tariff Structure

| Slab | Units | Rate |
|------|-------|------|
| 1 | 0-50 | ₹3.50/unit |
| 2 | 51-150 | ₹4.00/unit |
| 3 | 151-250 | ₹5.20/unit |
| 4 | 250+ | ₹6.50/unit |

## 📁 Files

- `BillCalculator.java` - Main servlet class
- `index.jsp` - Input form and display
- `web.xml` - Deployment descriptor

## 🚀 Setup & Running

### Prerequisites
- JDK 17+ installed
- Tomcat 9+ installed
- Maven (optional)

### Compilation
```bash
# Compile servlet
javac -d WEB-INF/classes BillCalculator.java
```

### Deployment
1. Create WAR file or place files in Tomcat webapps
2. Structure:
```
webapps/BillCalculator/
├── index.jsp
└── WEB-INF/
    ├── web.xml
    └── classes/
        └── BillCalculator.class
```

3. Start Tomcat
4. Access: `http://localhost:8080/BillCalculator/`

## 🏗️ Architecture

### MVC Pattern
```
View (JSP)
   ↓ (Form submission)
Controller (Servlet)
   ↓ (Business logic)
Model (Calculation)
   ↓ (Results)
View (JSP)
```

## 💻 Technology Stack
- **Language**: Java 17
- **Framework**: Servlet API
- **View**: JSP (JavaServer Pages)
- **Server**: Apache Tomcat
- **Configuration**: XML (web.xml)

## 📊 How It Works

1. User submits form via JSP
2. Servlet receives request via doPost()
3. Input validation in servlet
4. Bill calculation using tariff logic
5. Results sent back to JSP
6. JSP displays calculated bill

## 📋 Servlet Details

### Request Parameters
- `units` - Electricity units consumed

### Calculation
- Parse input to integer
- Apply tariff logic
- Calculate total bill
- Handle exceptions

### Response
- Set request attributes
- Forward to JSP
- Display results

## 🔍 Key Components

### BillCalculator.java
- Extends HttpServlet
- Overrides doPost() method
- Implements calculation logic
- Exception handling
- Request forwarding

### index.jsp
- Input form
- Result display
- Error messages
- Styling and layout
- Client-side validation

### web.xml
- Servlet mapping
- URL pattern configuration
- Application configuration

## ✅ Testing

1. **Valid Input**: Enter 100 units
2. **Invalid Input**: Non-numeric values
3. **Edge Cases**: 0, negative, very large numbers
4. **Page Navigation**: Verify redirects
5. **Error Display**: Check error messages

## 🎨 UI Features
- Clean form layout
- Clear input fields
- Professional result display
- Error highlighting
- Responsive design

## ✨ Best Practices
- Input validation
- Exception handling
- MVC architecture
- Separation of concerns
- Code documentation
- Security considerations

## 🔐 Security Features
- Input validation
- Prevention of SQL injection
- XSS protection in JSP
- Secure error handling

## 📈 Performance
- Server-side processing
- Efficient servlet handling
- Minimal page load time
- Optimized JSP rendering

## 🐛 Common Issues
- **404 Not Found**: Check servlet mapping in web.xml
- **ClassNotFoundException**: Ensure JAR files in classpath
- **Port 8080 in use**: Change Tomcat port
- **JSP not compiling**: Check JSP syntax

## 📚 Learning Concepts
- Servlet lifecycle
- HTTP request/response
- JSP templating
- Form processing
- MVC architecture
- Deployment descriptors
- Exception handling

---

**Assignment Status**: ✅ Complete  
**Code Lines**: ~200  
**Complexity**: Intermediate  
**Files**: 3
