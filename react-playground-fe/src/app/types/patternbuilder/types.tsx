import { UniqueIdentifier } from '@dnd-kit/core';

export interface PatternItem {
  id: string,
  activeId: UniqueIdentifier | undefined
  type: string,
  text: string,
  beatCount: number
}
