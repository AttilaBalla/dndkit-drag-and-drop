import { Outlet } from '@tanstack/react-router';
import { Box, styled } from '@mui/material';

const StyledApp = styled(Box)(({ theme }) => ({
  display: 'flex',
  maxWidth: '1600px',
  margin: '0 auto',
  padding: '1rem',
  flexDirection: 'column',
  alignItems: 'center',
  height: '90vh',
  background: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

export function App() {
  return (
    <StyledApp>
      <Outlet />
    </StyledApp>
  );
}

export default App;
