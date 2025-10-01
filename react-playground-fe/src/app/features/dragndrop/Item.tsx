import { Paper, Typography, useTheme } from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';
import { ItemHandle } from './ItemHandle';

interface IProps {
  id: number;
  text: string;
  canDrag: boolean;
}

export function Item(props: IProps) {
  const theme = useTheme();
  const { id, text, canDrag } = props;
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
      {...sortableHandler.attributes}
      style={sortableTransitionStyle}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '20rem',
        height: '4rem',
        padding: '1rem',
        marginTop: '.5rem',
        marginBottom: '.5rem',
        backgroundColor: theme.palette.grey[300],
      }}
    >
      <Typography>{text}</Typography>
      {canDrag ? <ItemHandle listeners={{...sortableHandler.listeners}} /> : null}
    </Paper>
  );
}
