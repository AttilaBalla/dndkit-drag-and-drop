import { useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';

interface FormState {
  type: string;
  text: string;
  beats: number;
}

export function ItemEditorComponent() {

  const [formState, setFormState] = useState<FormState>({
    type: '',
    text: '',
    beats: 0,
  })

  const handleChange = (event: SelectChangeEvent) => {
    setFormState(prevState => {
      return {...prevState, type: event.target.value as string}
    });
  };

  return (
    <Paper sx={{ padding: '1rem' }}>
      <Typography mb={1}>Add pattern element</Typography>
      <Box display="flex">
        <FormControl>
          <Stack direction={'row'} gap={3}>
            <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              sx={{ minWidth: '10rem' }}
              value={formState.type}
              label="Type"
              onChange={handleChange}
            >
              <MenuItem value={'push'}>Push</MenuItem>
              <MenuItem value={'pass'}>Pass</MenuItem>
              <MenuItem value={'whip'}>Whip</MenuItem>
              <MenuItem value={'variation'}>Variation</MenuItem>
              <MenuItem value={'styling'}>Styling</MenuItem>
              <MenuItem value={'other'}>Other</MenuItem>
            </Select>
            <TextField label="text" variant="outlined" type={'text'} />
            <TextField label="beats" variant="outlined" type={'number'} />
            <Button variant={'contained'} color={'success'}>
              Add
            </Button>
          </Stack>
        </FormControl>
      </Box>
    </Paper>
  );
}
