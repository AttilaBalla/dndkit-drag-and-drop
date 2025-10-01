import {
  AnimateLayoutChanges,
  defaultAnimateLayoutChanges,
} from '@dnd-kit/sortable';

export const animateLayoutChanges: AnimateLayoutChanges = (args) =>
  defaultAnimateLayoutChanges({...args, wasDragging: true});


export function getItemPosition(id: number, items: Array<{id: number, text: string}>) {
  return items.findIndex((item) => item.id === id);
}
