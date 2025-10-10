import React, { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';

import styles from '../Styles';
import { Item } from './Item';
import { DragOverlayItem } from './OverlayItem';
import { generateRandomHexCode } from '../utilities/patternBuilderUtils';
import { Box, Slider, Typography } from '@mui/material';
import { ItemEditorComponent } from './ItemEditorComponent';

const initialItems: string[] = [...Array(30).keys()].map(() =>
  generateRandomHexCode()
);

export function PatternBuilderComponent() {
  const [items, setItems] = useState<string[]>(initialItems);

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [columnCount, setColumnCount] = useState(32);

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;

    if (!over) {
      return;
    }

    // Ensure ids are strings for arrayMove
    setItems((items) =>
      arrayMove(
        items,
        items.indexOf(String(active.id)),
        items.indexOf(String(over.id))
      )
    );
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    setActiveId(null);
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography>Beats / Row</Typography>
        <Slider
          aria-label="Temperature"
          defaultValue={32}
          valueLabelDisplay="auto"
          shiftStep={8}
          step={4}
          marks={[
            { value: 8, label: '8' },
            { value: 16, label: '16' },
            { value: 24, label: '24' },
            { value: 32, label: '32' },
            { value: 40, label: '40' },
            { value: 48, label: '48' },
            { value: 56, label: '56' },
            { value: 64, label: '64' },
          ]}
          min={8}
          max={64}
          onChange={(event: Event, value: number) => {
            setColumnCount(Number(value));
          }}
        />
        <ItemEditorComponent />
      </Box>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={() => null}>
          <div
            style={{
              ...styles.grid,
              gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
            }}
          >
            {items.map((id) => (
              <Item key={id} id={id} activeId={activeId} />
            ))}
          </div>
        </SortableContext>

        <DragOverlay>
          {activeId ? <DragOverlayItem id={String(activeId)} /> : null}
        </DragOverlay>
      </DndContext>
    </>
  );
}
