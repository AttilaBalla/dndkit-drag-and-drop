import styled from 'styled-components';
import { DragAndDropComponent } from './features/dragndrop/DragAndDropComponent';
import { Typography } from '@mui/material';
import { ExampleComponent } from './common/ExampleComponent';
import { IconButtonComponent } from './common/IconButtonComponent';
const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90vh;
`;

export function App() {
  return (
    <StyledApp>
      <Typography>Drag and drop POC</Typography>
      <DragAndDropComponent items={[
        {containerId: 1, component: <ExampleComponent text={'some text here'}/>},
        {containerId: 1, component: <ExampleComponent text={'this is another one'}/>},
        {containerId: 1, component: <ExampleComponent text={'some more stuff with a lot of text that should make this one bigger theoretically but also for sure..Look at me Im bigger than the others! Who wants only fixed height components here, right?'}/>},
        {containerId: 2, component: <ExampleComponent text={'figure out how this works'}/>},
        {containerId: 2, component: <ExampleComponent text={'with any component inside'}/>},
        {containerId: 3, component: <IconButtonComponent/>}
      ]}/>
    </StyledApp>
  );
}

export default App;
