import { PropsWithChildren } from 'react';
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { Item } from './Item';
import { useDroppable } from '@dnd-kit/core';

interface IProps extends PropsWithChildren {
  id: number;
  items: Array<{ id: number; text: string }>;
  canDrag: boolean;
}

export function DroppableContainer(props: IProps) {
  const { id, items, canDrag } = props;

  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className={'droppable-container'}>
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
    </div>
  );
}
