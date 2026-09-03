import React from 'react';

function ResultDisplay({ studentData, onReset }) {
  const handlePrint = () => {
    window.print();
  };

  const getResultColor = (result) => {
    return result === 'PASS' ? '#28a745' : '#dc3545';
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>
          <i className="bi bi-check-circle"></i>
          Result Summary
        </h2>
      </div>

      <div className="card-body">
        <div className="result-section">
          {/* Header Section */}
          <div className="result-header">
            <div className="result-title">
              <i className="bi bi-award"></i>
              {studentData.result === 'PASS' ? '✓ Result: PASS' : '✗ Result: FAIL'}
            </div>
          </div>

          {/* Student Information */}
          <div className="student-info">
            <div className="info-item">
              <div className="info-label">Student Name</div>
              <div className="info-value">{studentData.studentName}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Roll Number</div>
              <div className="info-value">{studentData.studentRoll}</div>
            </div>
          </div>

          {/* Subject Results */}
          <div className="subject-results">
            <div className="subject-results-title">
              <i className="bi bi-list-check"></i>
              Subject-wise Results
            </div>

            {studentData.subjects.map((subject, index) => (
              <div key={index} className="subject-result-item">
                <div className="subject-name">
                  <i className="bi bi-book"></i>
                  {subject.name}
                </div>
                <div className="marks-column">
                  <div className="marks-column-label">Internal</div>
                  <div className="marks-column-value">{subject.internalMarks}</div>
                </div>
                <div className="marks-column">
                  <div className="marks-column-label">External</div>
                  <div className="marks-column-value">{subject.externalMarks}</div>
                </div>
                <div className="final-marks">
                  {subject.finalMarks}/100
                </div>
              </div>
            ))}
          </div>

          {/* Grade Cards */}
          <div className="grades-section">
            <div className="grade-card">
              <div className="grade-label">Total Marks</div>
              <div className="grade-value">{studentData.totalMarks}</div>
              <div className="grade-percentage">
                out of {studentData.subjects.length * 100}
              </div>
            </div>

            <div className="grade-card">
              <div className="grade-label">Overall Percentage</div>
              <div className="grade-value">{studentData.overallPercentage.toFixed(2)}%</div>
              <div className="grade-percentage">Performance</div>
            </div>

            <div className="grade-card">
              <div className="grade-label">Overall Grade</div>
              <div className="grade-value">{studentData.overallGrade}</div>
              <div className="grade-percentage">
                {studentData.result === 'PASS' ? 'Promoted' : 'Not Promoted'}
              </div>
            </div>
          </div>

          {/* Result Status */}
          <div className="result-status" style={{
            borderLeftColor: getResultColor(studentData.result),
            backgroundColor: getResultColor(studentData.result) + '10'
          }}>
            <div className="status-label">Final Result</div>
            <div className="status-value" style={{
              color: getResultColor(studentData.result)
            }}>
              {studentData.result}
            </div>
          </div>

          {/* Grade Distribution */}
          <div style={{
            marginTop: '30px',
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px'
          }}>
            <h5 style={{ marginBottom: '15px', fontWeight: 700 }}>
              <i className="bi bi-bar-chart"></i> Subject-wise Grades
            </h5>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '15px'
            }}>
              {studentData.subjects.map((subject, index) => (
                <div key={index} style={{
                  background: 'white',
                  padding: '12px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  borderTop: '3px solid #667eea'
                }}>
                  <div style={{
                    fontSize: '12px',
                    color: '#999',
                    fontWeight: 600,
                    marginBottom: '5px'
                  }}>
                    {subject.name}
                  </div>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    color: '#667eea',
                    marginBottom: '5px'
                  }}>
                    {subject.grade}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#555',
                    fontWeight: 600
                  }}>
                    {subject.percentage.toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '15px',
            marginTop: '30px'
          }}>
            <button
              className="btn-custom btn-primary-custom"
              onClick={handlePrint}
            >
              <i className="bi bi-printer"></i>
              Print Result
            </button>
            <button
              className="btn-custom btn-secondary-custom"
              onClick={onReset}
            >
              <i className="bi bi-arrow-left"></i>
              Back to Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultDisplay;
