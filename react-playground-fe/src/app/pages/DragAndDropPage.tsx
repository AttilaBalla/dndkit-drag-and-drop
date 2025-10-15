import { useState } from 'react';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { DragAndDropComponent } from '../features/dragndrop/components/DragAndDropComponent';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import CheckIcon from '@mui/icons-material/Check';

export function DragAndDropPage() {
  const [canChangeLayout, setCanChangeLayout] = useState(false);

  function toggleCanChangeLayout() {
    setCanChangeLayout(!canChangeLayout);
  }

  return (
    <>
      <Typography>Drag and drop POC</Typography>
        <Button
          variant="contained"
          color={canChangeLayout ? 'success' : 'primary'}
          onClick={toggleCanChangeLayout}
          endIcon={canChangeLayout ? <CheckIcon /> : <AppRegistrationIcon />}
        >
          {canChangeLayout ? 'Save Changes' : 'Change Layout'}
        </Button>
      <DragAndDropComponent
        canChangeLayout={canChangeLayout}
      />
    </>
  );
}
