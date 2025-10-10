import { Outlet } from '@tanstack/react-router';
import styled from 'styled-components';


const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90vh;
`;

export function App() {

  return (
    <StyledApp>
      <Outlet/>
    </StyledApp>
  );
}

export default App;
