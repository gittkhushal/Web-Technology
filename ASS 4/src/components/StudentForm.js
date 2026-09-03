import React, { useState } from 'react';

function StudentForm({ onCalculate }) {
  const [studentName, setStudentName] = useState('');
  const [studentRoll, setStudentRoll] = useState('');
  const [subjects, setSubjects] = useState([
    { id: 1, name: 'Mathematics', internalMarks: '', externalMarks: '' },
    { id: 2, name: 'Physics', internalMarks: '', externalMarks: '' },
    { id: 3, name: 'Chemistry', internalMarks: '', externalMarks: '' },
  ]);
  const [error, setError] = useState('');

  const addSubject = () => {
    const newId = Math.max(...subjects.map(s => s.id), 0) + 1;
    setSubjects([
      ...subjects,
      { id: newId, name: '', internalMarks: '', externalMarks: '' }
    ]);
  };

  const removeSubject = (id) => {
    if (subjects.length > 1) {
      setSubjects(subjects.filter(s => s.id !== id));
    }
  };

  const updateSubject = (id, field, value) => {
    setSubjects(subjects.map(s =>
      s.id === id ? { ...s, [field]: value } : s
    ));
  };

  const validateForm = () => {
    if (!studentName.trim()) {
      setError('Please enter student name');
      return false;
    }
    if (!studentRoll.trim()) {
      setError('Please enter roll number');
      return false;
    }

    for (let subject of subjects) {
      if (!subject.name.trim()) {
        setError('Please enter all subject names');
        return false;
      }
      if (subject.internalMarks === '' || subject.externalMarks === '') {
        setError('Please enter marks for all subjects');
        return false;
      }

      const internal = parseFloat(subject.internalMarks);
      const external = parseFloat(subject.externalMarks);

      if (isNaN(internal) || isNaN(external)) {
        setError('Marks must be valid numbers');
        return false;
      }

      if (internal < 0 || internal > 40 || external < 0 || external > 60) {
        setError('Internal marks should be 0-40 and external marks should be 0-60');
        return false;
      }
    }

    return true;
  };

  const handleCalculate = () => {
    setError('');
    if (validateForm()) {
      const calculatedSubjects = subjects.map(subject => {
        const internal = parseFloat(subject.internalMarks);
        const external = parseFloat(subject.externalMarks);
        const finalMarks = internal + external;
        const percentage = (finalMarks / 100) * 100;
        let grade = 'F';

        if (percentage >= 90) grade = 'A+';
        else if (percentage >= 80) grade = 'A';
        else if (percentage >= 70) grade = 'B+';
        else if (percentage >= 60) grade = 'B';
        else if (percentage >= 50) grade = 'C';
        else if (percentage >= 40) grade = 'D';

        return {
          ...subject,
          internalMarks: internal,
          externalMarks: external,
          finalMarks,
          percentage,
          grade
        };
      });

      const totalMarks = calculatedSubjects.reduce((sum, s) => sum + s.finalMarks, 0);
      const overallPercentage = (totalMarks / (calculatedSubjects.length * 100)) * 100;
      let overallGrade = 'F';

      if (overallPercentage >= 90) overallGrade = 'A+';
      else if (overallPercentage >= 80) overallGrade = 'A';
      else if (overallPercentage >= 70) overallGrade = 'B+';
      else if (overallPercentage >= 60) overallGrade = 'B';
      else if (overallPercentage >= 50) overallGrade = 'C';
      else if (overallPercentage >= 40) overallGrade = 'D';

      const result = overallPercentage >= 40 ? 'PASS' : 'FAIL';

      onCalculate({
        studentName,
        studentRoll,
        subjects: calculatedSubjects,
        totalMarks,
        overallPercentage,
        overallGrade,
        result
      });
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>
          <i className="bi bi-pencil-square"></i>
          Student Information
        </h2>
      </div>

      <div className="card-body">
        {error && (
          <div className="error-message">
            <i className="bi bi-exclamation-circle error-icon"></i>
            {error}
          </div>
        )}

        <div className="form-section">
          <label className="form-label">
            <i className="bi bi-person"></i>
            Student Name
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter student name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
        </div>

        <div className="form-section">
          <label className="form-label">
            <i className="bi bi-hash"></i>
            Roll Number
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter roll number"
            value={studentRoll}
            onChange={(e) => setStudentRoll(e.target.value)}
          />
        </div>

        <div className="form-section">
          <label className="form-label">
            <i className="bi bi-book"></i>
            Subjects and Marks
          </label>

          {subjects.map(subject => (
            <div key={subject.id} className="subject-container">
              <div className="subject-header">
                <div className="subject-title">
                  <i className="bi bi-file-earmark"></i>
                  Subject {subjects.indexOf(subject) + 1}
                </div>
                {subjects.length > 1 && (
                  <button
                    className="remove-subject-btn"
                    onClick={() => removeSubject(subject.id)}
                  >
                    <i className="bi bi-trash"></i> Remove
                  </button>
                )}
              </div>

              <div className="form-section">
                <label className="form-label">Subject Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter subject name"
                  value={subject.name}
                  onChange={(e) => updateSubject(subject.id, 'name', e.target.value)}
                />
              </div>

              <div className="marks-input-group">
                <div>
                  <label className="form-label">Internal Marks (0-40)</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="0"
                    min="0"
                    max="40"
                    value={subject.internalMarks}
                    onChange={(e) => updateSubject(subject.id, 'internalMarks', e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">External Marks (0-60)</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="0"
                    min="0"
                    max="60"
                    value={subject.externalMarks}
                    onChange={(e) => updateSubject(subject.id, 'externalMarks', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            className="btn-custom btn-secondary-custom"
            onClick={addSubject}
            style={{ marginTop: '15px', width: '100%' }}
          >
            <i className="bi bi-plus-circle"></i>
            Add Subject
          </button>
        </div>

        <div className="button-group">
          <button
            className="btn-custom btn-primary-custom"
            onClick={handleCalculate}
          >
            <i className="bi bi-calculator"></i>
            Calculate Result
          </button>
          <button
            className="btn-custom btn-secondary-custom"
            onClick={() => {
              setStudentName('');
              setStudentRoll('');
              setSubjects([
                { id: 1, name: 'Mathematics', internalMarks: '', externalMarks: '' },
                { id: 2, name: 'Physics', internalMarks: '', externalMarks: '' },
                { id: 3, name: 'Chemistry', internalMarks: '', externalMarks: '' },
              ]);
              setError('');
            }}
          >
            <i className="bi bi-arrow-clockwise"></i>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentForm;
