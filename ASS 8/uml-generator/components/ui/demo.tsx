import React, { useState } from 'react';
import { DraggableWidgetGrid, Widget } from './draggable-widget-grid';

export const DraggableWidgetDemo: React.FC = () => {
  const [widgets, setWidgets] = useState<Widget[]>([
    {
      id: '1',
      title: 'UML Class',
      content: (
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">Class Name</div>
          <input
            type="text"
            placeholder="Enter class name"
            className="w-full px-2 py-1 text-sm border border-input rounded bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      ),
    },
    {
      id: '2',
      title: 'Properties',
      content: (
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">Class Properties</div>
          <textarea
            placeholder="Add properties..."
            rows={4}
            className="w-full px-2 py-1 text-sm border border-input rounded bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
        </div>
      ),
    },
    {
      id: '3',
      title: 'Methods',
      content: (
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">Class Methods</div>
          <textarea
            placeholder="Add methods..."
            rows={4}
            className="w-full px-2 py-1 text-sm border border-input rounded bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
        </div>
      ),
    },
    {
      id: '4',
      title: 'Statistics',
      content: (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Classes</span>
            <span className="text-lg font-bold text-foreground">12</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Relationships</span>
            <span className="text-lg font-bold text-foreground">8</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Methods</span>
            <span className="text-lg font-bold text-foreground">45</span>
          </div>
        </div>
      ),
    },
    {
      id: '5',
      title: 'Exports',
      content: (
        <div className="space-y-2">
          <button className="w-full px-3 py-2 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
            Export as Java
          </button>
          <button className="w-full px-3 py-2 text-sm bg-secondary text-secondary-foreground rounded hover:bg-secondary/90 transition-colors">
            Export as PNG
          </button>
        </div>
      ),
    },
    {
      id: '6',
      title: 'Recent Changes',
      content: (
        <div className="space-y-2 text-sm">
          <div className="text-xs text-muted-foreground">12:34 PM - Added new class</div>
          <div className="text-xs text-muted-foreground">12:30 PM - Updated method signature</div>
          <div className="text-xs text-muted-foreground">12:25 PM - Added relationship</div>
        </div>
      ),
    },
  ]);

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-2">UML Diagram Editor</h1>
        <p className="text-muted-foreground mb-8">
          Drag and drop widgets to reorder them. Click the X button to remove widgets.
        </p>

        <DraggableWidgetGrid
          widgets={widgets}
          onWidgetsChange={setWidgets}
          columns={3}
          gap={4}
          className="animate-in fade-in duration-500"
        />

        {/* Widget Count */}
        <div className="mt-8 p-4 bg-muted rounded-lg border border-border">
          <p className="text-sm text-muted-foreground">
            Active Widgets: <span className="font-semibold text-foreground">{widgets.length}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DraggableWidgetDemo;
