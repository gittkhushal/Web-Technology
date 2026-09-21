import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import DiagramCanvas from './components/DiagramCanvas';
import CodeGenerator from './components/CodeGenerator';
import CreatleyIntegration from './components/CreatleyIntegration';

function App() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [generatedCode, setGeneratedCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [creatlelyConnected, setCreatlelyConnected] = useState(false);

  const addClass = (newClass) => {
    setClasses([...classes, newClass]);
  };

  const updateClass = (index, updatedClass) => {
    const updatedClasses = [...classes];
    updatedClasses[index] = updatedClass;
    setClasses(updatedClasses);
  };

  const deleteClass = (index) => {
    const newClasses = classes.filter((_, i) => i !== index);
    setClasses(newClasses);
    setSelectedClass(null);
  };

  const generateJavaCode = () => {
    if (classes.length === 0) {
      alert('Please create at least one class first!');
      return;
    }

    let code = '';
    classes.forEach((umlClass) => {
      code += `public class ${umlClass.name} {\n\n`;
      
      if (umlClass.attributes && umlClass.attributes.length > 0) {
        code += '    // Attributes\n';
        umlClass.attributes.forEach((attr) => {
          // Parse attribute: "name:String" -> "private String name;"
          const [name, type] = attr.split(':').map(s => s.trim());
          if (name && type) {
            code += `    private ${type} ${name};\n`;
          }
        });
      }

      if (umlClass.methods && umlClass.methods.length > 0) {
        code += '\n    // Methods\n';
        umlClass.methods.forEach((method) => {
          // Parse method: "getName():String" -> "public String getName() {"
          const match = method.match(/^(\w+)\((.*?)\):(.+)$/);
          if (match) {
            const [, methodName, params, returnType] = match;
            code += `    public ${returnType.trim()} ${methodName}(${params}) {\n`;
            code += `        // TODO: Implement\n`;
            code += `    }\n\n`;
          }
        });
      }

      code += '}\n\n';
    });

    setGeneratedCode(code);
    setShowCode(true);
  };

  return (
    <div className="App">
      <Navbar 
        classCount={classes.length}
        onGenerateCode={generateJavaCode}
        onShowCode={() => setShowCode(!showCode)}
      />
      
      <div className="container">
        <div className="main-content">
          <div className="canvas-section">
            <DiagramCanvas 
              classes={classes}
              selectedClass={selectedClass}
              onSelectClass={setSelectedClass}
              onAddClass={addClass}
              onUpdateClass={updateClass}
              onDeleteClass={deleteClass}
            />
          </div>

          <div className="control-section">
            <CreatleyIntegration 
              onConnected={() => setCreatlelyConnected(!creatlelyConnected)}
              connected={creatlelyConnected}
              classes={classes}
            />
            
            <div className="class-list">
              <h3>Classes ({classes.length})</h3>
              <div className="class-items">
                {classes.map((umlClass, index) => (
                  <div 
                    key={index}
                    className={`class-item ${selectedClass === index ? 'selected' : ''}`}
                    onClick={() => setSelectedClass(index)}
                  >
                    <span>{umlClass.name}</span>
                    <button 
                      className="delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteClass(index);
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {showCode && (
          <div className="code-section">
            <CodeGenerator code={generatedCode} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
