import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';

export function IconButtonComponent() {
  return (
    <>
      <TextField variant={'outlined'} label={'Input'}/>
      <Button variant={'contained'} startIcon={<CheckIcon />}>
        Submit
      </Button>
    </>
  );
}
