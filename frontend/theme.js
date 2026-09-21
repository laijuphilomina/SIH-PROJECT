import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2E7D32',      // natural green
      dark: '#1B5E20',      // dark green headings
      light: '#66BB6A',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#A5D6A7',      // soft green accent
      dark: '#81C784',
      contrastText: '#1B5E20',
    },
    background: {
      default: '#FAFDF7',   // very light green-tinted white
      paper: '#FFFFFF',
    },
    success: { main: '#2E7D32' },
    warning: { main: '#F9A825' },
    error: { main: '#C62828' },
    info: { main: '#0277BD' },
    text: {
      primary: '#263238',
      secondary: '#546E7A',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Segoe UI", system-ui, sans-serif',
    h4: { fontWeight: 700, color: '#1B5E20' },
    h5: { fontWeight: 700, color: '#1B5E20' },
    h6: { fontWeight: 600, color: '#1B5E20' },
    subtitle1: { fontWeight: 500 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 10px rgba(27, 94, 32, 0.08)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          paddingTop: 10,
          paddingBottom: 10,
        },
        sizeLarge: {
          fontSize: '1.05rem',
          padding: '14px 28px',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600 },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
  },
});

export default theme;
