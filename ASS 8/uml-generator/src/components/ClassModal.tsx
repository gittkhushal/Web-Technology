import React, { useState, useEffect } from 'react';
import { UMLClass, ClassStereotype } from '../types/uml';
import { X, Plus, Trash2, Check } from 'lucide-react';

interface ClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (umlClass: UMLClass) => void;
  initialClass?: UMLClass | null;
  classesCount: number;
}

const COMMON_TYPES = [
  'String',
  'int',
  'double',
  'boolean',
  'long',
  'float',
  'char',
  'Date',
  'List<String>',
  'void',
];

const PRESET_COLORS = [
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Emerald', value: '#10b981' },
  { name: 'Amber', value: '#f59e0b' },
  { name: 'Rose', value: '#f43f5e' },
  { name: 'Purple', value: '#a855f7' },
  { name: 'Slate', value: '#64748b' },
];

export const ClassModal: React.FC<ClassModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialClass,
  classesCount,
}) => {
  const [name, setName] = useState('');
  const [stereotype, setStereotype] = useState<ClassStereotype>('class');
  const [color, setColor] = useState('#3b82f6');
  const [activeTab, setActiveTab] = useState<'structured' | 'bulk'>('structured');

  // Structured form state
  const [attributes, setAttributes] = useState<string[]>([]);
  const [methods, setMethods] = useState<string[]>([]);

  // Bulk text state
  const [bulkAttributes, setBulkAttributes] = useState('');
  const [bulkMethods, setBulkMethods] = useState('');

  // Input for adding single item
  const [newAttrVis, setNewAttrVis] = useState('-');
  const [newAttrName, setNewAttrName] = useState('');
  const [newAttrType, setNewAttrType] = useState('String');

  const [newMethodVis, setNewMethodVis] = useState('+');
  const [newMethodName, setNewMethodName] = useState('');
  const [newMethodParams, setNewMethodParams] = useState('');
  const [newMethodReturn, setNewMethodReturn] = useState('void');

  useEffect(() => {
    if (initialClass) {
      setName(initialClass.name);
      setStereotype(initialClass.stereotype || 'class');
      setColor(initialClass.color || '#3b82f6');
      setAttributes(initialClass.attributes || []);
      setMethods(initialClass.methods || []);
      setBulkAttributes((initialClass.attributes || []).join('\n'));
      setBulkMethods((initialClass.methods || []).join('\n'));
    } else {
      setName(`Class${classesCount + 1}`);
      setStereotype('class');
      setColor('#3b82f6');
      setAttributes(['- id: int', '- name: String']);
      setMethods(['+ getId(): int', '+ getName(): String']);
      setBulkAttributes('- id: int\n- name: String');
      setBulkMethods('+ getId(): int\n+ getName(): String');
    }
  }, [initialClass, classesCount, isOpen]);

  if (!isOpen) return null;

  const handleAddAttribute = () => {
    if (!newAttrName.trim()) return;
    const cleanName = newAttrName.trim();
    const item = `${newAttrVis} ${cleanName}: ${newAttrType}`;
    const next = [...attributes, item];
    setAttributes(next);
    setBulkAttributes(next.join('\n'));
    setNewAttrName('');
  };

  const handleRemoveAttribute = (index: number) => {
    const next = attributes.filter((_, i) => i !== index);
    setAttributes(next);
    setBulkAttributes(next.join('\n'));
  };

  const handleAddMethod = () => {
    if (!newMethodName.trim()) return;
    const cleanName = newMethodName.trim();
    const params = newMethodParams.trim();
    const item = `${newMethodVis} ${cleanName}(${params}): ${newMethodReturn}`;
    const next = [...methods, item];
    setMethods(next);
    setBulkMethods(next.join('\n'));
    setNewMethodName('');
    setNewMethodParams('');
  };

  const handleRemoveMethod = (index: number) => {
    const next = methods.filter((_, i) => i !== index);
    setMethods(next);
    setBulkMethods(next.join('\n'));
  };

  const handleSave = () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      alert('Please enter a class name.');
      return;
    }

    let finalAttrs: string[] = [];
    let finalMethods: string[] = [];

    if (activeTab === 'bulk') {
      finalAttrs = bulkAttributes
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);
      finalMethods = bulkMethods
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);
    } else {
      finalAttrs = attributes;
      finalMethods = methods;
    }

    const savedClass: UMLClass = {
      id: initialClass?.id || `class-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name: trimmedName,
      stereotype,
      color,
      attributes: finalAttrs,
      methods: finalMethods,
      x: initialClass?.x ?? 150 + (classesCount % 4) * 80,
      y: initialClass?.y ?? 120 + (classesCount % 3) * 60,
      width: initialClass?.width || 210,
    };

    onSave(savedClass);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-[#18181b] border border-[#27272a] rounded-xl shadow-2xl w-full max-w-2xl text-white overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#27272a] bg-[#1e1e24]">
          <div className="flex items-center gap-3">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: color }}
            />
            <h2 className="text-lg font-semibold text-white">
              {initialClass ? 'Edit UML Class' : 'Create New UML Class'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* Class Name & Stereotype Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Class Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Student, Order, Payment"
                className="w-full px-3 py-2 bg-[#27272a] border border-[#3f3f46] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Stereotype / Type
              </label>
              <select
                value={stereotype}
                onChange={(e) => setStereotype(e.target.value as ClassStereotype)}
                className="w-full px-3 py-2 bg-[#27272a] border border-[#3f3f46] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value="class">Standard Class</option>
                <option value="abstract">&lt;&lt;abstract&gt;&gt; Class</option>
                <option value="interface">&lt;&lt;interface&gt;&gt;</option>
                <option value="enum">&lt;&lt;enum&gt;&gt;</option>
              </select>
            </div>
          </div>

          {/* Color Tag Picker */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">
              Accent Color
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {PRESET_COLORS.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setColor(c.value)}
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform ${
                    color === c.value ? 'scale-110 ring-2 ring-white' : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c.value }}
                  title={c.name}
                >
                  {color === c.value && <Check size={14} className="text-white drop-shadow" />}
                </button>
              ))}
            </div>
          </div>

          {/* Edit Mode Tabs */}
          <div className="border-b border-[#27272a] flex gap-4 text-xs font-medium">
            <button
              type="button"
              onClick={() => {
                // sync bulk to structured if switching
                if (activeTab === 'bulk') {
                  setAttributes(bulkAttributes.split('\n').filter((s) => s.trim()));
                  setMethods(bulkMethods.split('\n').filter((s) => s.trim()));
                }
                setActiveTab('structured');
              }}
              className={`pb-2 border-b-2 transition-colors ${
                activeTab === 'structured'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              🛠️ Interactive Builder
            </button>
            <button
              type="button"
              onClick={() => {
                setBulkAttributes(attributes.join('\n'));
                setBulkMethods(methods.join('\n'));
                setActiveTab('bulk');
              }}
              className={`pb-2 border-b-2 transition-colors ${
                activeTab === 'bulk'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              📝 Bulk Text Editor
            </button>
          </div>

          {activeTab === 'structured' ? (
            <div className="space-y-6">
              {/* Attributes Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Attributes ({attributes.length})
                  </span>
                  <span className="text-[11px] text-gray-500">
                    + public | - private | # protected | ~ package
                  </span>
                </div>

                {/* Add Attribute Row */}
                <div className="flex gap-2 items-center flex-wrap sm:flex-nowrap">
                  <select
                    value={newAttrVis}
                    onChange={(e) => setNewAttrVis(e.target.value)}
                    className="w-16 px-2 py-1.5 bg-[#27272a] border border-[#3f3f46] rounded text-xs font-mono text-white"
                  >
                    <option value="-">- (private)</option>
                    <option value="+">+ (public)</option>
                    <option value="#"># (protected)</option>
                    <option value="~">~ (package)</option>
                  </select>

                  <input
                    type="text"
                    value={newAttrName}
                    onChange={(e) => setNewAttrName(e.target.value)}
                    placeholder="attributeName"
                    onKeyDown={(e) => e.key === 'Enter' && handleAddAttribute()}
                    className="flex-1 px-3 py-1.5 bg-[#27272a] border border-[#3f3f46] rounded text-xs text-white font-mono"
                  />

                  <select
                    value={newAttrType}
                    onChange={(e) => setNewAttrType(e.target.value)}
                    className="w-32 px-2 py-1.5 bg-[#27272a] border border-[#3f3f46] rounded text-xs font-mono text-white"
                  >
                    {COMMON_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={handleAddAttribute}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Plus size={14} /> Add
                  </button>
                </div>

                {/* Attributes List */}
                <div className="max-h-36 overflow-y-auto space-y-1.5 bg-[#121214] p-2.5 rounded-lg border border-[#27272a]">
                  {attributes.length === 0 ? (
                    <div className="text-xs text-gray-500 italic py-1 text-center">
                      No attributes defined yet.
                    </div>
                  ) : (
                    attributes.map((attr, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-xs font-mono bg-[#1c1c20] px-3 py-1.5 rounded border border-[#2e2e34]"
                      >
                        <span className="text-gray-200">{attr}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveAttribute(idx)}
                          className="text-gray-500 hover:text-rose-400 p-0.5"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Methods Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Methods ({methods.length})
                  </span>
                  <span className="text-[11px] text-gray-500">
                    methodName(param: type): returnType
                  </span>
                </div>

                {/* Add Method Row */}
                <div className="flex gap-2 items-center flex-wrap sm:flex-nowrap">
                  <select
                    value={newMethodVis}
                    onChange={(e) => setNewMethodVis(e.target.value)}
                    className="w-16 px-2 py-1.5 bg-[#27272a] border border-[#3f3f46] rounded text-xs font-mono text-white"
                  >
                    <option value="+">+ (public)</option>
                    <option value="-">- (private)</option>
                    <option value="#"># (protected)</option>
                    <option value="~">~ (package)</option>
                  </select>

                  <input
                    type="text"
                    value={newMethodName}
                    onChange={(e) => setNewMethodName(e.target.value)}
                    placeholder="methodName"
                    className="flex-1 min-w-[100px] px-3 py-1.5 bg-[#27272a] border border-[#3f3f46] rounded text-xs text-white font-mono"
                  />

                  <input
                    type="text"
                    value={newMethodParams}
                    onChange={(e) => setNewMethodParams(e.target.value)}
                    placeholder="params (e.g. id: int)"
                    className="w-36 px-2 py-1.5 bg-[#27272a] border border-[#3f3f46] rounded text-xs text-white font-mono"
                  />

                  <select
                    value={newMethodReturn}
                    onChange={(e) => setNewMethodReturn(e.target.value)}
                    className="w-24 px-2 py-1.5 bg-[#27272a] border border-[#3f3f46] rounded text-xs font-mono text-white"
                  >
                    {COMMON_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={handleAddMethod}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Plus size={14} /> Add
                  </button>
                </div>

                {/* Methods List */}
                <div className="max-h-36 overflow-y-auto space-y-1.5 bg-[#121214] p-2.5 rounded-lg border border-[#27272a]">
                  {methods.length === 0 ? (
                    <div className="text-xs text-gray-500 italic py-1 text-center">
                      No methods defined yet.
                    </div>
                  ) : (
                    methods.map((method, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-xs font-mono bg-[#1c1c20] px-3 py-1.5 rounded border border-[#2e2e34]"
                      >
                        <span className="text-gray-200">{method}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveMethod(idx)}
                          className="text-gray-500 hover:text-rose-400 p-0.5"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">
                  Attributes (one per line, e.g. <span className="font-mono text-blue-400">- name: String</span>)
                </label>
                <textarea
                  value={bulkAttributes}
                  onChange={(e) => setBulkAttributes(e.target.value)}
                  rows={4}
                  placeholder="- id: int&#10;- name: String&#10;- email: String"
                  className="w-full px-3 py-2 bg-[#27272a] border border-[#3f3f46] rounded-lg text-white font-mono text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">
                  Methods (one per line, e.g. <span className="font-mono text-blue-400">+ getName(): String</span>)
                </label>
                <textarea
                  value={bulkMethods}
                  onChange={(e) => setBulkMethods(e.target.value)}
                  rows={4}
                  placeholder="+ getId(): int&#10;+ getName(): String&#10;+ displayInfo(): void"
                  className="w-full px-3 py-2 bg-[#27272a] border border-[#3f3f46] rounded-lg text-white font-mono text-xs focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#27272a] bg-[#1e1e24]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#27272a] hover:bg-[#3f3f46] text-gray-300 hover:text-white text-xs font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 transition-all flex items-center gap-1.5"
          >
            <Check size={15} />
            {initialClass ? 'Save Changes' : 'Create Class'}
          </button>
        </div>
      </div>
    </div>
  );
};
