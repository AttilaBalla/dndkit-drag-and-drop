import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'dark', // or 'light'
    background: {
      default: '#121212', // custom dark background
      paper: '#1e1e1e', // custom paper background
    },
  },
});
