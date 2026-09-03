# Electricity Bill Calculator - Java Servlet & JSP Version - Setup Instructions

## Project Overview
This is a responsive web application built using Java Servlets and JSP (JavaServer Pages) that calculates electricity bills based on tiered tariff rates.

### Features:
- Server-side processing with Java Servlets
- Dynamic UI with JSP
- Responsive Bootstrap design
- Input validation and error handling
- Tiered tariff calculation
- Professional UI/UX

## Prerequisites

### Required Software
- **Java Development Kit (JDK)** - Version 8 or higher
- **Apache Tomcat** - Version 9.0 or higher
- **Apache Ant** (optional, for building)

### Installation Steps

#### Step 1: Install Java JDK
1. Download from: https://www.oracle.com/java/technologies/downloads/
2. Install JDK
3. Set JAVA_HOME environment variable:
   ```
   Windows: Control Panel > System > Advanced > Environment Variables
   Add: JAVA_HOME = C:\Program Files\Java\jdk-21
   ```

#### Step 2: Install Tomcat
1. Download from: https://tomcat.apache.org/download-9.cgi
2. Extract to a folder (e.g., `C:\apache-tomcat-9.0`)
3. Set CATALINA_HOME environment variable:
   ```
   CATALINA_HOME = C:\apache-tomcat-9.0
   ```

## Project Deployment

### Option 1: Manual Deployment (Recommended for Learning)

#### Step 1: Create Project Structure
```
CATALINA_HOME/webapps/BillCalculator/
├── WEB-INF/
│   ├── web.xml              # Deployment descriptor
│   ├── classes/
│   │   └── servlets/
│   │       └── BillCalculator.class
│   └── lib/
├── index.jsp                # Main JSP file
└── resources/ (optional)
```

#### Step 2: Compile Servlet
1. Copy `BillCalculator.java` to `src/` folder
2. Compile using:
   ```bash
   javac -d out/classes src/servlets/BillCalculator.java
   ```
3. Copy compiled class to `WEB-INF/classes/servlets/`

#### Step 3: Deploy to Tomcat
1. Create folder in Tomcat webapps:
   ```bash
   mkdir C:\apache-tomcat-9.0\webapps\BillCalculator
   ```
2. Copy all files:
   ```bash
   - Copy web.xml to WEB-INF/
   - Copy index.jsp to root
   - Copy compiled class to WEB-INF/classes/servlets/
   ```

#### Step 4: Start Tomcat
- **Windows**:
  ```bash
  C:\apache-tomcat-9.0\bin\startup.bat
  ```
- **Linux/Mac**:
  ```bash
  C:\apache-tomcat-9.0\bin\startup.sh
  ```

#### Step 5: Access Application
Open browser and navigate to:
```
http://localhost:8080/BillCalculator/
```

### Option 2: Using WAR File

#### Step 1: Create WAR File Structure
```
BillCalculator/
├── index.jsp
└── WEB-INF/
    ├── web.xml
    ├── classes/
    │   └── servlets/
    │       └── BillCalculator.class
    └── lib/
```

#### Step 2: Package WAR
```bash
jar cvf BillCalculator.war -C BillCalculator/ .
```

#### Step 3: Deploy WAR
- Copy `BillCalculator.war` to `CATALINA_HOME/webapps/`
- Tomcat will auto-deploy

## Project Structure

```
ASS 3/
├── BillCalculator.java     # Servlet for bill calculation
├── index.jsp               # JSP for UI and form
├── web.xml                 # Web application descriptor
└── SETUP.md               # This file
```

## File Descriptions

### BillCalculator.java
**Purpose**: Server-side request processing

**Key Methods**:
- `doPost()`: Handles form submissions
- `doGet()`: Handles GET requests
- `calculateBill()`: Implements tariff calculation logic

**Tariff Structure**:
- First 50 units: ₹3.50/unit
- Next 100 units (51-150): ₹4.00/unit
- Next 100 units (151-250): ₹5.20/unit
- Above 250 units: ₹6.50/unit

**Validation**:
- Empty input check
- Numeric validation
- Negative number check
- Number format exception handling

### index.jsp
**Purpose**: Front-end UI and result display

**Features**:
- Responsive HTML form
- Bootstrap 5 styling
- Real-time calculation display
- Error message display
- Tariff information table
- Mobile-friendly design

### web.xml
**Purpose**: Web application deployment descriptor

**Configuration**:
- Servlet mapping
- URL patterns
- Welcome files
- Application metadata

## Usage

### 1. Start the Application
1. Ensure Tomcat is running
2. Navigate to: `http://localhost:8080/BillCalculator/`

