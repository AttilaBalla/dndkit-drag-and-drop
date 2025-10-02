import { CSSProperties } from 'react';
import { UniqueIdentifier } from '@dnd-kit/core';

export interface ActionProps extends React.HTMLAttributes<HTMLButtonElement> {
  active?: {
    fill: string;
    background: string;
  };
  cursor?: CSSProperties['cursor'];
}

export interface Item {
  id: UniqueIdentifier;
  text: string;
}

export interface Container {
  id: UniqueIdentifier;
  items: Item[];
}
