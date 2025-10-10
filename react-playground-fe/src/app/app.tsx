import { Outlet } from '@tanstack/react-router';
import styled from 'styled-components';
import { CssBaseline } from '@mui/material';

const StyledApp = styled.div`
  display: flex;
  max-width: 1600px;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  height: 90vh;
`;

export function App() {
  return (
    <CssBaseline>
      <StyledApp>
        <Outlet />
      </StyledApp>
    </CssBaseline>
  );
}

export default App;
