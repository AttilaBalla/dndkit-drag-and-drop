import { useDndContext } from '@dnd-kit/core';
import styles from '../Styles';
import { PatternItem } from '../../../types/patternbuilder/types';
import { useTheme } from '@mui/material';

export function DragOverlayItem(props: PatternItem) {
  const { id, type, text, beatCount } = props;
  const theme = useTheme();

  const isReallyActive = useDndIsReallyActiveId(id);

  return (
    <div
      style={{
        ...styles.cardStyles,
        backgroundColor: theme.palette.background.paper,
        padding: '.5rem',
        transform: isReallyActive ? "scale(1.05)" : "none",
      }}
    >
      {text}
    </div>
  );
}

function useDndIsReallyActiveId(id: string) {
  const context = useDndContext();

  return context.active?.id === id;
}


