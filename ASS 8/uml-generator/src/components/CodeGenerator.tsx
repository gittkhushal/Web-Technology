import React, { useState } from 'react';
import { UMLClass, UMLRelationship, GeneratorOptions } from '../types/uml';
import {
  generateAllJavaCode,
  generatePlantUML,
  generateMermaid,
} from '../utils/codeGenerator';
import {
  Copy,
  Check,
  Download,
  Settings,
  FileCode,
} from 'lucide-react';

interface CodeGeneratorProps {
  classes: UMLClass[];
  relationships: UMLRelationship[];
}

export const CodeGenerator: React.FC<CodeGeneratorProps> = ({
  classes,
  relationships,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'java' | 'plantuml' | 'mermaid'>('java');
  const [showOptions, setShowOptions] = useState(false);

  const [options, setOptions] = useState<GeneratorOptions>({
    includeConstructors: true,
    includeGettersSetters: true,
    includeToString: true,
    includeComments: true,
  });

  const { files, combined } = generateAllJavaCode(classes, relationships, options);
  const plantUMLCode = generatePlantUML(classes, relationships);
  const mermaidCode = generateMermaid(classes, relationships);

  // Get current active code
  let displayedCode = '';
  let currentFileName = 'AllClasses.java';

  if (viewMode === 'plantuml') {
    displayedCode = plantUMLCode;
    currentFileName = 'diagram.puml';
  } else if (viewMode === 'mermaid') {
    displayedCode = mermaidCode;
    currentFileName = 'diagram.mmd';
  } else {
    if (activeTab === 'all') {
      displayedCode = combined;
      currentFileName = 'AllClasses.java';
    } else {
      displayedCode = files[activeTab] || '// Class code not found';
      currentFileName = activeTab;
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(displayedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCurrent = () => {
    const blob = new Blob([displayedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = currentFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = () => {
    Object.entries(files).forEach(([fileName, content], index) => {
      setTimeout(() => {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, index * 200);
    });
  };

  // Render code with line numbers
  const lines = displayedCode.split('\n');

  return (
    <div className="flex flex-col h-full bg-[#18181b] border-l border-[#27272a] text-white">
      {/* Code Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#27272a] bg-[#1e1e24] flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <FileCode size={18} className="text-blue-400" />
          <h3 className="text-sm font-semibold text-white">
            Generated Source Code
          </h3>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono">
            {classes.length} classes
          </span>
        </div>

        {/* View Mode Switcher (Java / PlantUML / Mermaid) */}
        <div className="flex items-center bg-[#141417] p-0.5 rounded-lg border border-[#2a2a30] text-xs">
          <button
            type="button"
            onClick={() => setViewMode('java')}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              viewMode === 'java'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Java
          </button>
          <button
            type="button"
            onClick={() => setViewMode('plantuml')}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              viewMode === 'plantuml'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            PlantUML
          </button>
          <button
            type="button"
            onClick={() => setViewMode('mermaid')}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              viewMode === 'mermaid'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Mermaid
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {viewMode === 'java' && (
            <button
              type="button"
              onClick={() => setShowOptions(!showOptions)}
              className="p-1.5 rounded-lg bg-[#27272a] hover:bg-[#3f3f46] text-gray-300 hover:text-white transition-colors"
              title="Java Code Generation Options"
            >
              <Settings size={15} />
            </button>
          )}

          <button
            type="button"
            onClick={handleCopy}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-[#27272a] hover:bg-[#3f3f46] text-gray-200'
            }`}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>

          <button
            type="button"
            onClick={handleDownloadCurrent}
            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium flex items-center gap-1.5 transition-colors shadow-sm"
            title={`Download ${currentFileName}`}
          >
            <Download size={14} /> Download
          </button>

          {viewMode === 'java' && classes.length > 1 && (
            <button
              type="button"
              onClick={handleDownloadAll}
              className="px-2.5 py-1.5 rounded-lg bg-[#27272a] hover:bg-[#3f3f46] text-gray-300 hover:text-white text-xs font-medium transition-colors"
              title="Download each class as an individual .java file"
            >
              All (.java)
            </button>
          )}
        </div>
      </div>

      {/* Generation Options Dropdown */}
      {showOptions && viewMode === 'java' && (
        <div className="p-3 bg-[#1e1e24] border-b border-[#2e2e34] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-gray-300">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options.includeConstructors}
              onChange={(e) =>
                setOptions({ ...options, includeConstructors: e.target.checked })
              }
              className="rounded bg-[#27272a] border-[#3f3f46] text-blue-600 focus:ring-0"
            />
            <span>Constructors</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options.includeGettersSetters}
              onChange={(e) =>
                setOptions({ ...options, includeGettersSetters: e.target.checked })
              }
              className="rounded bg-[#27272a] border-[#3f3f46] text-blue-600 focus:ring-0"
            />
            <span>Getters / Setters</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options.includeToString}
              onChange={(e) =>
                setOptions({ ...options, includeToString: e.target.checked })
              }
              className="rounded bg-[#27272a] border-[#3f3f46] text-blue-600 focus:ring-0"
            />
            <span>toString() Method</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options.includeComments}
              onChange={(e) =>
                setOptions({ ...options, includeComments: e.target.checked })
              }
              className="rounded bg-[#27272a] border-[#3f3f46] text-blue-600 focus:ring-0"
            />
            <span>Section Comments</span>
          </label>
        </div>
      )}

      {/* Class Tabs (when in Java mode) */}
      {viewMode === 'java' && (
        <div className="flex items-center gap-1 px-4 py-2 bg-[#121215] border-b border-[#27272a] overflow-x-auto text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1 rounded-md font-mono transition-colors whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-blue-600 text-white font-medium'
                : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
            }`}
          >
            All Classes (Single File)
          </button>
          {classes.map((cls) => {
            const fileName = `${cls.name}.java`;
            return (
              <button
                key={cls.id}
                type="button"
                onClick={() => setActiveTab(fileName)}
                className={`px-3 py-1 rounded-md font-mono transition-colors whitespace-nowrap ${
                  activeTab === fileName
                    ? 'bg-blue-600 text-white font-medium'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
              >
                {fileName}
              </button>
            );
          })}
        </div>
      )}

      {/* Code Display Area */}
      <div className="flex-1 overflow-auto bg-[#0d0d11] p-4 font-mono text-xs leading-relaxed">
        {classes.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-2">
            <FileCode size={36} className="text-gray-600" />
            <p>No UML classes created yet.</p>
            <p className="text-[11px] text-gray-600">
              Create a class on the canvas to generate Java code automatically.
            </p>
          </div>
        ) : (
          <div className="table w-full">
            {lines.map((line, idx) => (
              <div key={idx} className="table-row hover:bg-white/[0.02]">
                <span className="table-cell select-none text-right pr-4 text-gray-600 w-10 text-[11px]">
                  {idx + 1}
                </span>
                <span className="table-cell whitespace-pre text-gray-300">
                  {formatJavaSyntax(line)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Basic syntax highlighting for Java keywords in line
 */
function formatJavaSyntax(line: string): React.ReactNode {
  if (line.trim().startsWith('//')) {
    return <span className="text-gray-500 italic">{line}</span>;
  }
  if (line.trim().startsWith('@')) {
    return <span className="text-amber-400">{line}</span>;
  }

  // Keywords to highlight
  const keywords = [
    'public',
    'private',
    'protected',
    'class',
    'interface',
    'enum',
    'abstract',
    'extends',
    'implements',
    'return',
    'void',
    'import',
    'package',
    'new',
    'super',
    'this',
  ];

  const types = ['String', 'int', 'double', 'boolean', 'float', 'long', 'List', 'ArrayList'];

  const parts = line.split(/(\b\w+\b|[^\w\s]+|\s+)/g).filter(Boolean);

  return (
    <>
      {parts.map((token, i) => {
        if (keywords.includes(token)) {
          return (
            <span key={i} className="text-purple-400 font-semibold">
              {token}
            </span>
          );
        }
        if (types.includes(token)) {
          return (
            <span key={i} className="text-amber-300">
              {token}
            </span>
          );
        }
        if (/^".*"$/.test(token)) {
          return (
            <span key={i} className="text-emerald-400">
              {token}
            </span>
          );
        }
        return <span key={i}>{token}</span>;
      })}
    </>
  );
}

export default CodeGenerator;
