import { Paper, useTheme } from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { ReactNode } from 'react';
import { UniqueIdentifier } from '@dnd-kit/core';

interface IProps {
  id: UniqueIdentifier;
  component: ReactNode;
  canDrag: boolean;
}

export function Item(props: IProps) {
  const theme = useTheme();
  const { id, component, canDrag} = props;
  const sortableHandler = useSortable({ id });

  const sortableTransitionStyle: React.CSSProperties = {
    transition: sortableHandler.transition,
    transform: sortableHandler.transform
      ? CSS.Transform.toString(sortableHandler.transform)
      : undefined,
  };

  return (
    <Paper
      ref={sortableHandler.setNodeRef}
      {...(canDrag ? sortableHandler.listeners : {})}
      {...sortableHandler.attributes}
      style={sortableTransitionStyle}
      sx={{
        opacity: sortableHandler.isDragging ? 0.5 : 1,
        cursor: canDrag ? 'grab' : 'default',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: '5rem',
        padding: '1rem',
        marginTop: '.5rem',
        marginBottom: '.5rem',
        backgroundColor: theme.palette.background.paper,
        boxSizing: 'border-box',
        width: '100%', // Ensures item matches container width
      }}
    >
      {component}
    </Paper>
  );
}