### 2. Calculate Bill
1. Enter electricity consumption (units) in the input field
2. Click "Calculate Bill" button
3. View results:
   - Total consumption in units
   - Total bill amount in rupees

### 3. Input Validation
- Empty input → Error: "Please enter the electricity consumption in units."
- Non-numeric input → Error: "Please enter a valid number for consumption."
- Negative number → Error: "Please enter a valid positive number for consumption."

## Testing

### Test Cases

| Input (Units) | Expected Bill | Tariff Applied |
|---------------|---------------|--------------------|
| 25            | ₹87.50        | First slab only |
| 50            | ₹175.00       | First slab only |
| 100           | ₹375.00       | Slab 1 + Slab 2 |
| 150           | ₹575.00       | Slab 1 + Slab 2 |
| 200           | ₹835.00       | Slab 1 + Slab 2 + Slab 3 |
| 250           | ₹1,095.00     | Slab 1 + Slab 2 + Slab 3 |
| 300           | ₹1,420.00     | All slabs |
| 500           | ₹2,720.00     | All slabs |

### Run Tests
1. Enter each test case value
2. Verify calculated bill matches expected result
3. Verify error handling with invalid inputs

## Responsive Design

The application is responsive across all devices:

- **Desktop**: Full layout with optimized spacing
- **Tablet**: Adjusted width and font sizes
- **Mobile**: Single-column layout with touch-friendly inputs

## Customization

### Change Tariff Rates
Edit `BillCalculator.java` in `calculateBill()` method:
```java
if (units <= 50) {
    bill = units * 3.50;  // Change rate here
}
```

### Customize UI
Edit `index.jsp`:
- Colors: Modify gradient in `<style>` section
- Text: Update labels and messages
- Layout: Modify Bootstrap grid classes

### Add New Features
- Database integration for bill history
- User authentication
- PDF bill generation
- Email notifications

## Troubleshooting

### Issue: 404 Error - Page Not Found
**Solution**:
- Check Tomcat is running
- Verify application deployed to webapps
- Check URL: `http://localhost:8080/BillCalculator/`

### Issue: HTTP 500 - Internal Server Error
**Solution**:
- Check Tomcat logs: `CATALINA_HOME/logs/catalina.out`
- Verify servlet class compiled correctly
- Check class file location in WEB-INF/classes/servlets/

### Issue: Servlet Not Found
**Solution**:
- Verify web.xml configuration
- Check servlet class path
- Ensure recompiled after changes

### Issue: Cannot Access JSP
**Solution**:
- Check JSP file in root directory
- Verify file permissions
- Clear browser cache

## Performance Tips

1. **Enable Gzip Compression**
   ```xml
   <Connector compression="on" compressionMinSize="1024" />
   ```

2. **Connection Pooling**
   - Use DataSource for database connections

3. **Caching**
   - Add HTTP headers for browser caching

4. **Minimize JSP Processing**
   - Precompile JSP files
   - Use taglibs for complex logic

## Security Considerations

1. **Input Validation**
   - Always validate user input (already implemented)
   - Use parameterized queries for database

2. **XSS Prevention**
   - HTML escape output
   - Use JSTL tags with EL escaping

3. **CSRF Protection**
   - Implement CSRF tokens for forms
   - Use SameSite cookies

4. **SQL Injection Prevention**
   - Use prepared statements
   - Parameterize queries

## Building for Production

### Step 1: Minify Resources
- Minify CSS and JavaScript
- Optimize images

### Step 2: Create WAR File
```bash
jar cvf BillCalculator.war -C BillCalculator/ .
```

### Step 3: Deploy
- Copy WAR to production Tomcat
- Monitor logs for issues

## Technology Stack

- **Java** - Server-side programming
- **Servlet API** - Request/response handling
- **JSP** - Dynamic page generation
- **Bootstrap 5** - Responsive CSS
- **HTML5** - Page structure
- **CSS3** - Styling

## Learning Resources

- Java Servlets: https://docs.oracle.com/javaee/
- Apache Tomcat: https://tomcat.apache.org/
- Bootstrap: https://getbootstrap.com/
- JSP: https://www.oracle.com/java/technologies/jsps/

## Submission Checklist

- [x] BillCalculator.java - Servlet for processing
- [x] index.jsp - User interface
- [x] web.xml - Deployment descriptor
- [x] SETUP.md - Documentation
- [ ] Screenshots of working application
- [ ] Test cases with various inputs

## Conclusion

This Java Servlet & JSP application demonstrates:
- Server-side Java programming
- Form handling and validation
- Business logic implementation
- Responsive web design
- Best practices in web development

For questions or issues, refer to official documentation or seek guidance from your instructor.
