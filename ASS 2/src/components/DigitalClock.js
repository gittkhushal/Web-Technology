import React from 'react';

function DigitalClock({ time }) {
  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="d-flex align-items-center gap-3">
      <div className="digital-clock">
        {formatTime(time)}
      </div>
    </div>
  );
}

export default DigitalClock;
