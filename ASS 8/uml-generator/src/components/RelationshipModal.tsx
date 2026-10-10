import React, { useState, useEffect } from 'react';
import { UMLClass, UMLRelationship, RelationshipType } from '../types/uml';
import { X, Check } from 'lucide-react';

interface RelationshipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (rel: UMLRelationship) => void;
  classes: UMLClass[];
  initialRelationship?: UMLRelationship | null;
  defaultSourceId?: string | null;
}

const RELATIONSHIP_TYPES: {
  type: RelationshipType;
  label: string;
  symbol: string;
  description: string;
}[] = [
  {
    type: 'inheritance',
    label: 'Inheritance / Generalization',
    symbol: '——▷',
    description: 'Subclass inherits from superclass (Java "extends")',
  },
  {
    type: 'realization',
    label: 'Realization / Interface',
    symbol: '- - ▷',
    description: 'Class implements an interface (Java "implements")',
  },
  {
    type: 'association',
    label: 'Association',
    symbol: '——>',
    description: 'Structural relationship where one class references another',
  },
  {
    type: 'aggregation',
    label: 'Aggregation (Has-A)',
    symbol: '◇——',
    description: 'Weak ownership ("has-a"): child can exist independently',
  },
  {
    type: 'composition',
    label: 'Composition (Part-Of)',
    symbol: '◆——',
    description: 'Strong ownership ("part-of"): child lifetime belongs to parent',
  },
  {
    type: 'dependency',
    label: 'Dependency (Uses)',
    symbol: '- - >',
    description: 'Class temporarily uses another class in method signatures',
  },
];

const MULTIPLICITY_OPTIONS = ['', '1', '0..1', '*', '1..*'];

