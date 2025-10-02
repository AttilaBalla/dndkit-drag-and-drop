import { Typography } from '@mui/material';

interface IProps {
  text: string
}

export const ExampleComponent = (props: IProps) => {
  return (
    <div>
      <Typography>
          {props.text}
      </Typography>
    </div>
  )
}
