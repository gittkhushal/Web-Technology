import React, { useState } from 'react';

function TimeZoneManager({ time, selectedTimeZones, onTimeZoneChange }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const timezones = [
    { name: 'New York', zone: 'America/New_York', flag: '🇺🇸' },
    { name: 'London', zone: 'Europe/London', flag: '🇬🇧' },
    { name: 'Tokyo', zone: 'Asia/Tokyo', flag: '🇯🇵' },
    { name: 'Sydney', zone: 'Australia/Sydney', flag: '🇦🇺' },
    { name: 'Dubai', zone: 'Asia/Dubai', flag: '🇦🇪' },
    { name: 'Singapore', zone: 'Asia/Singapore', flag: '🇸🇬' },
    { name: 'Hong Kong', zone: 'Asia/Hong_Kong', flag: '🇭🇰' },
    { name: 'Mumbai', zone: 'Asia/Kolkata', flag: '🇮🇳' },
    { name: 'Bangkok', zone: 'Asia/Bangkok', flag: '🇹🇭' },
    { name: 'Toronto', zone: 'America/Toronto', flag: '🇨🇦' },
    { name: 'São Paulo', zone: 'America/Sao_Paulo', flag: '🇧🇷' },
    { name: 'Mexico City', zone: 'America/Mexico_City', flag: '🇲🇽' },
    { name: 'Paris', zone: 'Europe/Paris', flag: '🇫🇷' },
    { name: 'Berlin', zone: 'Europe/Berlin', flag: '🇩🇪' },
    { name: 'Moscow', zone: 'Europe/Moscow', flag: '🇷🇺' },
    { name: 'Istanbul', zone: 'Europe/Istanbul', flag: '🇹🇷' },
  ];

  const formatTimeInTimezone = (date, timezone) => {
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: timezone,
      hour12: false
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const getTimezoneOffset = (timezone) => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      hour12: false
    });
    const utcDate = new Date(time.toLocaleString('en-US', { timeZone: 'UTC' }));
    const tzDate = new Date(time.toLocaleString('en-US', { timeZone: timezone }));
    const offset = (tzDate - utcDate) / (1000 * 60 * 60);
    return `UTC ${offset >= 0 ? '+' : ''}${offset.toFixed(1)}`;
  };

  const toggleTimezone = (zone) => {
    const newZones = selectedTimeZones.includes(zone)
      ? selectedTimeZones.filter(z => z !== zone)
      : [...selectedTimeZones, zone];
    onTimeZoneChange(newZones);
  };

  return (
    <div className="card clock-card">
      <div className="card-header">
        <h5><i className="bi bi-globe"></i> Time Zone Manager</h5>
      </div>
      <div className="card-body">
        <div className="mb-3">
          <button
            className="alarm-btn"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <i className="bi bi-plus-circle"></i> Add Timezone
          </button>
        </div>

        {/* Timezone Dropdown */}
        {showDropdown && (
          <div className="mb-3 p-3" style={{
            background: '#f8f9fa',
            borderRadius: '8px',
            border: '2px solid #e0e0e0'
          }}>
            <div className="row">
              {timezones.map((tz) => (
                <div key={tz.zone} className="col-md-6 col-lg-4 mb-2">
                  <label className="d-flex align-items-center gap-2" style={{ cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={selectedTimeZones.includes(tz.zone)}
                      onChange={() => toggleTimezone(tz.zone)}
                      style={{ cursor: 'pointer' }}
                    />
                    <span>{tz.flag} {tz.name}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timezone Display */}
        <div className="row">
          {selectedTimeZones.map((zone) => {
            const tzData = timezones.find(tz => tz.zone === zone);
            if (!tzData) return null;

            return (
              <div key={zone} className="col-md-6 col-lg-4 mb-3">
                <div className="timezone-card">
                  <div className="timezone-header">
                    <div className="timezone-name">
                      <span style={{ fontSize: '24px' }}>{tzData.flag}</span>
                      <span>{tzData.name}</span>
                    </div>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => toggleTimezone(zone)}
                    >
                      <i className="bi bi-x"></i>
                    </button>
                  </div>
                  <div className="timezone-time">
                    {formatTimeInTimezone(time, zone)}
                  </div>
                  <div className="timezone-offset">
                    {getTimezoneOffset(zone)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {selectedTimeZones.length === 0 && (
          <div style={{
            textAlign: 'center',
            color: '#999',
            padding: '20px'
          }}>
            <i className="bi bi-globe" style={{ fontSize: '32px', opacity: '0.5' }}></i>
            <p style={{ marginTop: '10px' }}>No timezones selected. Add one to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TimeZoneManager;
