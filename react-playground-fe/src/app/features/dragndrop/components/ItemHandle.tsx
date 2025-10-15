import { IconButton } from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { ActionProps } from '../../../types/dragndrop/types';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';

interface IProps extends ActionProps {
  listeners: SyntheticListenerMap | undefined
}

export function ItemHandle(props: IProps) {

  const { listeners } = props;

  return(
    <IconButton
      {...listeners}
      disableRipple aria-label="delete">
      <DragHandleIcon />
    </IconButton>
  )
}
