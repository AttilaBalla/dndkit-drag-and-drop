import { PropsWithChildren } from 'react';
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { Item } from './Item';
import { UniqueIdentifier, useDroppable } from '@dnd-kit/core';
import { Box } from '@mui/material';

interface IProps extends PropsWithChildren {
  id: UniqueIdentifier;
  items: Array<{ id: UniqueIdentifier; text: string }>;
  canDrag: boolean;
}

export function DroppableContainer(props: IProps) {
  const { id, items, canDrag } = props;

  const { setNodeRef } = useDroppable({ id });

  return (
    <Box ref={setNodeRef}
      sx={{
        flex: 1,
        border: '1px solid lightgrey',
        borderRadius: '4px',
        padding: '.5rem',
        boxSizing: 'border-box'
      }}
    >
      <SortableContext items={items} strategy={rectSortingStrategy}>
        {items.map((item) => (
          <Item
            id={item.id}
            text={item.text}
            canDrag={canDrag}
            key={item.id}
          ></Item>
        ))}
      </SortableContext>
    </Box>
  );
}
