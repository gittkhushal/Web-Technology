import React, { useState } from 'react';
import './App.css';
import StudentForm from './components/StudentForm';
import ResultDisplay from './components/ResultDisplay';

function App() {
  const [studentData, setStudentData] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleCalculateResult = (data) => {
    setStudentData(data);
    setShowResult(true);
  };

  const handleReset = () => {
    setStudentData(null);
    setShowResult(false);
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>
          <i className="bi bi-graph-up"></i>
          Student Result Calculator
        </h1>
        <p>Calculate semester marks and generate detailed result reports</p>
      </div>

      <div className="main-container">
        {!showResult ? (
          <StudentForm onCalculate={handleCalculateResult} />
        ) : (
          <ResultDisplay studentData={studentData} onReset={handleReset} />
        )}
      </div>
    </div>
  );
}

export default App;
