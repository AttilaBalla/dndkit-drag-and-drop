import { ReactNode, useState } from 'react';
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
import { DroppableContainer } from './DroppableContainer';
import Button from '@mui/material/Button';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import CheckIcon from '@mui/icons-material/Check';
import { Container } from '../../types/dragndrop/types';
import { initialContainerState } from './utilities/dragAndDropConstants';
import { findContainerId } from './utilities/dragAndDropUtils';
import { Box } from '@mui/material';
import { arrayMove } from '@dnd-kit/sortable';

interface IProps {
  items: Array<{ containerId: UniqueIdentifier; component: ReactNode }>;
}

export function DragAndDropComponent(props: IProps) {
  const [containers, setContainers] = useState<Container[]>(
    initialContainerState
  );
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: {
      delay: 10, // small delay to prevent accidental drags
      tolerance: 5
    }
  }));

  const [canDrag, setCanDrag] = useState(false);

  function handleDragStart(event: DragMoveEvent) {
    setActiveId(event.active.id);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;

    if (!over) {
      return;
    }

    const activeId = active.id;
    const overId = over.id;
    const activeContainerId = findContainerId(containers, activeId);
    const overContainerId = findContainerId(containers, overId);

    // Only proceed if moving between different containers
    if (!activeContainerId || !overContainerId || activeContainerId === overContainerId) {
      return;
    }

    setContainers((prevState) => {
      // Find the container we are dragging from
      const activeContainer = prevState.find(
        (container) => container.id === activeContainerId
      );
      // Find the container we are dragging to
      const overContainer = prevState.find(
        (container) => container.id === overContainerId
      );

      if (!activeContainer || !overContainer) return prevState;

      // Find the item we are dragging
      const activeItem = activeContainer.items.find(
        (item) => item.id === activeId
      );
      if (!activeItem) return prevState;

      // Remove the item from the source container
      const newActiveContainer = {
        ...activeContainer,
        items: activeContainer.items.filter((item) => item.id !== activeId),
      };

      // Insert the item into the target container at the correct position
      const overItemIndex = overContainer.items.findIndex((item) => item.id === overId);
      let newItems;
      if (overItemIndex === -1) {
        // If not over an item, add to the end
        newItems = [...overContainer.items, activeItem];
      } else {
        // Insert after the hovered item
        newItems = [
          ...overContainer.items.slice(0, overItemIndex + 1),
          activeItem,
          ...overContainer.items.slice(overItemIndex + 1),
        ];
      }
      const newOverContainer = {
        ...overContainer,
        items: newItems,
      };

      // Return updated containers
      return prevState.map((container) => {
        if (container.id === activeContainerId) return newActiveContainer;
        if (container.id === overContainerId) return newOverContainer;
        return container;
      });
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    const activeId = active.id;
    const overId = over.id;
    const activeContainerId = findContainerId(containers, activeId);
    const overContainerId = findContainerId(containers, overId);

    /// we don't want to do anything if we are not over a container
    if (!activeContainerId || !overContainerId) {
      setActiveId(null);
      return;
    }

    if (activeContainerId === overContainerId && activeId !== overId) {
      const containerIndex = containers.findIndex(
        (container) => container.id === activeContainerId
      );

      if (containerIndex === -1) {
        setActiveId(null);
        return;
      }

      const container = containers[containerIndex];
      const activeIndex = container.items.findIndex(
        (item) => item.id === activeId
      );
      const overIndex = container.items.findIndex((item) => item.id === overId);

      if (activeIndex !== -1 && overIndex !== -1) {
        const newItems = arrayMove(container.items, activeIndex, overIndex);

        setContainers((containers) => {
          return containers.map((container, index) => {
            if (index === containerIndex) {
              return {
                ...container,
                items: newItems,
              };
            }
            return container;
          });
        });
      }
    }

    setActiveId(null);
  }

  function handleDragCancel() {
    setActiveId(null);
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
        onDragCancel={handleDragCancel}
        collisionDetection={closestCorners}
        sensors={sensors}
      >
        <Box sx={{
          width: '100%',
          display: 'flex',
          gap: '1rem',
          boxSizing: 'border-box',
          marginTop: '1rem'
        }}>
          {containers.map((container) => {
            return (
              <DroppableContainer
                key={container.id}
                id={container.id}
                items={container.items}
                canDrag={canDrag}
              />
            );
          })}
        </Box>
      </DndContext>
    </>
  );
}
