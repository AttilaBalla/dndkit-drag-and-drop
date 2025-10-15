import { useSortable } from '@dnd-kit/sortable';
import { motion } from 'framer-motion';
import styles from '../Styles';
import React from 'react';
import { CSS } from '@dnd-kit/utilities';
import { PatternItem } from '../../../types/patternbuilder/types';
import { ItemContent } from './ItemContent';
import { useTheme } from '@mui/material';

interface IProps {
  item: PatternItem;
}

export function Item(props: IProps) {

  const theme = useTheme();
  const { id, activeId, type, text, beatCount } = props.item;

  const sortableHandler = useSortable({
    id,
  });

  const sortableTransitionStyle: React.CSSProperties = {
    ...styles.cardStyles,
    gridColumn: `span ${beatCount}`,
    // calculate width based on beatCount (4rem per beat + 0.75rem gap for every gap in the grid)
    width: `${4 * beatCount + (beatCount - 1) * 0.75}rem`,
    backgroundColor: theme.palette.background.paper,
    transition: sortableHandler.transition,
    transform: sortableHandler.transform
      ? CSS.Transform.toString(sortableHandler.transform)
      : undefined,
  };

  return (
    <motion.div
      layoutId={id}
      transition={{
        type: 'spring',
        duration: activeId ? 0 : 0.6,
      }}
      ref={sortableHandler.setNodeRef}
      style={sortableTransitionStyle}
      animate={{ opacity: sortableHandler.isDragging ? 0.5 : 1 }}
      {...sortableHandler.attributes}
      {...sortableHandler.listeners}
    >
      <ItemContent item={props.item} />
    </motion.div>
  );
}
