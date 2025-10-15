import { useState } from 'react';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { DragAndDropComponent } from '../features/dragndrop/components/DragAndDropComponent';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import CheckIcon from '@mui/icons-material/Check';
import { ExampleComponent } from '../common/ExampleComponent';
import { DragAndDropContainerLayouts } from '../types/dragndrop/types';

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
        layout={DragAndDropContainerLayouts.twoToOne}
        components={[
          {
            containerId: 1,
            component: <ExampleComponent text={'this is a component here'} />,
          },
          {
            containerId: 1,
            component: <ExampleComponent text={'this is a component here'} />,
          },
          {
            containerId: 2,
            component: <ExampleComponent text={'this is a component here'} />,
          },
          {
            containerId: 2,
            component: <ExampleComponent text={'this is a component here'} />,
          },
        ]}
        canChangeLayout={canChangeLayout}
      />
    </>
  );
}
