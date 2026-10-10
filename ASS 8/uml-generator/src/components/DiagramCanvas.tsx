import React, { useState, useRef } from 'react';
import { UMLClass, UMLRelationship } from '../types/uml';
import {
  Plus,
  Link,
  Edit2,
  Trash2,
  ZoomIn,
  ZoomOut,
  Sparkles,
  Layers,
  ChevronDown,
  X,
} from 'lucide-react';
import { TEMPLATES } from '../utils/diagramTemplates';

interface DiagramCanvasProps {
  classes: UMLClass[];
  relationships: UMLRelationship[];
  selectedClassId: string | null;
  onSelectClass: (id: string | null) => void;
  onAddClass: () => void;
  onEditClass: (umlClass: UMLClass) => void;
  onDeleteClass: (id: string) => void;
  onUpdateClassPosition: (id: string, x: number, y: number) => void;
  onAddRelationship: (sourceId?: string) => void;
  onDeleteRelationship: (id: string) => void;
  onLoadTemplate: (templateId: string) => void;
  onClearCanvas: () => void;
}

export const DiagramCanvas: React.FC<DiagramCanvasProps> = ({
  classes,
  relationships,
  selectedClassId,
  onSelectClass,
  onAddClass,
  onEditClass,
  onDeleteClass,
  onUpdateClassPosition,
  onAddRelationship,
  onDeleteRelationship,
  onLoadTemplate,
  onClearCanvas,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Dragging state
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Zoom scale
  const [zoom, setZoom] = useState<number>(1);

  // Quick connecting mode
  const [connectingSourceId, setConnectingSourceId] = useState<string | null>(null);

  // Template dropdown open
  const [showTemplates, setShowTemplates] = useState(false);

  // Estimated height per class box (dynamic based on attrs & methods count)
  const getClassHeight = (cls: UMLClass) => {
    const base = 70; // Header and padding
    const attrHeight = Math.max(1, cls.attributes?.length || 0) * 22;
    const methodHeight = Math.max(1, cls.methods?.length || 0) * 22;
    return base + attrHeight + methodHeight + 20;
  };

  // Mouse Down on Class Box (Start Dragging)
  const handleMouseDown = (e: React.MouseEvent, cls: UMLClass) => {
    // If in connecting mode, click target class
    if (connectingSourceId) {
      e.stopPropagation();
      if (connectingSourceId !== cls.id) {
        onAddRelationship(connectingSourceId);
      }
      setConnectingSourceId(null);
      return;
    }

    e.stopPropagation();
    onSelectClass(cls.id);
    setDraggingId(cls.id);

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      // Account for zoom scale
      const mouseX = (e.clientX - rect.left) / zoom;
      const mouseY = (e.clientY - rect.top) / zoom;
      setDragOffset({
        x: mouseX - cls.x,
        y: mouseY - cls.y,
      });
    }
  };

  // Mouse Move on Canvas (Drag in progress)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggingId && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left) / zoom;
      const mouseY = (e.clientY - rect.top) / zoom;

      const newX = Math.max(20, Math.round(mouseX - dragOffset.x));
      const newY = Math.max(20, Math.round(mouseY - dragOffset.y));

      onUpdateClassPosition(draggingId, newX, newY);
    }
  };

  // Mouse Up (Stop Dragging)
  const handleMouseUp = () => {
    if (draggingId) {
      setDraggingId(null);
    }
  };

  // Canvas Click (Deselect)
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === containerRef.current) {
      onSelectClass(null);
      if (connectingSourceId) {
        setConnectingSourceId(null);
      }
    }
  };

  // Compute Anchor Points between Source and Target
  const getAnchorPoints = (src: UMLClass, tgt: UMLClass) => {
    const srcW = src.width || 210;
    const srcH = getClassHeight(src);
    const tgtW = tgt.width || 210;
    const tgtH = getClassHeight(tgt);

    const srcCenter = { x: src.x + srcW / 2, y: src.y + srcH / 2 };
    const tgtCenter = { x: tgt.x + tgtW / 2, y: tgt.y + tgtH / 2 };

    const srcAnchors = [
      { x: srcCenter.x, y: src.y }, // Top
      { x: srcCenter.x, y: src.y + srcH }, // Bottom
      { x: src.x, y: srcCenter.y }, // Left
      { x: src.x + srcW, y: srcCenter.y }, // Right
    ];

    const tgtAnchors = [
      { x: tgtCenter.x, y: tgt.y }, // Top
      { x: tgtCenter.x, y: tgt.y + tgtH }, // Bottom
      { x: tgt.x, y: tgtCenter.y }, // Left
      { x: tgt.x + tgtW, y: tgtCenter.y }, // Right
    ];

    let bestDist = Infinity;
    let bestSrc = srcAnchors[0];
    let bestTgt = tgtAnchors[0];

    for (const sa of srcAnchors) {
      for (const ta of tgtAnchors) {
        const d = Math.hypot(sa.x - ta.x, sa.y - ta.y);
        if (d < bestDist) {
          bestDist = d;
          bestSrc = sa;
          bestTgt = ta;
        }
      }
    }

    return { from: bestSrc, to: bestTgt };
  };

  return (
    <div className="flex flex-col h-full bg-[#141417] select-none overflow-hidden relative">
      {/* Top Floating Toolbar */}
      <div className="z-20 px-4 py-2.5 bg-[#1e1e24]/90 backdrop-blur-md border-b border-[#2e2e34] flex items-center justify-between gap-3 flex-wrap">
        {/* Left Toolbar Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onAddClass}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition-all"
          >
            <Plus size={15} /> Add Class
          </button>

          <button
            type="button"
            onClick={() => onAddRelationship()}
            disabled={classes.length < 2}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              classes.length >= 2
                ? 'bg-[#27272a] hover:bg-[#3f3f46] text-gray-200'
                : 'bg-[#27272a]/50 text-gray-500 cursor-not-allowed'
            }`}
            title={classes.length < 2 ? 'Need at least 2 classes to connect' : 'Add Relationship between classes'}
          >
            <Link size={14} /> Add Relationship
          </button>

          {/* Template Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowTemplates(!showTemplates)}
              className="px-3 py-1.5 rounded-lg bg-[#27272a] hover:bg-[#3f3f46] text-gray-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Sparkles size={14} className="text-amber-400" />
              Templates
              <ChevronDown size={12} />
            </button>

            {showTemplates && (
              <div className="absolute left-0 mt-1 w-64 bg-[#18181b] border border-[#2e2e34] rounded-xl shadow-2xl py-1 z-30">
                <div className="px-3 py-1.5 text-[10px] font-semibold text-gray-400 uppercase tracking-wider border-b border-[#27272a]">
                  Load Sample Diagram
                </div>
                {TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    type="button"
                    onClick={() => {
                      onLoadTemplate(tmpl.id);
                      setShowTemplates(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-white/5 transition-colors"
                  >
                    <div className="text-xs font-medium text-white">{tmpl.name}</div>
                    <div className="text-[11px] text-gray-400 line-clamp-1">
                      {tmpl.description}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Connecting Mode Banner */}
        {connectingSourceId && (
          <div className="px-3 py-1 bg-amber-500/20 border border-amber-500/40 rounded-full text-amber-300 text-xs flex items-center gap-2 animate-pulse">
            <span>Click any target class to connect from <strong>{classes.find((c) => c.id === connectingSourceId)?.name}</strong></span>
            <button
              onClick={() => setConnectingSourceId(null)}
              className="hover:text-white"
            >
              <X size={13} />
            </button>
          </div>
        )}

        {/* Right Toolbar Controls (Zoom & Info) */}
        <div className="flex items-center gap-2">
          {classes.length > 0 && (
            <button
              type="button"
              onClick={onClearCanvas}
              className="px-2.5 py-1.5 rounded-lg text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 transition-colors"
              title="Clear all classes and relationships"
            >
              Clear Canvas
            </button>
          )}

          <div className="flex items-center bg-[#18181b] rounded-lg border border-[#2e2e34] p-0.5 text-xs text-gray-300">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(0.5, Number((z - 0.1).toFixed(1))))}
              className="p-1 hover:text-white hover:bg-white/5 rounded"
              title="Zoom Out"
            >
              <ZoomOut size={14} />
            </button>
            <span className="px-2 text-[11px] font-mono select-none">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(1.8, Number((z + 0.1).toFixed(1))))}
              className="p-1 hover:text-white hover:bg-white/5 rounded"
              title="Zoom In"
            >
              <ZoomIn size={14} />
            </button>
            <button
              type="button"
              onClick={() => setZoom(1)}
              className="p-1 hover:text-white hover:bg-white/5 rounded text-[10px]"
              title="Reset Zoom"
            >
              100%
            </button>
          </div>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div
        ref={containerRef}
        onClick={handleCanvasClick}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="flex-1 w-full h-full relative overflow-auto cursor-default"
        style={{
          backgroundColor: '#111114',
          backgroundImage:
            'radial-gradient(#27272a 1px, transparent 1px), radial-gradient(#1e1e24 1px, #111114 1px)',
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 12px 12px',
        }}
      >
        {/* Scaled Transform Container */}
        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: '0 0',
            width: '3000px',
            height: '2400px',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          {/* SVG Layer for UML Relationship Lines */}
          <svg
            className="absolute inset-0 pointer-events-none w-full h-full"
            style={{ zIndex: 5 }}
          >
            <defs>
              {/* Hollow triangle for Inheritance & Realization */}
              <marker
                id="marker-triangle"
                viewBox="0 0 14 14"
                refX="13"
                refY="7"
                markerWidth="12"
                markerHeight="12"
                orient="auto-start-reverse"
              >
                <polygon points="1,1 13,7 1,13" fill="#18181b" stroke="#60a5fa" strokeWidth="1.5" />
              </marker>

              {/* Open Arrow for Association & Dependency */}
              <marker
                id="marker-arrow"
                viewBox="0 0 12 12"
                refX="11"
                refY="6"
                markerWidth="10"
                markerHeight="10"
                orient="auto-start-reverse"
              >
                <polyline points="2,1 11,6 2,11" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
              </marker>

              {/* Hollow Diamond for Aggregation */}
              <marker
                id="marker-diamond-hollow"
                viewBox="0 0 16 16"
                refX="1"
                refY="8"
                markerWidth="14"
                markerHeight="14"
                orient="auto-start-reverse"
              >
                <polygon points="1,8 8,2 15,8 8,14" fill="#18181b" stroke="#34d399" strokeWidth="1.5" />
              </marker>

              {/* Filled Diamond for Composition */}
              <marker
                id="marker-diamond-filled"
                viewBox="0 0 16 16"
                refX="1"
                refY="8"
                markerWidth="14"
                markerHeight="14"
                orient="auto-start-reverse"
              >
                <polygon points="1,8 8,2 15,8 8,14" fill="#f43f5e" stroke="#f43f5e" strokeWidth="1" />
              </marker>
            </defs>

            {/* Render Each Relationship Line */}
            {relationships.map((rel) => {
              const srcClass = classes.find((c) => c.id === rel.sourceId);
              const tgtClass = classes.find((c) => c.id === rel.targetId);
              if (!srcClass || !tgtClass) return null;

              const { from, to } = getAnchorPoints(srcClass, tgtClass);

              const isDashed = rel.type === 'realization' || rel.type === 'dependency';

              // Determine marker
              let markerEnd = '';
              let markerStart = '';
              let strokeColor = '#60a5fa'; // default blue

              if (rel.type === 'inheritance' || rel.type === 'realization') {
                markerEnd = 'url(#marker-triangle)';
                strokeColor = '#60a5fa';
              } else if (rel.type === 'association' || rel.type === 'dependency') {
                markerEnd = 'url(#marker-arrow)';
                strokeColor = '#a78bfa';
              } else if (rel.type === 'aggregation') {
                markerStart = 'url(#marker-diamond-hollow)';
                strokeColor = '#34d399';
              } else if (rel.type === 'composition') {
                markerStart = 'url(#marker-diamond-filled)';
                strokeColor = '#f43f5e';
              }

              // Midpoint for label
              const midX = (from.x + to.x) / 2;
              const midY = (from.y + to.y) / 2;

              return (
                <g key={rel.id} className="pointer-events-auto group">
                  {/* Visual Line */}
                  <line
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke={strokeColor}
                    strokeWidth={2}
                    strokeDasharray={isDashed ? '6,5' : 'none'}
                    markerEnd={markerEnd}
                    markerStart={markerStart}
                    className="transition-all"
                  />

                  {/* Multiplicity tags */}
                  {rel.sourceMultiplicity && (
                    <text
                      x={from.x + (to.x - from.x) * 0.15}
                      y={from.y + (to.y - from.y) * 0.15 - 8}
                      fill="#f59e0b"
                      fontSize="10"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      {rel.sourceMultiplicity}
                    </text>
                  )}

                  {rel.targetMultiplicity && (
                    <text
                      x={to.x - (to.x - from.x) * 0.15}
                      y={to.y - (to.y - from.y) * 0.15 - 8}
                      fill="#f59e0b"
                      fontSize="10"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      {rel.targetMultiplicity}
                    </text>
                  )}

                  {/* Relationship Label & Delete button */}
                  {rel.label && (
                    <g transform={`translate(${midX}, ${midY})`}>
                      <rect
                        x="-40"
                        y="-10"
                        width="80"
                        height="20"
                        rx="4"
                        fill="#18181b"
                        stroke="#3f3f46"
                        strokeWidth="1"
                      />
                      <text
                        x="0"
                        y="4"
                        fill="#e4e4e7"
                        fontSize="10"
                        fontFamily="sans-serif"
                        textAnchor="middle"
                      >
                        {rel.label}
                      </text>
                    </g>
                  )}

                  {/* Delete Button on Hover */}
                  <g
                    transform={`translate(${midX + (rel.label ? 45 : 0)}, ${midY - 10})`}
                    onClick={() => onDeleteRelationship(rel.id)}
                    className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <circle r="8" fill="#ef4444" />
                    <text x="0" y="3" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">
                      ✕
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>

          {/* Render Each UML Class Box */}
          {classes.map((cls) => {
            const isSelected = selectedClassId === cls.id;
            const isDragging = draggingId === cls.id;
            const accentColor = cls.color || '#3b82f6';
            const stereotype = cls.stereotype || 'class';

            return (
              <div
                key={cls.id}
                onMouseDown={(e) => handleMouseDown(e, cls)}
                onDoubleClick={() => onEditClass(cls)}
                style={{
                  left: `${cls.x}px`,
                  top: `${cls.y}px`,
                  width: `${cls.width || 210}px`,
                  zIndex: isSelected ? 15 : 10,
                }}
                className={`absolute rounded-xl bg-[#18181b] border-2 shadow-2xl transition-shadow cursor-grab active:cursor-grabbing select-none overflow-hidden ${
                  isSelected
                    ? 'border-blue-500 shadow-blue-500/20 ring-4 ring-blue-500/20'
                    : 'border-[#2e2e34] hover:border-[#3e3e46]'
                } ${isDragging ? 'opacity-90 scale-[1.02]' : ''}`}
              >
                {/* Header Banner */}
                <div
                  className="px-3 py-2 text-center border-b border-[#2e2e34]"
                  style={{
                    backgroundColor: `${accentColor}20`,
                    borderBottomColor: `${accentColor}50`,
                  }}
                >
                  {/* Stereotype Tag */}
                  {stereotype !== 'class' && (
                    <div className="text-[10px] uppercase tracking-wider text-gray-400 italic">
                      &lt;&lt;{stereotype}&gt;&gt;
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span
                      className="font-bold text-sm text-white truncate flex-1 font-mono"
                      title={cls.name}
                    >
                      {cls.name}
                    </span>

                    {/* Quick Box Actions */}
                    <div className="flex items-center gap-1 ml-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setConnectingSourceId(cls.id);
                        }}
                        className="text-gray-400 hover:text-amber-400 p-0.5 rounded transition-colors"
                        title="Connect relationship from this class"
                      >
                        <Link size={12} />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditClass(cls);
                        }}
                        className="text-gray-400 hover:text-blue-400 p-0.5 rounded transition-colors"
                        title="Edit class"
                      >
                        <Edit2 size={12} />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteClass(cls.id);
                        }}
                        className="text-gray-400 hover:text-rose-400 p-0.5 rounded transition-colors"
                        title="Delete class"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Attributes Compartment */}
                <div className="p-2.5 space-y-1 text-xs font-mono border-b border-[#2e2e34] bg-[#141417]/60 min-h-[36px]">
                  {cls.attributes.length === 0 ? (
                    <span className="text-[11px] text-gray-600 italic">No attributes</span>
                  ) : (
                    cls.attributes.map((attr, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 truncate">
                        {renderVisibilityIcon(attr)}
                        <span className="text-gray-300 truncate">{cleanMemberString(attr)}</span>
                      </div>
                    ))
                  )}
                </div>

                {/* Methods Compartment */}
                <div className="p-2.5 space-y-1 text-xs font-mono bg-[#141417]/30 min-h-[36px]">
                  {cls.methods.length === 0 ? (
                    <span className="text-[11px] text-gray-600 italic">No methods</span>
                  ) : (
                    cls.methods.map((method, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 truncate">
                        {renderVisibilityIcon(method)}
                        <span className="text-gray-400 truncate">{cleanMemberString(method)}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty Canvas Placeholder */}
        {classes.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-gray-400 pointer-events-none">
            <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mb-4 text-blue-400">
              <Layers size={32} />
            </div>
            <h3 className="text-base font-semibold text-white mb-1">
              Canvas is Ready
            </h3>
            <p className="text-xs text-gray-500 max-w-sm mb-4">
              Click <strong>+ Add Class</strong> above to start designing your architecture,
              or load a pre-built template from the dropdown.
            </p>
            <div className="pointer-events-auto flex items-center gap-2">
              <button
                type="button"
                onClick={onAddClass}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-lg shadow-blue-600/30 transition-all flex items-center gap-1.5"
              >
                <Plus size={15} /> Add First Class
              </button>
              <button
                type="button"
                onClick={() => onLoadTemplate('university')}
                className="px-4 py-2 bg-[#27272a] hover:bg-[#3f3f46] text-gray-200 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5"
              >
                <Sparkles size={14} className="text-amber-400" /> Load University Template
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Hint Footer */}
      <div className="px-4 py-1.5 bg-[#121215] border-t border-[#27272a] text-[11px] text-gray-500 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span>💡 <strong>Tip:</strong> Drag to move | Double-click to edit | Click 🔗 to draw relationship line</span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[10px]">
          <span>{classes.length} Classes</span>
          <span>•</span>
          <span>{relationships.length} Relationships</span>
        </div>
      </div>
    </div>
  );
};

// Helper: render visibility icon badge
function renderVisibilityIcon(member: string) {
  const trimmed = member.trim();
  if (trimmed.startsWith('+')) {
    return <span className="text-emerald-400 font-bold shrink-0">+</span>;
  }
  if (trimmed.startsWith('-')) {
    return <span className="text-rose-400 font-bold shrink-0">-</span>;
  }
  if (trimmed.startsWith('#')) {
    return <span className="text-amber-400 font-bold shrink-0">#</span>;
  }
  if (trimmed.startsWith('~')) {
    return <span className="text-blue-400 font-bold shrink-0">~</span>;
  }
  return <span className="text-gray-500 shrink-0">•</span>;
}

// Helper: clean member string for display
function cleanMemberString(member: string) {
  const trimmed = member.trim();
  if (/^[+\-#~]/.test(trimmed)) {
    return trimmed.substring(1).trim();
  }
  return trimmed;
}

export default DiagramCanvas;
