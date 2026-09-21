import React, { useState, useRef } from 'react';

function DiagramCanvas({ classes, selectedClass, onSelectClass, onAddClass }) {
  const canvasRef = useRef(null);
  const [dragging, setDragging] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [editingClass, setEditingClass] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', attributes: '', methods: '' });

  const handleCanvasClick = (e) => {
    if (e.target === canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const newClass = {
        name: `Class${classes.length + 1}`,
        attributes: ['attribute:type'],
        methods: ['method():return'],
        x: x - 75,
        y: y - 50,
        width: 150,
        height: 100
      };
      onAddClass(newClass);
    }
  };

  const handleMouseDown = (e, index) => {
    e.stopPropagation();
    onSelectClass(index);
    setDragging(index);
    const rect = canvasRef.current.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left - classes[index].x,
      y: e.clientY - rect.top - classes[index].y
    });
  };

  const handleMouseMove = (e) => {
    if (dragging !== null) {
      const rect = canvasRef.current.getBoundingClientRect();
      const newX = e.clientX - rect.left - offset.x;
      const newY = e.clientY - rect.top - offset.y;
      
      const updatedClass = { ...classes[dragging], x: newX, y: newY };
      const updatedClasses = [...classes];
      updatedClasses[dragging] = updatedClass;
      
      // Update classes array (you need to pass updateClass function)
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  const startEdit = (index) => {
    setEditingClass(index);
    setEditForm({
      name: classes[index].name,
      attributes: classes[index].attributes.join('\n'),
      methods: classes[index].methods.join('\n')
    });
  };

  return (
    <div className="diagram-wrapper">
      <div 
        ref={canvasRef}
        className="diagram-canvas"
        onClick={handleCanvasClick}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {classes.map((umlClass, index) => (
          <div
            key={index}
            className={`uml-class-box ${selectedClass === index ? 'selected' : ''} ${dragging === index ? 'dragging' : ''}`}
            style={{
              left: `${umlClass.x}px`,
              top: `${umlClass.y}px`,
              width: `${umlClass.width || 150}px`,
              cursor: 'grab'
            }}
            onMouseDown={(e) => handleMouseDown(e, index)}
            onDoubleClick={() => startEdit(index)}
          >
            <div className="class-name">{umlClass.name}</div>
            <div className="divider"></div>
            <div className="class-attributes">
              {umlClass.attributes.map((attr, i) => (
                <div key={i} className="attr-item">- {attr}</div>
              ))}
            </div>
            <div className="divider"></div>
            <div className="class-methods">
              {umlClass.methods.map((method, i) => (
                <div key={i} className="method-item">+ {method}</div>
              ))}
            </div>
            <div className="class-actions">
              <button className="edit-btn" onClick={() => startEdit(index)} title="Edit">✎</button>
              <button className="delete-btn" onClick={() => alert('Delete not implemented yet')} title="Delete">✕</button>
            </div>
          </div>
        ))}
      </div>

      {editingClass !== null && (
        <div className="edit-modal-overlay" onClick={() => setEditingClass(null)}>
          <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Edit Class</h3>
            <input
              type="text"
              placeholder="Class Name"
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            />
            <textarea
              placeholder="Attributes (one per line)"
              value={editForm.attributes}
              onChange={(e) => setEditForm({ ...editForm, attributes: e.target.value })}
              rows="3"
            />
            <textarea
              placeholder="Methods (one per line)"
              value={editForm.methods}
              onChange={(e) => setEditForm({ ...editForm, methods: e.target.value })}
              rows="3"
            />
            <div className="modal-buttons">
              <button className="btn btn-save">Save</button>
              <button className="btn btn-cancel" onClick={() => setEditingClass(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="canvas-hint">
        💡 Click on canvas to add class | Drag to move | Double-click to edit
      </div>
    </div>
  );
}

export default DiagramCanvas;
