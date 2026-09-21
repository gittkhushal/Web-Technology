import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import DiagramCanvas from './components/DiagramCanvas';
import CodeGenerator from './components/CodeGenerator';
import CreatleyIntegration from './components/CreatleyIntegration';
import { DraggableWidgetDemo } from '../components/ui/demo';

interface UMLClass {
  name: string;
  attributes: string[];
  methods: string[];
  x: number;
  y: number;
  width?: number;
  height?: number;
}

function App() {
  const [classes, setClasses] = useState<UMLClass[]>([]);
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [generatedCode, setGeneratedCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [creatlelyConnected, setCreatlelyConnected] = useState(false);
  const [showWidgetGrid, setShowWidgetGrid] = useState(false);

  const addClass = (newClass: UMLClass) => {
    setClasses([...classes, newClass]);
  };

  const updateClass = (index: number, updatedClass: UMLClass) => {
    const updatedClasses = [...classes];
    updatedClasses[index] = updatedClass;
    setClasses(updatedClasses);
  };

  const deleteClass = (index: number) => {
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
      {showWidgetGrid ? (
        <div>
          <button
            onClick={() => setShowWidgetGrid(false)}
            className="fixed top-4 left-4 z-50 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            ← Back to Diagram Editor
          </button>
          <DraggableWidgetDemo />
        </div>
      ) : (
        <>
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

                <button
                  onClick={() => setShowWidgetGrid(true)}
                  className="w-full mt-4 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors font-semibold"
                >
                  📊 Widget Grid Demo
                </button>
              </div>
            </div>

            {showCode && (
              <div className="code-section">
                <CodeGenerator code={generatedCode} />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
