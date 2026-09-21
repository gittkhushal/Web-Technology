import React from 'react';

function Navbar({ classCount, onGenerateCode, onShowCode }) {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          <h1>📊 UML Class Diagram Generator</h1>
          <span className="class-counter">Classes: {classCount}</span>
        </div>
        <div className="navbar-right">
          <button className="btn btn-primary" onClick={onGenerateCode}>
            🔨 Generate Java Code
          </button>
          <button className="btn btn-secondary" onClick={onShowCode}>
            👁 Toggle Code View
          </button>
          <button className="btn btn-info">
            ℹ️ About
          </button>
        </div>
      </div>
    </nav>
  );
}

const styles = `
  .navbar {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .navbar-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 30px;
    max-width: 1400px;
    margin: 0 auto;
  }

  .navbar-left {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .navbar-left h1 {
    font-size: 22px;
    margin: 0;
  }

  .class-counter {
    background: rgba(255, 255, 255, 0.2);
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 14px;
  }

  .navbar-right {
    display: flex;
    gap: 10px;
  }

  .btn {
    padding: 10px 18px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .btn-primary {
    background: #ff6b6b;
    color: white;
  }

  .btn-primary:hover {
    background: #ff5252;
    transform: translateY(-2px);
  }

  .btn-secondary {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }

  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  .btn-info {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }

  .btn-info:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    .navbar-content {
      flex-direction: column;
      gap: 12px;
      padding: 12px 15px;
    }

    .navbar-left {
      flex-direction: column;
      gap: 8px;
    }

    .navbar-right {
      width: 100%;
      flex-wrap: wrap;
      justify-content: center;
    }

    .btn {
      font-size: 12px;
      padding: 8px 12px;
    }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default Navbar;
