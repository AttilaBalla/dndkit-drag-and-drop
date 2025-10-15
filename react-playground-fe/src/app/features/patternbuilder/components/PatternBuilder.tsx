import React, { useState } from 'react';
import {
  DndContext,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
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
import { Box, Slider, Typography } from '@mui/material';
import { ItemEditor } from './ItemEditor';
import { PatternItem } from '../../../types/patternbuilder/types';
import {
  initialColumnCount,
  initialItems,
} from '../utilities/patternBuilderUtils';

export function PatternBuilder() {
  const [items, setItems] = useState<PatternItem[]>(initialItems);

  const [activeItem, setActiveItem] = useState<PatternItem | undefined>(
    undefined
  );
  const [columnCount, setColumnCount] = useState(initialColumnCount);

  function addPatternItem(newItem: PatternItem) {
    setItems((items) => [...items, newItem]);
  }

  function handleDragStart(event: DragStartEvent) {
    const activeItem = items.find((item) => item.id === event.active.id);
    setActiveItem(activeItem);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;

    if (!over) {
      return;
    }

    const activeIndex = items.findIndex((item) => item.id === active.id);
    const overIndex = items.findIndex((item) => item.id === over.id);

    if (activeIndex !== -1 && overIndex !== -1) {
      const newItems = arrayMove(items, activeIndex, overIndex);

      setItems(newItems);
    }
  }

  function handleDragEnd() {
    setActiveItem(undefined);
  }

  function reorganizeItemsBasedOnColumnCount(columnCount: number) {
    let totalBeats = 0;
    items.forEach((item) => {
      totalBeats += item.beatCount;
    });

    if (totalBeats % columnCount === 0) {
      console.log('nothing to do');
      return;
    }

    const numberOfRows = Math.ceil(totalBeats / columnCount);
    console.log(numberOfRows);

    for (let i = 0; i < columnCount; i++) {
      break;
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <>
      <Box>
        <Typography>Beats / Row</Typography>
        <Slider
          aria-label="Temperature"
          defaultValue={initialColumnCount}
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
            reorganizeItemsBasedOnColumnCount(Number(value));
            setColumnCount(Number(value));
          }}
        />
        <ItemEditor addItem={addPatternItem} />
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
            {items.map((item) => (
              <Item key={item.id} item={item} />
            ))}
          </div>
        </SortableContext>

        <DragOverlay>
          {activeItem ? (
            <DragOverlayItem
              id={activeItem.id}
              text={activeItem.text}
              type={activeItem.type}
              activeId={activeItem?.id}
              beatCount={activeItem.beatCount}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </>
  );
}
