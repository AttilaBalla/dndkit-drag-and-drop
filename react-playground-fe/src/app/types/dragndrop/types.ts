import React, { CSSProperties, ReactNode } from 'react';
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
  ratio: number;
  items: DragAndDropItem[];
}

export interface DragAndDropComponentList {
  containerId: UniqueIdentifier, component: ReactNode
}

export const DragAndDropContainerLayouts = {
  oneToOne: [1, 1],
  oneToTwo: [1, 2],
  twoToOne: [2, 1],
  tripleOne: [1, 1, 1]
}
