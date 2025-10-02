import { CSSProperties, ReactNode } from 'react';
import { UniqueIdentifier } from '@dnd-kit/core';

export interface ActionProps extends React.HTMLAttributes<HTMLButtonElement> {
  active?: {
    fill: string;
    background: string;
  };
  cursor?: CSSProperties['cursor'];
}

export interface DragAndDropItem {
  id: UniqueIdentifier;
  component: ReactNode
}

export interface DragAndDropContainer {
  id: UniqueIdentifier;
  items: DragAndDropItem[];
}
