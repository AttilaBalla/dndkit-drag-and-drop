import { UniqueIdentifier } from '@dnd-kit/core';
import {
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
