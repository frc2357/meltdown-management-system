import { createTheme, ThemeOptions } from '@mui/material';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#FF8811',
    },
    secondary: {
      main: '#47FF44',
    },
    background: {
      default: '#D3D3D3', //'#6D8196' - SLATE GRAY, //'#f5f5f5' - off white,
    },
  },
};

export const appTheme = createTheme(themeOptions);
