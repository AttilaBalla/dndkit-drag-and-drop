import { Box, Typography } from '@mui/material';
import { PatternItem } from '../../../types/patternbuilder/types';

interface IProps {
  item: PatternItem
}

export function ItemContent(props: IProps) {

  const { id, text, type, beatCount } = props.item;

  return(
    <Box>
      <Typography>{text}</Typography>
    </Box>
  )
}
