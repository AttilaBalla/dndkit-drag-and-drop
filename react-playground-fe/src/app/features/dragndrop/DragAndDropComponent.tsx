import { useState } from 'react';
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { DroppableContainer } from './DroppableContainer';
import { getItemPosition } from './utilities/dragAndDropUtils';
import Button from '@mui/material/Button';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import CheckIcon from '@mui/icons-material/Check';
import { Container } from '../../types/dragndrop/types';
import { initialContainerState } from './utilities/dragAndDropConstants';

export function DragAndDropComponent() {
  const [containers, setContainers] = useState<Container[]>(initialContainerState);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [currentContainerId, setCurrentContainerId] =
    useState<UniqueIdentifier | null>(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const [items, setItems] = useState([
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
    { id: 3, text: 'Item 3' },
    { id: 4, text: 'Item 4' },
    { id: 5, text: 'Item 5' },
  ]);

  const [canDrag, setCanDrag] = useState(false);

  function handleDragStart(event: DragMoveEvent) {
    /* empty */
  }

  function handleDragOver(event: DragOverEvent) {
    /* empty */
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id === over?.id) {
      return;
    }

    setItems((items) => {
      const currentPosition = getItemPosition(active.id as number, items);
      const newPosition = getItemPosition(over?.id as number, items);

      return arrayMove(items, currentPosition, newPosition);
    });
  }

  function toggleCanDrag() {
    setCanDrag(!canDrag);
  }

  return (
    <>
      <Button
        variant="contained"
        color={canDrag ? 'success' : 'primary'}
        onClick={toggleCanDrag}
        endIcon={canDrag ? <CheckIcon /> : <AppRegistrationIcon />}
      >
        {canDrag ? 'Save Changes' : 'Change Layout'}
      </Button>
      <DndContext
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
        sensors={sensors}
      >
        <SortableContext items={containers.map((container) => container.id)}>
          {/*{containers.map((container) => {*/}
          {/*  return(*/}
          {/*    <DroppableContainer*/}
          {/*      key={container.id}*/}
          {/*      id={container.id}*/}
          {/*      items={items}*/}
          {/*      canDrag={canDrag}*/}
          {/*    />*/}
          {/*  )*/}
          {/*})}*/}
          <DroppableContainer items={items} id={1} canDrag={canDrag} />
        </SortableContext>
      </DndContext>
    </>
  );
}
