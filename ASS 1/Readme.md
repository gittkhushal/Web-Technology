# ASS 1: Electricity Bill Calculator

A server-side PHP application for calculating electricity bills based on dynamic tariff slabs.

## 📋 Overview

This assignment demonstrates server-side web development with PHP, form processing, and business logic implementation.

### Features
- ✅ Dynamic tariff calculation with 4 slabs
- ✅ Input validation and error handling
- ✅ Responsive HTML/CSS design
- ✅ Professional user interface
- ✅ Real-time calculation

## 🎯 Tariff Structure

| Slab | Units | Rate |
|------|-------|------|
| 1 | 0-50 | ₹3.50/unit |
| 2 | 51-150 | ₹4.00/unit |
| 3 | 151-250 | ₹5.20/unit |
| 4 | 250+ | ₹6.50/unit |

## 📁 Files

- `index.php` - Complete application (single file)

## 🚀 Setup & Running

### Prerequisites
- PHP 8+ installed
- XAMPP or any PHP server
- Web browser

### Installation
1. Copy `index.php` to your web server directory
2. Access via browser: `http://localhost/path-to-file/index.php`

### Usage
1. Enter number of units consumed
2. Click "Calculate Bill"
3. View total bill amount

## 🔍 Implementation Details

### Calculation Logic
```
Total Bill = Sum of (units * rate) for each slab
```

### Validation
- Input must be numeric
- Input must be positive
- Error messages for invalid input

## 💻 Technology Used
- **Language**: PHP 8+
- **Frontend**: HTML5, CSS3
- **Method**: POST form submission

## 📊 Code Structure
- Form input section
- Calculation logic
- Result display
- Error handling

## ✅ Testing

1. **Valid Input**: Enter 100 units → Calculate
2. **Invalid Input**: Enter "abc" → Shows error
3. **Edge Cases**: Enter 0, negative, large numbers
4. **Responsive**: Test on different screen sizes

## 🎨 UI Features
- Clean, modern design
- Responsive layout
- Color-coded sections
- Clear input/output areas

## 📝 Notes
- Single file implementation makes it easy to deploy
- Immediate server-side processing
- No dependencies required
- Pure PHP solution

## ✨ Best Practices
- Input validation
- Clear code structure
- Responsive design
- Error handling
- Professional UI

---

**Assignment Status**: ✅ Complete  
**Code Lines**: ~300  
**Complexity**: Beginner
