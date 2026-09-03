import React, { useState, useEffect } from 'react';
import './App.css';
import AnalogClock from './components/AnalogClock';
import DigitalClock from './components/DigitalClock';
import TimeZoneManager from './components/TimeZoneManager';
import AlarmManager from './components/AlarmManager';

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTimeZones, setSelectedTimeZones] = useState(['America/New_York', 'Europe/London', 'Asia/Tokyo']);
  const [alarms, setAlarms] = useState([]);
  const [showAlarmModal, setShowAlarmModal] = useState(false);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Check alarms
  useEffect(() => {
    const checkAlarms = setInterval(() => {
      const now = new Date();
      alarms.forEach((alarm) => {
        if (alarm.active && !alarm.triggered) {
          const alarmTime = new Date(alarm.time);
          if (
            now.getHours() === alarmTime.getHours() &&
            now.getMinutes() === alarmTime.getMinutes()
          ) {
            playAlarmSound();
            updateAlarmTriggered(alarm.id);
          }
        }
      });
    }, 1000);

    return () => clearInterval(checkAlarms);
  }, [alarms]);

  const playAlarmSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);

    // Repeat alarm sound multiple times
    setTimeout(() => playAlarmSound(), 600);
  };

  const updateAlarmTriggered = (alarmId) => {
    setAlarms(alarms.map(alarm =>
      alarm.id === alarmId ? { ...alarm, triggered: true } : alarm
    ));
  };

  const addAlarm = (alarmData) => {
    const newAlarm = {
      id: Date.now(),
      ...alarmData,
      active: true,
      triggered: false
    };
    setAlarms([...alarms, newAlarm]);
    setShowAlarmModal(false);
  };

  const deleteAlarm = (alarmId) => {
    setAlarms(alarms.filter(alarm => alarm.id !== alarmId));
  };

  const toggleAlarm = (alarmId) => {
    setAlarms(alarms.map(alarm =>
      alarm.id === alarmId ? { ...alarm, active: !alarm.active } : alarm
    ));
  };

  const handleTimeZoneChange = (zones) => {
    setSelectedTimeZones(zones);
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1 className="title">
          <i className="bi bi-clock-history"></i> World Clock Dashboard
        </h1>
        <p className="subtitle">Real-time Clock with Timezone Management and Alarms</p>
      </div>

      <div className="container-fluid">
        {/* Main Clock Section */}
        <div className="row mb-4">
          <div className="col-lg-6 mb-4">
            <div className="card clock-card">
              <div className="card-header">
                <h5><i className="bi bi-clock"></i> Analog Clock</h5>
              </div>
              <div className="card-body d-flex justify-content-center">
                <AnalogClock time={currentTime} />
              </div>
            </div>
          </div>

          <div className="col-lg-6 mb-4">
            <div className="card clock-card">
              <div className="card-header">
                <h5><i className="bi bi-clock-fill"></i> Digital Clock</h5>
              </div>
              <div className="card-body d-flex justify-content-center align-items-center">
                <DigitalClock time={currentTime} />
              </div>
            </div>
          </div>
        </div>

        {/* Timezone Manager */}
        <div className="row mb-4">
          <div className="col-12">
            <TimeZoneManager 
              time={currentTime} 
              selectedTimeZones={selectedTimeZones}
              onTimeZoneChange={handleTimeZoneChange}
            />
          </div>
        </div>

        {/* Alarm Manager */}
        <div className="row mb-4">
          <div className="col-12">
            <AlarmManager
              alarms={alarms}
              onAddAlarm={addAlarm}
              onDeleteAlarm={deleteAlarm}
              onToggleAlarm={toggleAlarm}
              showModal={showAlarmModal}
              onModalToggle={setShowAlarmModal}
            />
          </div>
        </div>
      </div>

      <footer className="footer">
        <p>&copy; 2026 World Clock Dashboard | Built with React</p>
      </footer>
    </div>
  );
}

export default App;
