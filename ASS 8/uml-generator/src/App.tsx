import React, { useState, useEffect } from 'react';
import { UMLClass, UMLRelationship, DiagramData } from './types/uml';
import Navbar from './components/Navbar';
import DiagramCanvas from './components/DiagramCanvas';
import CodeGenerator from './components/CodeGenerator';
import CreatelyIntegration from './components/CreatelyIntegration';
import Dashboard from './components/ui/dashboard';
import { ClassModal } from './components/ClassModal';
import { RelationshipModal } from './components/RelationshipModal';
import { AboutModal } from './components/AboutModal';
import { TEMPLATES } from './utils/diagramTemplates';
import { Layers, Link as LinkIcon, Trash2, Edit2, Plus } from 'lucide-react';

const STORAGE_KEY_CLASSES = 'wt_uml_classes_v2';
const STORAGE_KEY_RELS = 'wt_uml_relationships_v2';

export function App() {
  // Load initial classes from LocalStorage or default to University template
  const [classes, setClasses] = useState<UMLClass[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CLASSES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      // Ignore
    }
    return TEMPLATES[0].classes;
  });

  const [relationships, setRelationships] = useState<UMLRelationship[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_RELS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      // Ignore
    }
    return TEMPLATES[0].relationships;
  });

  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [showCode, setShowCode] = useState(false);
  const [activeTab, setActiveTab] = useState<'canvas' | 'dashboard'>('canvas');
  const [createlyConnected, setCreatelyConnected] = useState(true);

  // Modals state
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<UMLClass | null>(null);

  const [isRelModalOpen, setIsRelModalOpen] = useState(false);
  const [defaultRelSourceId, setDefaultRelSourceId] = useState<string | null>(null);

  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CLASSES, JSON.stringify(classes));
      localStorage.setItem(STORAGE_KEY_RELS, JSON.stringify(relationships));
    } catch (e) {
      // Ignore
    }
  }, [classes, relationships]);

  // Class Actions
  const handleOpenAddClass = () => {
    setEditingClass(null);
    setIsClassModalOpen(true);
  };

  const handleOpenEditClass = (cls: UMLClass) => {
    setEditingClass(cls);
    setIsClassModalOpen(true);
  };

  const handleSaveClass = (savedClass: UMLClass) => {
    const exists = classes.some((c) => c.id === savedClass.id);
    if (exists) {
      setClasses(classes.map((c) => (c.id === savedClass.id ? savedClass : c)));
    } else {
      setClasses([...classes, savedClass]);
    }
    setSelectedClassId(savedClass.id);
  };

  const handleDeleteClass = (id: string) => {
    setClasses(classes.filter((c) => c.id !== id));
    // Remove all associated relationships
    setRelationships(relationships.filter((r) => r.sourceId !== id && r.targetId !== id));
    if (selectedClassId === id) setSelectedClassId(null);
  };

  const handleUpdateClassPosition = (id: string, x: number, y: number) => {
    setClasses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, x, y } : c))
    );
  };

  // Relationship Actions
  const handleOpenAddRelationship = (sourceId?: string) => {
    setDefaultRelSourceId(sourceId || null);
    setIsRelModalOpen(true);
  };

  const handleSaveRelationship = (savedRel: UMLRelationship) => {
    const exists = relationships.some((r) => r.id === savedRel.id);
    if (exists) {
      setRelationships(relationships.map((r) => (r.id === savedRel.id ? savedRel : r)));
    } else {
      setRelationships([...relationships, savedRel]);
    }
  };

  const handleDeleteRelationship = (id: string) => {
    setRelationships(relationships.filter((r) => r.id !== id));
  };

  // Template Loader
  const handleLoadTemplate = (templateId: string) => {
    const template = TEMPLATES.find((t) => t.id === templateId);
    if (template) {
      setClasses(template.classes);
      setRelationships(template.relationships);
      setSelectedClassId(null);
    }
  };

  // Clear Canvas
  const handleClearCanvas = () => {
    if (window.confirm('Are you sure you want to clear the entire diagram?')) {
      setClasses([]);
      setRelationships([]);
      setSelectedClassId(null);
    }
  };

  // Import JSON Diagram
  const handleImportDiagram = (data: DiagramData) => {
    setClasses(data.classes);
    setRelationships(data.relationships || []);
    setSelectedClassId(null);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#141417] text-white overflow-hidden font-sans">
      {/* Top Navbar */}
      <Navbar
        classCount={classes.length}
        relationshipCount={relationships.length}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        showCode={showCode}
        onToggleCode={() => setShowCode(!showCode)}
        onOpenAbout={() => setIsAboutModalOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden relative">
        {/* Canvas Mode */}
        {activeTab === 'canvas' && (
          <div className="flex h-full w-full overflow-hidden">
            {/* Visual Canvas (Center/Left) */}
            <div className="flex-1 h-full overflow-hidden relative">
              <DiagramCanvas
                classes={classes}
                relationships={relationships}
                selectedClassId={selectedClassId}
                onSelectClass={setSelectedClassId}
                onAddClass={handleOpenAddClass}
                onEditClass={handleOpenEditClass}
                onDeleteClass={handleDeleteClass}
                onUpdateClassPosition={handleUpdateClassPosition}
                onAddRelationship={handleOpenAddRelationship}
                onDeleteRelationship={handleDeleteRelationship}
                onLoadTemplate={handleLoadTemplate}
                onClearCanvas={handleClearCanvas}
              />
            </div>

            {/* Sidebar / Code Panel */}
            <div
              className={`transition-all duration-300 border-l border-[#27272a] bg-[#18181b] flex flex-col h-full z-20 ${
                showCode ? 'w-[480px] lg:w-[540px]' : 'w-72 lg:w-80'
              }`}
            >
              {showCode ? (
                // Code Generator Panel
                <CodeGenerator classes={classes} relationships={relationships} />
              ) : (
                // Diagram Controls & Explorer Sidebar
                <div className="flex flex-col h-full overflow-hidden">
                  {/* Creately Integration Module */}
                  <CreatelyIntegration
                    classes={classes}
                    relationships={relationships}
                    connected={createlyConnected}
                    onConnected={() => setCreatelyConnected(!createlyConnected)}
                    onImportDiagram={handleImportDiagram}
                  />

                  {/* Class Explorer List */}
                  <div className="flex-1 flex flex-col min-h-0 p-4 overflow-hidden border-t border-[#27272a]">
                    <div className="flex items-center justify-between mb-2.5">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                        <Layers size={14} className="text-blue-400" />
                        Classes ({classes.length})
                      </h3>
                      <button
                        type="button"
                        onClick={handleOpenAddClass}
                        className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1"
                      >
                        <Plus size={13} /> Add
                      </button>
                    </div>

                    {/* Classes Items Scrollable List */}
                    <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
                      {classes.length === 0 ? (
                        <div className="text-xs text-gray-500 italic py-4 text-center">
                          No classes created. Click "+ Add" to create one.
                        </div>
                      ) : (
                        classes.map((cls) => {
                          const isSelected = selectedClassId === cls.id;
                          return (
                            <div
                              key={cls.id}
                              onClick={() => setSelectedClassId(cls.id)}
                              className={`flex items-center justify-between p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                                isSelected
                                  ? 'bg-blue-600/20 border-blue-500 text-white font-semibold'
                                  : 'bg-[#1e1e24] border-[#2e2e34] text-gray-300 hover:bg-[#282830]'
                              }`}
                            >
                              <div className="flex items-center gap-2 truncate">
                                <span
                                  className="w-2.5 h-2.5 rounded-full shrink-0"
                                  style={{ backgroundColor: cls.color || '#3b82f6' }}
                                />
                                <span className="truncate font-mono">{cls.name}</span>
                                {cls.stereotype && cls.stereotype !== 'class' && (
                                  <span className="text-[10px] text-gray-500 italic">
                                    &lt;&lt;{cls.stereotype}&gt;&gt;
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-1 opacity-70 hover:opacity-100">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpenEditClass(cls);
                                  }}
                                  className="p-1 hover:text-blue-400 rounded"
                                  title="Edit"
                                >
                                  <Edit2 size={12} />
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteClass(cls.id);
                                  }}
                                  className="p-1 hover:text-rose-400 rounded"
                                  title="Delete"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>

                    {/* Relationships List */}
                    <div className="mt-4 pt-3 border-t border-[#27272a]">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                          <LinkIcon size={13} className="text-purple-400" />
                          Relationships ({relationships.length})
                        </h4>
                        <button
                          type="button"
                          onClick={() => handleOpenAddRelationship()}
                          disabled={classes.length < 2}
                          className={`text-xs font-medium flex items-center gap-1 ${
                            classes.length >= 2
                              ? 'text-purple-400 hover:text-purple-300'
                              : 'text-gray-600 cursor-not-allowed'
                          }`}
                        >
                          <Plus size={13} /> Add
                        </button>
                      </div>

                      <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
                        {relationships.length === 0 ? (
                          <div className="text-[11px] text-gray-500 italic py-1 text-center">
                            No relationships yet.
                          </div>
                        ) : (
                          relationships.map((rel) => {
                            const src = classes.find((c) => c.id === rel.sourceId)?.name || 'Unknown';
                            const tgt = classes.find((c) => c.id === rel.targetId)?.name || 'Unknown';
                            return (
                              <div
                                key={rel.id}
                                className="flex items-center justify-between p-2 rounded-lg bg-[#141418] border border-[#27272a] text-[11px] text-gray-300 font-mono"
                              >
                                <div className="truncate">
                                  <span className="text-blue-400">{src}</span>
                                  <span className="text-gray-500 mx-1">
                                    {rel.type === 'inheritance' && '—▷'}
                                    {rel.type === 'realization' && '..▷'}
                                    {rel.type === 'composition' && '◆—'}
                                    {rel.type === 'aggregation' && '◇—'}
                                    {rel.type === 'association' && '—>'}
                                    {rel.type === 'dependency' && '..>'}
                                  </span>
                                  <span className="text-emerald-400">{tgt}</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteRelationship(rel.id)}
                                  className="text-gray-500 hover:text-rose-400 p-0.5"
                                  title="Delete relationship"
                                >
                                  <Trash2 size={11} />
                                </button>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Dashboard Mode */}
        {activeTab === 'dashboard' && (
          <div className="w-full h-full overflow-y-auto bg-background">
            <Dashboard classes={classes} relationships={relationships} generatedCode="" />
          </div>
        )}
      </div>

      {/* Modals */}
      <ClassModal
        isOpen={isClassModalOpen}
        onClose={() => setIsClassModalOpen(false)}
        onSave={handleSaveClass}
        initialClass={editingClass}
        classesCount={classes.length}
      />

      <RelationshipModal
        isOpen={isRelModalOpen}
        onClose={() => setIsRelModalOpen(false)}
        onSave={handleSaveRelationship}
        classes={classes}
        defaultSourceId={defaultRelSourceId}
      />

      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />
    </div>
  );
}

export default App;