export const RelationshipModal: React.FC<RelationshipModalProps> = ({
  isOpen,
  onClose,
  onSave,
  classes,
  initialRelationship,
  defaultSourceId,
}) => {
  const [sourceId, setSourceId] = useState('');
  const [targetId, setTargetId] = useState('');
  const [type, setType] = useState<RelationshipType>('association');
  const [label, setLabel] = useState('');
  const [sourceMultiplicity, setSourceMultiplicity] = useState('');
  const [targetMultiplicity, setTargetMultiplicity] = useState('');

  useEffect(() => {
    if (initialRelationship) {
      setSourceId(initialRelationship.sourceId);
      setTargetId(initialRelationship.targetId);
      setType(initialRelationship.type);
      setLabel(initialRelationship.label || '');
      setSourceMultiplicity(initialRelationship.sourceMultiplicity || '');
      setTargetMultiplicity(initialRelationship.targetMultiplicity || '');
    } else {
      const src = defaultSourceId || (classes[0] ? classes[0].id : '');
      const tgt = classes[1] ? classes[1].id : classes[0] ? classes[0].id : '';
      setSourceId(src);
      setTargetId(tgt);
      setType('association');
      setLabel('');
      setSourceMultiplicity('1');
      setTargetMultiplicity('*');
    }
  }, [initialRelationship, defaultSourceId, classes, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!sourceId || !targetId) {
      alert('Please select both a source and target class.');
      return;
    }
    if (sourceId === targetId && type === 'inheritance') {
      alert('A class cannot inherit from itself.');
      return;
    }

    const savedRel: UMLRelationship = {
      id: initialRelationship?.id || `rel-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      sourceId,
      targetId,
      type,
      label: label.trim() || undefined,
      sourceMultiplicity: sourceMultiplicity || undefined,
      targetMultiplicity: targetMultiplicity || undefined,
    };

    onSave(savedRel);
    onClose();
  };

  const sourceName = classes.find((c) => c.id === sourceId)?.name || 'Source';
  const targetName = classes.find((c) => c.id === targetId)?.name || 'Target';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-[#18181b] border border-[#27272a] rounded-xl shadow-2xl w-full max-w-lg text-white overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#27272a] bg-[#1e1e24]">
          <h2 className="text-lg font-semibold text-white">
            {initialRelationship ? 'Edit UML Relationship' : 'Add UML Relationship'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Class Selectors */}
          <div className="grid grid-cols-2 gap-3 items-center">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Source Class
              </label>
              <select
                value={sourceId}
                onChange={(e) => setSourceId(e.target.value)}
                className="w-full px-3 py-2 bg-[#27272a] border border-[#3f3f46] rounded-lg text-white text-xs focus:outline-none focus:border-blue-500 font-mono"
              >
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Target Class
              </label>
              <select
                value={targetId}
                onChange={(e) => setTargetId(e.target.value)}
                className="w-full px-3 py-2 bg-[#27272a] border border-[#3f3f46] rounded-lg text-white text-xs focus:outline-none focus:border-blue-500 font-mono"
              >
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Relationship Type Selection */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-2">
              Relationship Type
            </label>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {RELATIONSHIP_TYPES.map((rt) => (
                <div
                  key={rt.type}
                  onClick={() => setType(rt.type)}
                  className={`p-2.5 rounded-lg border cursor-pointer transition-all flex items-center justify-between text-xs ${
                    type === rt.type
                      ? 'border-blue-500 bg-blue-950/30 text-blue-200'
                      : 'border-[#27272a] bg-[#1a1a1e] text-gray-300 hover:bg-[#25252b]'
                  }`}
                >
                  <div>
                    <div className="font-semibold flex items-center gap-2">
                      <span>{rt.label}</span>
                      <span className="font-mono text-gray-400 text-xs">({rt.symbol})</span>
                    </div>
                    <div className="text-[11px] text-gray-400 mt-0.5">{rt.description}</div>
                  </div>
                  {type === rt.type && <Check size={16} className="text-blue-400 shrink-0 ml-2" />}
                </div>
              ))}
            </div>
          </div>

          {/* Multiplicity & Label */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Source Mult.
              </label>
              <select
                value={sourceMultiplicity}
                onChange={(e) => setSourceMultiplicity(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-[#27272a] border border-[#3f3f46] rounded-lg text-white text-xs font-mono"
              >
                {MULTIPLICITY_OPTIONS.map((m) => (
                  <option key={m} value={m}>
                    {m ? m : '(None)'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Label / Role
              </label>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="e.g. contains, teaches"
                className="w-full px-2.5 py-1.5 bg-[#27272a] border border-[#3f3f46] rounded-lg text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Target Mult.
              </label>
              <select
                value={targetMultiplicity}
                onChange={(e) => setTargetMultiplicity(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-[#27272a] border border-[#3f3f46] rounded-lg text-white text-xs font-mono"
              >
                {MULTIPLICITY_OPTIONS.map((m) => (
                  <option key={m} value={m}>
                    {m ? m : '(None)'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Dynamic Preview */}
          <div className="p-3 bg-[#121214] border border-[#27272a] rounded-lg text-center font-mono text-xs text-gray-300 flex items-center justify-center gap-2">
            <span className="text-blue-400 font-semibold">{sourceName}</span>
            {sourceMultiplicity && <span className="text-amber-400 text-[11px]">[{sourceMultiplicity}]</span>}
            <span className="text-gray-500 font-bold">
              {type === 'inheritance' && ' ——▷ '}
              {type === 'realization' && ' - - ▷ '}
              {type === 'composition' && ' ◆—— '}
              {type === 'aggregation' && ' ◇—— '}
              {type === 'association' && ' ——> '}
              {type === 'dependency' && ' - - > '}
            </span>
            {label && <span className="text-purple-400 text-[11px]">"{label}"</span>}
            {targetMultiplicity && <span className="text-amber-400 text-[11px]">[{targetMultiplicity}]</span>}
            <span className="text-emerald-400 font-semibold">{targetName}</span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#27272a] bg-[#1e1e24]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#27272a] hover:bg-[#3f3f46] text-gray-300 text-xs font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 transition-all flex items-center gap-1.5"
          >
            <Check size={15} />
            {initialRelationship ? 'Update Relationship' : 'Create Relationship'}
          </button>
        </div>
      </div>
    </div>
  );
};
