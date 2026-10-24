'use client';

import React, { useId } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export interface SortableItemRenderProps {
  /** Props to spread on the drag handle element (e.g. Grip button) */
  dragHandleProps: Record<string, any>;
  /** Whether this item is actively being dragged */
  isDragging: boolean;
  /** Ref to attach to the container element */
  setNodeRef: (element: HTMLElement | null) => void;
  /** CSS styles (transforms and transitions) for smooth sorting animation */
  style: React.CSSProperties;
}

type SortableItem = { id: string } | string;

interface SortableListProps<T extends SortableItem> {
  items: T[];
  onReorder: (items: T[]) => void;
  renderItem: (item: T, index: number, renderProps: SortableItemRenderProps) => React.ReactNode;
  className?: string;
  id?: string;
}

function getItemId(item: SortableItem): string {
  return typeof item === 'string' ? item : item.id;
}

function SortableItemWrapper<T extends SortableItem>({
  item,
  index,
  renderItem,
}: {
  item: T;
  index: number;
  renderItem: (item: T, index: number, renderProps: SortableItemRenderProps) => React.ReactNode;
}) {
  const itemId = getItemId(item);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: itemId });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
    opacity: isDragging ? 0.75 : 1,
    position: 'relative',
  };

  const dragHandleProps = {
    ...attributes,
    ...listeners,
    style: { touchAction: 'none' },
  };

  return (
    <>
      {renderItem(item, index, {
        dragHandleProps,
        isDragging,
        setNodeRef,
        style,
      })}
    </>
  );
}

export function SortableList<T extends SortableItem>({
  items,
  onReorder,
  renderItem,
  className = 'space-y-4',
  id,
}: SortableListProps<T>) {
  const generatedId = useId();
  const contextId = id || generatedId;

  // Configure pointer sensor with a 4px activation distance so normal clicks/taps are never intercepted
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 4,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((it) => getItemId(it) === active.id);
      const newIndex = items.findIndex((it) => getItemId(it) === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        onReorder(arrayMove(items, oldIndex, newIndex));
      }
    }
  };

  return (
    <DndContext
      id={contextId}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items.map(getItemId)} strategy={verticalListSortingStrategy}>
        <div className={className}>
          {items.map((item, index) => (
            <SortableItemWrapper
              key={getItemId(item)}
              item={item}
              index={index}
              renderItem={renderItem}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
