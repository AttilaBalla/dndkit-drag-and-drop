import styled from 'styled-components';
import { DragAndDropComponent } from './features/dragndrop/DragAndDropComponent';
import { Typography } from '@mui/material';
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
      <DragAndDropComponent />
    </StyledApp>
  );
}

export default App;
