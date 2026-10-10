import React from 'react';
import {
  Layers,
  Code2,
  BarChart3,
  HelpCircle,
} from 'lucide-react';

interface NavbarProps {
  classCount: number;
  relationshipCount: number;
  activeTab: 'canvas' | 'dashboard';
  setActiveTab: (tab: 'canvas' | 'dashboard') => void;
  showCode: boolean;
  onToggleCode: () => void;
  onOpenAbout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  classCount,
  relationshipCount,
  activeTab,
  setActiveTab,
  showCode,
  onToggleCode,
  onOpenAbout,
}) => {
  return (
    <nav className="bg-[#18181b] border-b border-[#27272a] text-white px-4 py-2.5 flex items-center justify-between gap-4 flex-wrap z-30 shadow-lg">
      {/* Brand & Stats */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/20">
          <Layers size={20} className="text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-white tracking-tight">
              UML Diagram Generator
            </h1>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              React + Java
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>{classCount} {classCount === 1 ? 'Class' : 'Classes'}</span>
            <span>•</span>
            <span>{relationshipCount} {relationshipCount === 1 ? 'Relationship' : 'Relationships'}</span>
          </div>
        </div>
      </div>

      {/* Main Mode Tabs */}
      <div className="flex items-center bg-[#121215] p-1 rounded-xl border border-[#27272a]">
        <button
          type="button"
          onClick={() => setActiveTab('canvas')}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'canvas'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Layers size={14} /> UML Canvas
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('dashboard')}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'dashboard'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <BarChart3 size={14} /> Analytics Dashboard
        </button>
      </div>

      {/* Right Action Tools */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onToggleCode}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
            showCode
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 ring-2 ring-indigo-400/30'
              : 'bg-[#27272a] hover:bg-[#3f3f46] text-gray-200'
          }`}
        >
          <Code2 size={15} />
          <span>{showCode ? 'Hide Java Code' : 'Generate Java Code'}</span>
        </button>

        <button
          type="button"
          onClick={onOpenAbout}
          className="p-2 rounded-lg bg-[#27272a] hover:bg-[#3f3f46] text-gray-400 hover:text-white transition-colors"
          title="About & UML Guide"
        >
          <HelpCircle size={16} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
