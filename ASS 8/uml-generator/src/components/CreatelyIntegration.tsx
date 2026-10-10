import React, { useState, useRef } from 'react';
import { UMLClass, UMLRelationship, DiagramData } from '../types/uml';
import {
  Download,
  Upload,
  Globe,
  HelpCircle,
  CheckCircle,
  FileJson,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from 'lucide-react';
import { generatePlantUML, generateMermaid } from '../utils/codeGenerator';

interface CreatelyIntegrationProps {
  classes: UMLClass[];
  relationships: UMLRelationship[];
  connected: boolean;
  onConnected: () => void;
  onImportDiagram: (data: DiagramData) => void;
}

export const CreatelyIntegration: React.FC<CreatelyIntegrationProps> = ({
  classes,
  relationships,
  connected,
  onConnected,
  onImportDiagram,
}) => {
  const [showGuide, setShowGuide] = useState(false);
  const [showPasteModal, setShowPasteModal] = useState(false);
  const [pastedJson, setPastedJson] = useState('');
  const [notification, setNotification] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleOpenCreately = () => {
    window.open('https://creately.com/', '_blank');
  };

  // Export Diagram to JSON
  const handleExportJSON = () => {
    if (classes.length === 0) {
      alert('Please create at least one UML class before exporting.');
      return;
    }

    const diagramData: DiagramData = {
      title: 'UML Class Diagram',
      version: '2.0',
      timestamp: new Date().toISOString(),
      classes: classes.map((c) => ({
        id: c.id,
        name: c.name,
        stereotype: c.stereotype,
        color: c.color,
        attributes: c.attributes,
        methods: c.methods,
        x: c.x,
        y: c.y,
        width: c.width || 210,
      })),
      relationships: relationships.map((r) => ({
        id: r.id,
        sourceId: r.sourceId,
        targetId: r.targetId,
        type: r.type,
        label: r.label,
        sourceMultiplicity: r.sourceMultiplicity,
        targetMultiplicity: r.targetMultiplicity,
      })),
    };

    const jsonString = JSON.stringify(diagramData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `uml-diagram-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('Diagram exported as JSON file successfully!');
  };

  // Process Diagram JSON data
  const processImportData = (parsed: any) => {
    if (!parsed || typeof parsed !== 'object') {
      throw new Error('Invalid JSON format.');
    }

    if (!Array.isArray(parsed.classes)) {
      throw new Error('JSON diagram missing "classes" array.');
    }

    // Format & validate classes
    const validClasses: UMLClass[] = parsed.classes.map((c: any, index: number) => ({
      id: c.id || `class-${Date.now()}-${index}`,
      name: c.name || `Class${index + 1}`,
      stereotype: c.stereotype || 'class',
      color: c.color || '#3b82f6',
      attributes: Array.isArray(c.attributes) ? c.attributes : [],
      methods: Array.isArray(c.methods) ? c.methods : [],
      x: typeof c.x === 'number' ? c.x : 100 + (index % 3) * 120,
      y: typeof c.y === 'number' ? c.y : 100 + Math.floor(index / 3) * 100,
      width: c.width || 210,
    }));

    // Format relationships if present
    const validRelationships: UMLRelationship[] = Array.isArray(parsed.relationships)
      ? parsed.relationships.map((r: any, index: number) => ({
          id: r.id || `rel-${Date.now()}-${index}`,
          sourceId: r.sourceId,
          targetId: r.targetId,
          type: r.type || 'association',
          label: r.label,
          sourceMultiplicity: r.sourceMultiplicity,
          targetMultiplicity: r.targetMultiplicity,
        }))
      : [];

    onImportDiagram({
      title: parsed.title || 'Imported UML Diagram',
      timestamp: new Date().toISOString(),
      classes: validClasses,
      relationships: validRelationships,
    });

    showToast(`Loaded diagram with ${validClasses.length} classes and ${validRelationships.length} relationships!`);
  };

  // Handle File Input Change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);
        processImportData(parsed);
        setErrorMsg(null);
      } catch (err: any) {
        setErrorMsg(err.message || 'Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
    // Reset input
    e.target.value = '';
  };

  // Handle Paste Modal Submit
  const handlePasteSubmit = () => {
    try {
      if (!pastedJson.trim()) return;
      const parsed = JSON.parse(pastedJson);
      processImportData(parsed);
      setPastedJson('');
      setShowPasteModal(false);
      setErrorMsg(null);
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid JSON syntax.');
    }
  };

  // Export PlantUML
  const handleExportPlantUML = () => {
    const puml = generatePlantUML(classes, relationships);
    const blob = new Blob([puml], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diagram.puml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('Exported PlantUML file!');
  };

  // Export Mermaid
  const handleExportMermaid = () => {
    const mmd = generateMermaid(classes, relationships);
    const blob = new Blob([mmd], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diagram.mmd';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('Exported Mermaid markdown file!');
  };

  return (
    <div className="bg-[#1e1e24] border-b border-[#2e2e34] p-4 text-white">
      {/* Toast Notification */}
      {notification && (
        <div className="mb-3 p-2.5 bg-emerald-950/80 border border-emerald-600/50 rounded-lg text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle size={15} className="shrink-0 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Error Alert */}
      {errorMsg && (
        <div className="mb-3 p-2.5 bg-rose-950/80 border border-rose-600/50 rounded-lg text-rose-300 text-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AlertCircle size={15} className="shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
          <button onClick={() => setErrorMsg(null)} className="text-rose-400 hover:text-white text-xs">
            ✕
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-300">
            Creately Integration
          </h3>
        </div>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          Ready
        </span>
      </div>

      <p className="text-xs text-gray-400 mb-3 leading-relaxed">
        Export your UML diagrams as standard JSON or import existing diagrams without requiring an API key.
      </p>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <button
          type="button"
          onClick={handleExportJSON}
          className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 shadow transition-all"
        >
          <Download size={14} /> Export JSON
        </button>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-3 py-2 bg-[#2a2a32] hover:bg-[#383842] border border-[#3e3e48] text-gray-200 hover:text-white rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all"
        >
          <Upload size={14} /> Import JSON
        </button>
      </div>

      {/* Additional Quick Exports */}
      <div className="grid grid-cols-3 gap-1.5 mb-3 text-[11px]">
        <button
          type="button"
          onClick={() => setShowPasteModal(true)}
          className="px-2 py-1.5 bg-[#17171a] hover:bg-[#25252b] border border-[#2a2a30] text-gray-400 hover:text-white rounded text-center transition-colors"
          title="Paste raw JSON directly"
        >
          📋 Paste JSON
        </button>
        <button
          type="button"
          onClick={handleExportPlantUML}
          className="px-2 py-1.5 bg-[#17171a] hover:bg-[#25252b] border border-[#2a2a30] text-gray-400 hover:text-white rounded text-center transition-colors"
          title="Download PlantUML file"
        >
          🌱 PlantUML
        </button>
        <button
          type="button"
          onClick={handleExportMermaid}
          className="px-2 py-1.5 bg-[#17171a] hover:bg-[#25252b] border border-[#2a2a30] text-gray-400 hover:text-white rounded text-center transition-colors"
          title="Download Mermaid diagram file"
        >
          🧜 Mermaid
        </button>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json,application/json"
        className="hidden"
      />

      {/* Creately Guide Accordion */}
      <div className="border-t border-[#2e2e34] pt-2.5">
        <button
          type="button"
          onClick={() => setShowGuide(!showGuide)}
          className="w-full flex items-center justify-between text-xs text-gray-400 hover:text-gray-200 py-1 transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <HelpCircle size={13} className="text-blue-400" />
            How to use with Creately.com
          </span>
          {showGuide ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {showGuide && (
          <div className="mt-2.5 p-3 bg-[#131316] rounded-lg border border-[#25252b] text-[11px] text-gray-300 space-y-2">
            <ol className="list-decimal pl-4 space-y-1 text-gray-400">
              <li>Design your UML classes and relationships here.</li>
              <li>Click <strong>Export JSON</strong> above to save your diagram file.</li>
              <li>
                Visit{' '}
                <a
                  href="https://creately.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Creately.com
                </a>{' '}
                and create a new workspace.
              </li>
              <li>Select <em>Import File</em> in Creately and upload your JSON diagram.</li>
              <li>Or import Creately exported diagrams back into this tool!</li>
            </ol>
            <button
              type="button"
              onClick={handleOpenCreately}
              className="w-full mt-2 px-3 py-1.5 bg-[#25252d] hover:bg-[#32323d] text-blue-400 hover:text-blue-300 rounded font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              <Globe size={13} /> Open Creately.com
            </button>
          </div>
        )}
      </div>

      {/* Paste JSON Modal */}
      {showPasteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-[#18181b] border border-[#27272a] rounded-xl shadow-2xl w-full max-w-lg p-5 text-white">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <FileJson size={16} className="text-blue-400" /> Paste Diagram JSON
              </h3>
              <button
                onClick={() => setShowPasteModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <textarea
              value={pastedJson}
              onChange={(e) => setPastedJson(e.target.value)}
              placeholder="Paste your diagram JSON here (with classes and relationships)..."
              rows={8}
              className="w-full p-3 bg-[#121214] border border-[#27272a] rounded-lg text-xs font-mono text-gray-200 focus:outline-none focus:border-blue-500 mb-3"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowPasteModal(false)}
                className="px-3 py-1.5 bg-[#27272a] hover:bg-[#3f3f46] text-gray-300 rounded text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlePasteSubmit}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-medium"
              >
                Load Diagram
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Also export as CreatleyIntegration for backwards compatibility
export const CreatleyIntegration = CreatelyIntegration;
export default CreatelyIntegration;
