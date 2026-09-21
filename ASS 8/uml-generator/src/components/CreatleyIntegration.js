import React, { useState } from 'react';

function CreatleyIntegration({ onConnected, connected, classes }) {
  const [showInfo, setShowInfo] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('');

  const handleOpenCreately = () => {
    // Open Creately in a new tab for user to create/access diagrams
    window.open('https://creately.com/', '_blank');
  };

  const handleManualConnect = () => {
    // Simulate connection for local use
    setConnectionStatus('Connecting...');
    
    setTimeout(() => {
      setConnectionStatus('✅ Connected! You can now export diagrams.');
      onConnected();
      setTimeout(() => setShowInfo(false), 2000);
    }, 1500);
  };

  const exportToCreately = () => {
    if (!connected) {
      alert('Please connect first');
      return;
    }

    // Build diagram data as JSON
    const diagramData = {
      title: 'UML Class Diagram',
      timestamp: new Date().toISOString(),
      classes: classes.map((c) => ({
        name: c.name,
        attributes: c.attributes,
        methods: c.methods
      }))
    };

    // Create downloadable JSON file
    const jsonString = JSON.stringify(diagramData, null, 2);
    const element = document.createElement('a');
    const file = new Blob([jsonString], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = 'uml-diagram.json';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    alert('✅ Diagram exported as JSON! You can import this to Creately or share it.');
  };

  const importFromCreately = () => {
    alert('To import: Go to Creately.com → Export your diagram as JSON → Come back and paste the data');
  };

  return (
    <div className="creately-integration">
      <div className="integration-header">
        <h3>🎨 Creately Integration</h3>
        {connected && <span className="connected-badge">Ready</span>}
      </div>

      {!connected ? (
        <div className="api-setup">
          <p>Export your UML diagrams to use with Creately</p>
          <div className="setup-buttons">
            <button 
              className="btn btn-creately"
              onClick={handleOpenCreately}
            >
              🌐 Open Creately.com
            </button>
            <button 
              className="btn btn-connect"
              onClick={() => setShowInfo(!showInfo)}
            >
              ℹ️ How to Connect
            </button>
          </div>

          {showInfo && (
            <div className="setup-info">
              <h4>📋 How It Works:</h4>
              <ol>
                <li>Click "Open Creately.com" to access Creately</li>
                <li>Sign in or create a free account</li>
                <li>Come back here and click "Connect"</li>
                <li>Export your diagrams as JSON</li>
                <li>Import JSON files to Creately</li>
              </ol>
              <button 
                className="btn btn-success"
                onClick={handleManualConnect}
              >
                ✅ I've Set Up Creately - Connect Now
              </button>
              {connectionStatus && <div className="status">{connectionStatus}</div>}
            </div>
          )}
        </div>
      ) : (
        <div className="creately-actions">
          <button 
            className="btn btn-action"
            onClick={exportToCreately}
          >
            📤 Export as JSON
          </button>
          <button 
            className="btn btn-action"
            onClick={importFromCreately}
          >
            📥 Import from JSON
          </button>
          <button 
            className="btn btn-action btn-disconnect"
            onClick={() => {
              onConnected();
              setShowInfo(false);
              setConnectionStatus('');
            }}
          >
            🔌 Disconnect
          </button>
          <p className="info-text">💡 Export diagrams and import them in Creately.com</p>
        </div>
      )}
    </div>
  );
}

const styles = `
  .creately-integration {
    background: white;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .integration-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  .integration-header h3 {
    margin: 0;
    color: #333;
    font-size: 16px;
  }

  .connected-badge {
    background: #4caf50;
    color: white;
    padding: 4px 8px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: bold;
  }

  .api-setup {
    text-align: center;
  }

  .api-setup p {
    color: #666;
    margin-bottom: 12px;
    font-size: 13px;
  }

  .setup-buttons {
    display: flex;
    gap: 8px;
    flex-direction: column;
  }

  .btn-creately {
    background: #ff7f50;
    color: white;
    padding: 10px 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.2s;
    font-size: 14px;
  }

  .btn-creately:hover {
    background: #ff6b35;
  }

  .btn-connect {
    background: #2196F3;
    color: white;
    padding: 10px 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.2s;
    font-size: 14px;
  }

  .btn-connect:hover {
    background: #1976D2;
  }

  .setup-info {
    margin-top: 15px;
    padding: 12px;
    background: #f9f9f9;
    border-radius: 5px;
    text-align: left;
    border: 1px solid #e0e0e0;
  }

  .setup-info h4 {
    margin-top: 0;
    color: #333;
    font-size: 13px;
  }

  .setup-info ol {
    margin: 10px 0;
    padding-left: 20px;
    font-size: 12px;
    color: #555;
    line-height: 1.6;
  }

  .setup-info li {
    margin-bottom: 5px;
  }

  .status {
    margin-top: 10px;
    padding: 8px;
    border-radius: 4px;
    font-size: 13px;
    text-align: center;
    background: #e8f5e9;
    color: #2e7d32;
  }

  .creately-actions {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .btn-action {
    padding: 10px;
    background: #2196F3;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
    font-size: 13px;
    transition: background 0.2s;
  }

  .btn-action:hover {
    background: #1976D2;
  }

  .btn-disconnect {
    background: #ff9800;
  }

  .btn-disconnect:hover {
    background: #f57c00;
  }

  .btn-success {
    background: #4caf50;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 13px;
    margin-top: 10px;
    width: 100%;
  }

  .btn-success:hover {
    background: #45a049;
  }

  .info-text {
    margin-top: 10px;
    font-size: 12px;
    color: #666;
    text-align: center;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default CreatleyIntegration;
