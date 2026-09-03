# React Real-time Clock Dashboard - Setup Instructions

## Project Overview
This is a responsive React-based world clock dashboard application featuring:
- **Analog Clock** - Real-time analog time display
- **Digital Clock** - Live time updates with hours, minutes, and seconds
- **Timezone Manager** - Display time for multiple regions worldwide
- **Alarm Feature** - Set, manage, and trigger alarms
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Smooth Animations** - Transitions and animations for better UX

## Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

## Installation & Setup

### Step 1: Install Dependencies
```bash
cd "d:\sem5\WT ASS\ASS 2"
npm install
```

### Step 2: Start Development Server
```bash
npm start
```

The application will open automatically at `http://localhost:3000`

## Project Structure

```
ASS 2/
├── public/
│   └── index.html          # Main HTML file
├── src/
│   ├── index.js            # React entry point
│   ├── App.js              # Main App component
│   ├── App.css             # Application styles
│   └── components/
│       ├── AnalogClock.js      # Analog clock component
│       ├── DigitalClock.js     # Digital clock component
│       ├── TimeZoneManager.js  # Timezone management component
│       └── AlarmManager.js     # Alarm management component
└── package.json            # Project dependencies
```

## Features

### 1. Analog Clock
- Real-time hour, minute, and second hands
- Smooth rotation animations
- Clock numbers display
- Professional styling

### 2. Digital Clock
- HH:MM:SS format
- Pulsing animation effect
- Large, readable display
- Updates every second

### 3. Timezone Manager
- 16 pre-configured worldwide timezones
- Add/remove timezones dynamically
- Display local time for each timezone
- Shows UTC offset for each region
- Country flag emojis for visual identification

### 4. Alarm Manager
- Set alarms with custom labels
- Enable/disable individual alarms
- Delete alarms
- Audio notification when alarm triggers
- Displays alarm status

## Available Timezones

- 🇺🇸 New York (America/New_York)
- 🇬🇧 London (Europe/London)
- 🇯🇵 Tokyo (Asia/Tokyo)
- 🇦🇺 Sydney (Australia/Sydney)
- 🇦🇪 Dubai (Asia/Dubai)
- 🇸🇬 Singapore (Asia/Singapore)
- 🇭🇰 Hong Kong (Asia/Hong_Kong)
- 🇮🇳 Mumbai (Asia/Kolkata)
- 🇹🇭 Bangkok (Asia/Bangkok)
- 🇨🇦 Toronto (America/Toronto)
- 🇧🇷 São Paulo (America/Sao_Paulo)
- 🇲🇽 Mexico City (America/Mexico_City)
- 🇫🇷 Paris (Europe/Paris)
- 🇩🇪 Berlin (Europe/Berlin)
- 🇷🇺 Moscow (Europe/Moscow)
- 🇹🇷 Istanbul (Europe/Istanbul)

## Usage

### Using the Clock Dashboard

1. **View Main Clocks**
   - Analog and Digital clocks show the current local time
   - Updated every second automatically

2. **Manage Timezones**
   - Click "Add Timezone" button
   - Select desired timezones from the dropdown
   - View time for each selected timezone
   - Remove timezones by clicking the X button

3. **Set Alarms**
   - Click "Set Alarm" button
   - Select desired alarm time using the time picker
   - Optionally add a label/description
   - Click "Add Alarm" to create

4. **Manage Alarms**
   - Toggle alarm on/off using the switch
   - Delete alarms using the delete button
   - Audio notification plays when alarm triggers
   - Alarm status is displayed when triggered

## Responsive Design

The application is fully responsive and adapts to different screen sizes:

- **Desktop**: Full layout with 3-column timezone grid
- **Tablet**: 2-column layout with optimized spacing
- **Mobile**: Single-column layout with adjusted font sizes

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Technology Stack

- **React 18.2.0** - UI library
- **Bootstrap 5.3.0** - Responsive CSS framework
- **Bootstrap Icons** - Icon library
- **CSS3** - Styling and animations

## Browser Support

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations

- Efficient state management with React hooks
- Optimized re-renders using useEffect dependencies
- CSS animations instead of JavaScript animations
- Responsive image and icon loading
- Minimal bundle size

## Troubleshooting

### Port 3000 already in use
```bash
npm start -- --port 3001
```

### Node modules issues
```bash
rm -r node_modules package-lock.json
npm install
```

### Style not loading
- Clear browser cache (Ctrl+Shift+Delete)
- Restart dev server
- Check browser console for errors

## Notes

- The alarm feature uses Web Audio API for sound
- Timezones are based on browser's timezone support
- Local storage is not implemented but can be added for persistence
- Real alarm functionality depends on browser's audio permissions

## Future Enhancements

- Save alarms to local storage
- Custom timezone creation
- Weather integration
- Calendar integration
- Stopwatch and timer features
- Multiple alarm sounds
- Dark mode theme

## Support

For issues or questions, refer to:
- React Documentation: https://react.dev
- Bootstrap Documentation: https://getbootstrap.com
- MDN Web Docs: https://developer.mozilla.org
