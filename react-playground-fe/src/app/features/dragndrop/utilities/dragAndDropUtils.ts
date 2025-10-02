import { ReactNode } from 'react';
import { UniqueIdentifier } from '@dnd-kit/core';
import {
  DragAndDropContainer,
  DragAndDropItem,
} from '../../../types/dragndrop/types';


export function findContainerId(
  containers: DragAndDropContainer[],
  itemId: UniqueIdentifier | undefined
) {
  if (containers.some((container) => container.id === itemId)) {
    return itemId;
  }
  return containers.find((container) =>
    container.items.some((item) => item.id === itemId)
  )?.id;
}

export function constructInitialState(
  items: Array<{ containerId: UniqueIdentifier; component: ReactNode }>
): DragAndDropContainer[] {
  const containersMap = new Map<UniqueIdentifier, DragAndDropItem[]>();
  let itemId = 100; // Start IDs from 100 to avoid conflicts with container IDs

  for (const item of items) {
    const dragItem: DragAndDropItem = {
      id: itemId++,
      component: item.component,
    };
    if (!containersMap.has(item.containerId)) {
      containersMap.set(item.containerId, []);
    }
    containersMap.get(item.containerId)?.push(dragItem);
  }

  return Array.from(containersMap.entries()).map(([id, items]) => ({
    id,
    items,
  }));
}
