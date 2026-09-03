# ASS 2: Animated Clock Dashboard

A React-based interactive dashboard featuring real-time analog and digital clocks with advanced features.

## 📋 Overview

This assignment demonstrates modern React component architecture, real-time updates, CSS animations, and interactive user interfaces.

### Features
- ✅ Real-time analog clock with smooth animations
- ✅ Digital clock display (HH:MM:SS)
- ✅ 16 world timezone support
- ✅ Alarm manager with audio notifications
- ✅ Fully responsive design
- ✅ Component-based architecture

## 🕐 Components

### 1. AnalogClock
- Rotating hour, minute, and second hands
- Smooth CSS animations
- Real-time update every second
- Professional clock face design

### 2. DigitalClock
- HH:MM:SS format
- Real-time updates
- 24-hour display
- Bold typography

### 3. TimeZoneManager
- 16 world timezones
- Instant timezone switching
- Display time for selected zone
- Dropdown selector

### 4. AlarmManager
- Set custom alarm times
- Audio notification on trigger
- Alarm enable/disable
- Clear visual feedback

## 🚀 Setup & Running

### Prerequisites
- Node.js 14+ installed
- npm installed

### Installation
```bash
cd ASS 2
npm install
npm start
```

### Browser Access
```
http://localhost:3000
```

## 📁 Project Structure
```
ASS 2/
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── components/
│   │   ├── AnalogClock.js
│   │   ├── DigitalClock.js
│   │   ├── TimeZoneManager.js
│   │   └── AlarmManager.js
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

## 🎨 Features in Detail

### Analog Clock
- Canvas/SVG rendering
- Smooth hand rotation
- Real-time second precision
- Professional styling

### Digital Clock
- Live time display
- Updates every second
- Clear, readable format
- Optional seconds display

### Timezone Converter
- Instant switching
- Multiple timezones
- Accurate calculations
- Easy selection

### Alarm System
- Set time in HH:MM format
- Audio alert
- Disable/enable toggle
- Visual notification

## 💻 Technology Stack
- **Framework**: React 18.2
- **Styling**: CSS3 (Animations, Flexbox)
- **State Management**: React Hooks
- **Real-time**: setInterval/setTimeout

## 🔄 How It Works

1. Component mounts
2. setInterval updates time every 1000ms
3. State updates trigger re-render
4. CSS animations show smooth hand movement
5. Unmount clears interval

## ✅ Testing Checklist

- [ ] Clocks show current time
- [ ] Hands move smoothly
- [ ] Timezone changes work
- [ ] Alarm triggers at correct time
- [ ] Audio plays on alarm
- [ ] Responsive on mobile/tablet
- [ ] No console errors

## 📊 Performance
- Optimized re-renders
- Minimal state updates
- Efficient CSS animations
- Cleanup intervals on unmount

## 🎯 Learning Concepts
- React component composition
- Hooks (useState, useEffect)
- Real-time state management
- CSS animations
- Event handling
- Responsive design

## 🐛 Common Issues
- **Alarm not working**: Check browser audio permissions
- **Clocks not updating**: Check console for errors
- **Styling issues**: Clear browser cache
- **Port 3000 in use**: Use `npm start -- --port 3001`

## 📱 Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## ✨ Best Practices
- Component modularity
- Proper cleanup (useEffect)
- Prop drilling optimization
- Error handling
- Performance optimization

---

**Assignment Status**: ✅ Complete  
**Code Lines**: ~600  
**Complexity**: Intermediate  
**Files**: 8
