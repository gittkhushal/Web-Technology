import React from 'react';
import { X, ExternalLink, BookOpen, Layers, Sparkles, CheckCircle2 } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-[#18181b] border border-[#27272a] rounded-xl shadow-2xl w-full max-w-2xl text-white overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#27272a] bg-[#1e1e24]">
          <div className="flex items-center gap-2">
            <Sparkles className="text-blue-400" size={20} />
            <h2 className="text-lg font-semibold text-white">
              About UML Diagram Generator
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto text-sm text-gray-300">
          <div>
            <h3 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
              <BookOpen size={18} className="text-indigo-400" /> Web Technology - ASS 8
            </h3>
            <p className="leading-relaxed text-gray-400 text-xs sm:text-sm">
              An interactive, visual UML Class Diagram generator built with React 18, TypeScript, and Tailwind CSS.
              It allows developers and architects to design object-oriented class architectures, connect them with UML relationships,
              and automatically generate production-ready Java source code and PlantUML / Mermaid diagrams.
            </p>
          </div>

          {/* Key Features */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Key Features
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-start gap-2 bg-[#1f1f23] p-2.5 rounded-lg border border-[#2e2e34]">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Visual drag-and-drop UML canvas with real-time SVG lines</span>
              </div>
              <div className="flex items-start gap-2 bg-[#1f1f23] p-2.5 rounded-lg border border-[#2e2e34]">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Full Java code generation (Constructors, Getters/Setters, toString)</span>
              </div>
              <div className="flex items-start gap-2 bg-[#1f1f23] p-2.5 rounded-lg border border-[#2e2e34]">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>UML 2.0 relationships: Inheritance, Realization, Association, Composition</span>
              </div>
              <div className="flex items-start gap-2 bg-[#1f1f23] p-2.5 rounded-lg border border-[#2e2e34]">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Creately Integration: Export & Import JSON diagrams effortlessly</span>
              </div>
              <div className="flex items-start gap-2 bg-[#1f1f23] p-2.5 rounded-lg border border-[#2e2e34]">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Pre-built Templates (University, E-Commerce, Hospital)</span>
              </div>
              <div className="flex items-start gap-2 bg-[#1f1f23] p-2.5 rounded-lg border border-[#2e2e34]">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Draggable observability metrics dashboard with live statistics</span>
              </div>
            </div>
          </div>

          {/* UML Quick Notation Guide */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              UML Visibility Symbols
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
              <div className="bg-[#1f1f23] p-2 rounded border border-[#2e2e34] text-center">
                <span className="text-emerald-400 font-bold text-sm">+</span> public
              </div>
              <div className="bg-[#1f1f23] p-2 rounded border border-[#2e2e34] text-center">
                <span className="text-rose-400 font-bold text-sm">-</span> private
              </div>
              <div className="bg-[#1f1f23] p-2 rounded border border-[#2e2e34] text-center">
                <span className="text-amber-400 font-bold text-sm">#</span> protected
              </div>
              <div className="bg-[#1f1f23] p-2 rounded border border-[#2e2e34] text-center">
                <span className="text-blue-400 font-bold text-sm">~</span> package
              </div>
            </div>
          </div>

          {/* Creately Workflow */}
          <div className="p-4 bg-gradient-to-r from-blue-950/40 to-indigo-950/40 border border-blue-900/50 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white text-xs flex items-center gap-1.5">
                <Layers size={15} className="text-blue-400" /> Creately Integration Workflow
              </span>
              <a
                href="https://creately.com"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                creately.com <ExternalLink size={12} />
              </a>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Export your designed UML diagram as a standardized JSON file, and import it into Creately or share it with teammates.
              You can also upload any valid JSON diagram file into this tool to resume editing.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-4 border-t border-[#27272a] bg-[#1e1e24]">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
