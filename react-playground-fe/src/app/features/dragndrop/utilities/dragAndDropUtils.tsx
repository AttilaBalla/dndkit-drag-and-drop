import { UniqueIdentifier } from '@dnd-kit/core';
import {
  DragAndDropComponentList,
  DragAndDropContainer,
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

export function createInitialLayout(layout: number[]): DragAndDropContainer[] {
  return layout.map((ratio, idx) => ({
    id: idx + 1, // can't start IDs from 0, because 0 is falsy
    items: [],
    ratio,
  }));
}

export function createLayoutWithComponents(
  layout: number[],
  components: DragAndDropComponentList[]
): DragAndDropContainer[] {
  const containers = createInitialLayout(layout);

  for (const item of components) {
    const container = containers.find(c => c.id === item.containerId);
    if (!container) {
      throw new Error(`Container with id ${item.containerId} does not exist in layout`);
    }
    container.items.push({
      id: crypto.randomUUID(),
      component: item.component
    });
  }

  return containers;
}
