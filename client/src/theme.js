import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fab73d',
      textShadow: '2px 2px 5px rgb(0,0,0,0.3)',
    },
    secondary: {
      main: '#546747',
    },
  },
});

export default theme;