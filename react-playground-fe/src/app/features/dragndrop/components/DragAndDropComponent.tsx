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
import { DroppableContainer } from './DroppableContainer';
import { DragAndDropContainer } from '../../../types/dragndrop/types';
import { Box, Stack } from '@mui/material';
import { arrayMove } from '@dnd-kit/sortable';
import Button from '@mui/material/Button';
import {
  containerLayouts,
  findContainerId,
} from '../utilities/dragAndDropUtils';

interface IProps {
  canChangeLayout: boolean;
}

export function DragAndDropComponent(props: IProps) {
  const { canChangeLayout } = props;

  const [containers, setContainers] = useState<DragAndDropContainer[]>(
    containerLayouts['1-1-1']
  );
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 10, // small delay to prevent accidental drags
        tolerance: 5,
      },
    })
  );

  function toggleLayoutPreset(layout: string) {
    const newContainerLayout = containerLayouts[layout];

    if (newContainerLayout.length !== containers.length) {
      // If the number of containers is changing, we need to redistribute items
      const allItems = containers.flatMap((container) => container.items);
      const itemsPerContainer = Math.floor(
        allItems.length / newContainerLayout.length
      );
      const updatedContainers = newContainerLayout.map(
        (newContainer, index) => {
          const startIdx = index * itemsPerContainer;
          const endIdx =
            index === newContainerLayout.length - 1
              ? allItems.length
              : startIdx + itemsPerContainer;
          return {
            ...newContainer,
            items: allItems.slice(startIdx, endIdx),
          };
        }
      );
      setContainers(updatedContainers);
    } else {
      const updatedContainers = newContainerLayout.map(
        (newContainer: DragAndDropContainer, index: number) => {
          return {
            ...newContainer,
            items: containers[index] ? containers[index].items : [],
          };
        }
      );
      setContainers(updatedContainers);
    }
  }

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
    if (
      !activeContainerId ||
      !overContainerId ||
      activeContainerId === overContainerId
    ) {
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
      const overItemIndex = overContainer.items.findIndex(
        (item) => item.id === overId
      );
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

  return (
    <>
      {canChangeLayout ? (
        <Stack direction="row" spacing={2} sx={{ marginTop: '1rem' }}>
          <Button
            variant="contained"
            color={'primary'}
            onClick={() => {
              toggleLayoutPreset('2-4');
            }}
          >
            2/4
          </Button>
          <Button
            variant="contained"
            color={'primary'}
            onClick={() => {
              toggleLayoutPreset('1-1-1');
            }}
          >
            1/1/1
          </Button>
          <Button
            variant="contained"
            color={'primary'}
            onClick={() => {
              toggleLayoutPreset('2-1-2');
            }}
          >
            2/1/2
          </Button>
        </Stack>
      ) : null}
      <DndContext
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
        collisionDetection={closestCorners}
        sensors={sensors}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            gap: '1rem',
            boxSizing: 'border-box',
            marginTop: '1rem',
          }}
        >
          {containers.map((container) => {
            return (
              <DroppableContainer
                key={container.id}
                id={container.id}
                items={container.items}
                ratio={container.ratio}
                canDrag={canChangeLayout}
              />
            );
          })}
        </Box>
      </DndContext>
    </>
  );
}
