import React from 'react';

function AnalogClock({ time }) {
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondDegrees = (seconds / 60) * 360;
  const minuteDegrees = (minutes / 60) * 360 + (seconds / 60) * 6;
  const hourDegrees = (hours / 12) * 360 + (minutes / 60) * 30;

  // Function to position clock numbers
  const getNumberPosition = (num) => {
    const angle = (num === 12 ? 0 : num * 30) * (Math.PI / 180);
    const radius = 90; // Distance from center
    const x = Math.sin(angle) * radius;
    const y = -Math.cos(angle) * radius;
    return { x, y };
  };

  return (
    <div className="analog-clock-container">
      {/* Clock Numbers - Positioned correctly around the circle */}
      {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num) => {
        const { x, y } = getNumberPosition(num);
        return (
          <div
            key={num}
            className="clock-number-item"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '30px',
              height: '30px',
              marginLeft: '-15px',
              marginTop: '-15px',
              transform: `translate(${x}px, ${y}px)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#333'
            }}
          >
            {num}
          </div>
        );
      })}

      {/* Hour Hand */}
      <div
        className="clock-hand hour-hand"
        style={{
          transform: `rotate(${hourDegrees}deg)`
        }}
      ></div>

      {/* Minute Hand */}
      <div
        className="clock-hand minute-hand"
        style={{
          transform: `rotate(${minuteDegrees}deg)`
        }}
      ></div>

      {/* Second Hand */}
      <div
        className="clock-hand second-hand"
        style={{
          transform: `rotate(${secondDegrees}deg)`
        }}
      ></div>

      {/* Center Dot */}
      <div className="clock-center"></div>
    </div>
  );
}

export default AnalogClock;
