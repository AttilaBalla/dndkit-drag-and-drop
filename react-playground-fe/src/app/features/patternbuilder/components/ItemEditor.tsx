import { ChangeEvent, useState } from 'react';
import {
  Box,
  Chip,
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
import { PatternItem } from '../../../types/patternbuilder/types';

interface FormState {
  type: string;
  text: string;
  beats: number;
}

interface IProps {
  addItem: (newItem: PatternItem) => void;
}

export function ItemEditor(props: IProps) {
  const addItem = props.addItem;

  const [formState, setFormState] = useState<FormState>({
    type: '',
    text: '',
    beats: 0,
  });

  function handleSelectChange(event: SelectChangeEvent) {
    setFormState((prevState) => {
      return { ...prevState, type: event.target.value as string };
    });
  }

  function handleTextChange(event: ChangeEvent<HTMLInputElement>) {
    setFormState((prevState) => {
      return { ...prevState, text: event.target.value as string };
    });
  }

  function handleBeatsChange(event: ChangeEvent<HTMLInputElement>) {
    setFormState((prevState) => {
      return { ...prevState, beats: parseInt(event.target.value) as number };
    });
  }

  function quickAddPattern(pattern: PatternItem) {
    addItem({
      id: crypto.randomUUID(),
      activeId: undefined,
      text: pattern.text,
      type: pattern.type,
      beatCount: pattern.beatCount,
    });
  }

  return (
    <Paper sx={{ padding: '1rem', marginBottom: '1rem' }} elevation={2}>
      <Typography mb={1}>Common Patterns</Typography>
      <Stack direction="row" spacing={2} sx={{ mb: '1rem' }}>
        <Chip
          label="sugar push"
          color={'info'}
          variant="outlined"
          onClick={() => {
            quickAddPattern({
              id: crypto.randomUUID(),
              activeId: undefined,
              text: 'sugar push',
              type: 'push',
              beatCount: 6
            });
          }}
        />
        <Chip
          label="left side pass"
          variant="outlined"
          onClick={() => {
            quickAddPattern({
              id: crypto.randomUUID(),
              activeId: undefined,
              text: 'left side pass',
              type: 'pass',
              beatCount: 6
            });
          }}
        />
        <Chip
          label="basic whip"
          variant="outlined"
          onClick={() => {
            quickAddPattern({
              id: crypto.randomUUID(),
              activeId: undefined,
              text: 'basic whip',
              type: 'whip',
              beatCount: 8
            });
          }}
        />
        <Chip
          label="under arm turn"
          variant="outlined"
          onClick={() => {
            quickAddPattern({
              id: crypto.randomUUID(),
              activeId: undefined,
              text: 'under arm turn',
              type: 'pass',
              beatCount: 6
            });
          }}
        />
        <Chip
          label="slingshot"
          variant="outlined"
          onClick={() => {
            quickAddPattern({
              id: crypto.randomUUID(),
              activeId: undefined,
              text: 'slingshot',
              type: 'pass',
              beatCount: 6
            });
          }}
        />
        <Chip
          label="rock and go"
          variant="outlined"
          onClick={() => {
            quickAddPattern({
              id: crypto.randomUUID(),
              activeId: undefined,
              text: 'rock and go',
              type: 'technical',
              beatCount: 4
            });
          }}
        />
      </Stack>
      <Typography sx={{ mb: '1rem' }}>Add Pattern</Typography>
      <Box display="flex">
        <FormControl>
          <Stack direction={'row'} gap={3}>
            <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              sx={{ minWidth: '10rem' }}
              value={formState.type}
              label="Type"
              onChange={handleSelectChange}
            >
              <MenuItem value={'push'}>Push</MenuItem>
              <MenuItem value={'pass'}>Pass</MenuItem>
              <MenuItem value={'whip'}>Whip</MenuItem>
              <MenuItem value={'technical'}>Technical</MenuItem>
              <MenuItem value={'styling'}>Styling</MenuItem>
              <MenuItem value={'other'}>Other</MenuItem>
            </Select>
            <TextField
              sx={{ flexBasis: '45%' }}
              label="Text"
              variant="outlined"
              type={'text'}
              onChange={handleTextChange}
            />
            <TextField
              sx={{ flexBasis: '15%' }}
              label="Beats"
              variant="outlined"
              type={'number'}
              onChange={handleBeatsChange}
            />
            <Button
              variant={'contained'}
              color={'success'}
              onClick={() => {
                addItem({
                  id: crypto.randomUUID(),
                  activeId: undefined,
                  text: formState.text,
                  type: formState.type,
                  beatCount: formState.beats,
                });
              }}
            >
              Add
            </Button>
          </Stack>
        </FormControl>
      </Box>
    </Paper>
  );
}
