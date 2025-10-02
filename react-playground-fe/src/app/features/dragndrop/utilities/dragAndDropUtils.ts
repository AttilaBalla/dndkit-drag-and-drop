import { UniqueIdentifier } from '@dnd-kit/core';
import { Container } from '../../../types/dragndrop/types';

export function findContainerId(
  containers: Container[],
  itemId: UniqueIdentifier | undefined
) {
  if(containers.some((container) => container.id === itemId)) {
    return itemId;
  }
  return containers.find((container) =>
    container.items.some((item) => item.id === itemId)
  )?.id;
}

export function constructInitialState() {

}
