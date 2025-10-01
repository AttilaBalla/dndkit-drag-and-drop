import { CSSProperties } from 'react';
import { UniqueIdentifier } from '@dnd-kit/core';

export interface ActionProps extends React.HTMLAttributes<HTMLButtonElement> {
  active?: {
    fill: string;
    background: string;
  };
  cursor?: CSSProperties['cursor'];
}

export type DraggableType = {
  id: UniqueIdentifier;
  title: string;
  items: {
    id: UniqueIdentifier;
    title: string;
  }
}

export interface Item {
  id: number;
  text: string;
}

export interface Container {
  id: number;
  items: Item[];
}
