import { useDndContext } from '@dnd-kit/core';
import styles from '../Styles';

export function DragOverlayItem(props: { id: string }) {
  const { id } = props;

  const isReallyActive = useDndIsReallyActiveId(id);

  return (
    <div
      style={{
        ...styles.cardStyles,
        backgroundColor: id,
        padding: 0,
        transform: isReallyActive ? "scale(1.05)" : "none",
      }}
    />
  );
}

function useDndIsReallyActiveId(id: string) {
  const context = useDndContext();

  return context.active?.id === id;
}


