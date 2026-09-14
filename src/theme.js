import { createMuiTheme } from '@material-ui/core/styles';

// עדיין בנוי עם ה-API הישן של MUI v4 - createMuiTheme הוחלף ב-createTheme ב-v5.
const theme = createMuiTheme({
  direction: 'rtl',
  palette: {
    primary: { main: '#0b5ed7' },
    secondary: { main: '#d32f2f' },
  },
  typography: {
    fontFamily: ['Assistant', 'Arial', 'sans-serif'].join(','),
  },
});

export default theme;
