import React, { useState } from 'react';

function AlarmManager({ alarms, onAddAlarm, onDeleteAlarm, onToggleAlarm, showModal, onModalToggle }) {
  const [alarmTime, setAlarmTime] = useState('07:00');
  const [alarmLabel, setAlarmLabel] = useState('');

  const handleAddAlarm = () => {
    if (alarmTime) {
      const [hours, minutes] = alarmTime.split(':');
      onAddAlarm({
        time: `${hours}:${minutes}`,
        label: alarmLabel || 'Alarm'
      });
      setAlarmTime('07:00');
      setAlarmLabel('');
    }
  };

  const formatAlarmTime = (timeString) => {
    if (!timeString) return '';
    return timeString;
  };

  return (
    <div className="card clock-card">
      <div className="card-header">
        <div className="alarm-header">
          <h5 className="alarm-title mb-0">
            <i className="bi bi-alarm"></i> Alarm Manager
          </h5>
          <button
            className="alarm-btn"
            onClick={() => onModalToggle(!showModal)}
          >
            <i className="bi bi-plus-circle"></i> Set Alarm
          </button>
        </div>
      </div>

      <div className="card-body">
        {/* Add Alarm Modal */}
        {showModal && (
          <div style={{
            background: '#f8f9fa',
            border: '2px solid #e0e0e0',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '20px'
          }}>
            <h6>Set a New Alarm</h6>
            <div className="mb-3">
              <label className="form-label">Alarm Time</label>
              <input
                type="time"
                className="form-control"
                value={alarmTime}
                onChange={(e) => setAlarmTime(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Label (Optional)</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g., Morning Wake Up"
                value={alarmLabel}
                onChange={(e) => setAlarmLabel(e.target.value)}
              />
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn btn-primary"
                onClick={handleAddAlarm}
              >
                <i className="bi bi-check-circle"></i> Add Alarm
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => onModalToggle(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Alarms List */}
        {alarms.length > 0 ? (
          <div className="alarm-list">
            {alarms.map((alarm) => (
              <div key={alarm.id} className="alarm-item">
                <div className="alarm-info">
                  <div className="alarm-time">
                    {formatAlarmTime(alarm.time)}
                  </div>
                  <div className="alarm-label">
                    {alarm.label}
                  </div>
                  {alarm.triggered && (
                    <div style={{
                      color: '#ff6b6b',
                      fontSize: '12px',
                      marginTop: '5px'
                    }}>
                      <i className="bi bi-exclamation-circle"></i> Alarm Triggered!
                    </div>
                  )}
                </div>
                <div className="alarm-controls">
                  <button
                    className={`alarm-toggle ${alarm.active ? 'active' : ''}`}
                    onClick={() => onToggleAlarm(alarm.id)}
                    title={alarm.active ? 'Disable' : 'Enable'}
                  ></button>
                  <button
                    className="alarm-delete"
                    onClick={() => onDeleteAlarm(alarm.id)}
                    title="Delete"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="alarm-empty">
            <div className="alarm-empty-icon">
              <i className="bi bi-alarm-off"></i>
            </div>
            <p>No alarms set yet. Create one to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AlarmManager;
