import { useState } from 'react';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { DragAndDropComponent } from '../features/dragndrop/DragAndDropComponent';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import CheckIcon from '@mui/icons-material/Check';
import { ExampleComponent } from '../common/ExampleComponent';
import { IconButtonComponent } from '../common/IconButtonComponent';

export function DragAndDropPage() {

  const [canChangeLayout, setCanChangeLayout] = useState(false);

  function toggleCanChangeLayout() {
    setCanChangeLayout(!canChangeLayout);
  }

  return(
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
        containers={[
          {
            id: 'container-1',
            ratio: 2,
            items: [
              {id: 100, component: <ExampleComponent text={'some text here'}/>},
              {id: 101, component: <ExampleComponent text={'this is another one'}/>},
              {id: 102, component: <ExampleComponent text={'some more stuff with a lot of text that should make this one bigger theoretically but also for sure..Look at me Im bigger than the others! Who wants only fixed height components here, right?'}/>}
            ]},
          {
            id: 'container-2',
            ratio: 1,
            items: [
              {id: 200, component: <ExampleComponent text={'figure out how this works'}/>},
              {id: 201, component: <ExampleComponent text={'with any component inside'}/>},
              {id: 202, component: <IconButtonComponent/>}
            ]},
          {
            id: 'container-3',
            ratio: 2,
            items: []
          }
        ]}/>
    </>
  )
}
