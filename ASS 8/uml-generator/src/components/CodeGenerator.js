import React from 'react';

function CodeGenerator({ code }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard!');
  };

  const downloadCode = () => {
    const element = document.createElement('a');
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'GeneratedCode.java';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="code-generator">
      <div className="code-header">
        <h3>📄 Generated Java Code</h3>
        <div className="code-buttons">
          <button className="btn btn-copy" onClick={copyToClipboard}>
            📋 Copy
          </button>
          <button className="btn btn-download" onClick={downloadCode}>
            ⬇️ Download
          </button>
        </div>
      </div>
      <pre className="code-display">
        <code>{code}</code>
      </pre>
    </div>
  );
}

const styles = `
  .code-generator {
    background: #f5f5f5;
    border-radius: 8px;
    overflow: hidden;
  }

  .code-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    background: #333;
    color: white;
  }

  .code-header h3 {
    margin: 0;
    font-size: 16px;
  }

  .code-buttons {
    display: flex;
    gap: 8px;
  }

  .btn-copy, .btn-download {
    padding: 6px 12px;
    background: #2196F3;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    transition: background 0.2s;
  }

  .btn-copy:hover, .btn-download:hover {
    background: #1976D2;
  }

  .code-display {
    background: #1e1e1e;
    color: #d4d4d4;
    padding: 20px;
    margin: 0;
    overflow-x: auto;
    font-family: 'Courier New', monospace;
    font-size: 13px;
    line-height: 1.5;
    max-height: 400px;
    overflow-y: auto;
  }

  .code-display code {
    color: #d4d4d4;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default CodeGenerator;
