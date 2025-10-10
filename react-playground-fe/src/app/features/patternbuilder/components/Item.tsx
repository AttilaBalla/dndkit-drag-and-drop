import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { motion } from 'framer-motion';
import styles from '../Styles';
import React from 'react';
import { CSS } from '@dnd-kit/utilities';

interface IProps {
  id: string,
  activeId: UniqueIdentifier | null
}

export function Item(props: IProps) {
  const { id, activeId } = props;

  const sortableHandler = useSortable({
    id
  });

  const sortableTransitionStyle: React.CSSProperties = {
    ...styles.cardStyles,
    backgroundColor: id,
    transition: sortableHandler.transition,
    transform: sortableHandler.transform
      ? CSS.Transform.toString(sortableHandler.transform)
      : undefined,
  };

  return (
    <motion.div
      layoutId={id}
      transition={{
        type: "spring",
        duration: activeId ? 0 : 0.6
      }}
      ref={sortableHandler.setNodeRef}
      style={sortableTransitionStyle}
      animate={{ opacity: sortableHandler.isDragging ? 0.5 : 1 }}
      {...sortableHandler.attributes}
      {...sortableHandler.listeners}
    >
      {/* Content can go here if needed */}
    </motion.div>
  );
}
