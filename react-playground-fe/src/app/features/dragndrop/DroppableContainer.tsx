import { PropsWithChildren } from 'react';
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { Item } from './Item';
import { UniqueIdentifier, useDroppable } from '@dnd-kit/core';
import { Box } from '@mui/material';
import { DragAndDropItem } from '../../types/dragndrop/types';

interface IProps extends PropsWithChildren {
  id: UniqueIdentifier;
  items: DragAndDropItem[];
  ratio: number; // Flex grow ratio of this container
  canDrag: boolean;
}

export function DroppableContainer(props: IProps) {
  const { id, items, ratio, canDrag } = props;

  const { setNodeRef } = useDroppable({ id });

  return (
    <Box ref={setNodeRef}
      sx={{
        flex: ratio,
        border: canDrag ? '1px solid blue' : '1px solid lightgrey',
        borderRadius: '4px',
        padding: '.5rem',
        boxSizing: 'border-box'
      }}
    >
      <SortableContext items={items} strategy={rectSortingStrategy}>
        {items.map((item) => (
          <Item
            id={item.id}
            component={item.component}
            canDrag={canDrag}
            key={item.id}
          ></Item>
        ))}
      </SortableContext>
    </Box>
  );
}
