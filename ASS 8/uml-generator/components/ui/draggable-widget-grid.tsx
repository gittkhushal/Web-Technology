import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { GripVertical, X } from 'lucide-react';

export interface Widget {
  id: string;
  title: string;
  content: React.ReactNode;
  isDragging?: boolean;
}

export interface DraggableWidgetGridProps {
  widgets: Widget[];
  onWidgetsChange?: (widgets: Widget[]) => void;
  onRemoveWidget?: (id: string) => void;
  columns?: number;
  gap?: number;
  className?: string;
}

export const DraggableWidgetGrid: React.FC<DraggableWidgetGridProps> = ({
  widgets,
  onWidgetsChange,
  onRemoveWidget,
  columns = 3,
  gap = 4,
  className = '',
}) => {
  const [items, setItems] = useState(widgets);

  const handleReorder = useCallback(
    (newItems: Widget[]) => {
      setItems(newItems);
      onWidgetsChange?.(newItems);
    },
    [onWidgetsChange]
  );

  const handleRemove = useCallback(
    (id: string) => {
      const newItems = items.filter((item) => item.id !== id);
      setItems(newItems);
      onWidgetsChange?.(newItems);
      onRemoveWidget?.(id);
    },
    [items, onWidgetsChange, onRemoveWidget]
  );

  const gridColsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
  }[columns] || 'grid-cols-3';

  const gapClass = {
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
  }[gap] || 'gap-4';

  return (
    <Reorder.Group
      axis="y"
      values={items}
      onReorder={handleReorder}
      className={`grid ${gridColsClass} ${gapClass} ${className}`}
    >
      <AnimatePresence mode="popLayout">
        {items.map((widget) => (
          <Reorder.Item
            key={widget.id}
            value={widget}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            whileHover={{ scale: 1.02 }}
            whileDrag={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' }}
            className="cursor-grab active:cursor-grabbing"
          >
            <motion.div
              className="relative bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              layout
            >
              {/* Drag Handle Header */}
              <div className="flex items-center justify-between bg-muted/50 px-4 py-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab active:cursor-grabbing" />
                  <h3 className="text-sm font-semibold text-foreground">{widget.title}</h3>
                </div>
                <button
                  onClick={() => handleRemove(widget.id)}
                  className="p-1 hover:bg-destructive/10 rounded transition-colors"
                  aria-label="Remove widget"
                >
                  <X className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                </button>
              </div>

              {/* Widget Content */}
              <div className="p-4 text-card-foreground">
                {widget.content}
              </div>
            </motion.div>
          </Reorder.Item>
        ))}
      </AnimatePresence>
    </Reorder.Group>
  );
};

export default DraggableWidgetGrid;
