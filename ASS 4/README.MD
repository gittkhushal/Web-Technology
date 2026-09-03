# ASS 4: Student Result Calculator

A React-based application for calculating and displaying student grades with comprehensive result analysis.

## 📋 Overview

This assignment demonstrates React component architecture, state management, dynamic form handling, and complex calculations.

### Features
- ✅ Student information input form
- ✅ Dynamic subject management (add/remove)
- ✅ Internal (0-40) and external (0-60) marks
- ✅ Automatic grade calculation
- ✅ Detailed result display
- ✅ Print functionality
- ✅ Fully responsive design
- ✅ Local storage persistence

## 🎓 Grade Scale

| Grade | Percentage | SGPA |
|-------|-----------|------|
| A+ | 90%+ | 4.0 |
| A | 80-89% | 3.7 |
| B+ | 70-79% | 3.3 |
| B | 60-69% | 3.0 |
| C | 50-59% | 2.0 |
| D | 40-49% | 1.0 |
| F | <40% | 0.0 |

## 🚀 Setup & Running

### Prerequisites
- Node.js 14+ installed
- npm installed

### Installation
```bash
cd ASS 4
npm install
npm start
```

### Browser Access
```
http://localhost:3000
```

## 📁 Project Structure
```
ASS 4/
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── components/
│   │   ├── StudentForm.js
│   │   ├── SubjectInput.js
│   │   └── ResultDisplay.js
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

## 📊 Components

### StudentForm
- Student name input
- Roll number input
- Subject management (add/remove)
- Form submission
- Input validation

### SubjectInput
- Subject name
- Internal marks (0-40)
- External marks (0-60)
- Real-time validation
- Delete button

### ResultDisplay
- Student information
- Subject-wise results
- Calculated total marks
- Percentage
- Grade assignment
- Print button

## 💻 Technology Stack
- **Framework**: React 18.2
- **State Management**: React Hooks (useState)
- **Styling**: CSS3 (Flexbox, Grid)
- **Storage**: LocalStorage
- **Printing**: Browser print API

## 🔢 Calculation Logic

### Total Marks
```
Total = Sum of (internal + external) for all subjects
```

### Percentage
```
Percentage = (Total / (subjects * 100)) * 100
```

### Grade
```
Based on percentage ranges (see grade scale above)
```

## ✅ Features in Detail

### Add Subject
- Click "Add Subject" button
- Input fields appear
- Auto-focus on first field
- Real-time validation

### Remove Subject
- Click delete icon on any subject
- Subject removed from list
- Results update automatically

### Calculate Results
- System calculates automatically
- Shows total marks
- Shows percentage
- Shows grade
- Shows SGPA

### Print Results
- Click "Print" button
- Opens print dialog
- Professional layout
- Can save as PDF

## 🎯 Input Validation

- Student name: Required, minimum 2 characters
- Roll number: Required, alphanumeric
- Subject name: Required, no duplicates
- Internal marks: 0-40 range
- External marks: 0-60 range
- Minimum 1 subject required

## 📱 Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔄 State Management

### State Structure
```javascript
{
  studentName: '',
  rollNumber: '',
  subjects: [
    {
      name: '',
      internalMarks: 0,
      externalMarks: 0
    }
  ],
  results: {
    totalMarks: 0,
    percentage: 0,
    grade: ''
  }
}
```

## ✅ Testing Checklist

- [ ] Add subjects
- [ ] Remove subjects
- [ ] Enter valid marks
- [ ] Enter invalid marks (shows error)
- [ ] Calculate results
- [ ] Grade calculated correctly
- [ ] Print functionality works
- [ ] Responsive on mobile
- [ ] Data persists on refresh

## 🎨 UI Features
- Clean, intuitive interface
- Color-coded grade display
- Responsive form layout
- Professional typography
- Accessible buttons
- Visual feedback

## ✨ Best Practices
- Component modularity
- Prop drilling management
- Input validation
- Error handling
- Responsive design
- Accessibility
- Code organization

## 🔐 Security Features
- Input validation
- XSS prevention
- Safe DOM manipulation
- Error boundary ready

## 📈 Performance
- Optimized re-renders
- Efficient state updates
- Lightweight calculations
- Smooth animations

## 🐛 Common Issues
- **Marks not updating**: Check input range
- **Grade not showing**: Check all subjects filled
- **Print layout wrong**: Check browser zoom
- **Data lost on refresh**: Check localStorage

## 📚 Learning Concepts
- React components
- State management
- Form handling
- Event handling
- Conditional rendering
- List rendering
- Local storage
- Print functionality

---

**Assignment Status**: ✅ Complete  
**Code Lines**: ~800  
**Complexity**: Intermediate  
**Files**: 8
