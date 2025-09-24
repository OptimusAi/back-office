import React from 'react';
import createTheme from '@material-ui/core/styles/createTheme';
import grey from '@material-ui/core/colors/grey';
import { ThemeProvider as Provider } from '@material-ui/styles';

const theme = createTheme({
  props: {
    MuiToolbar: {
      variant: 'dense',
    },
    MuiButton: {
      size: 'small',
    },
    MuiToggleButtonGroup: {
      size: 'small',
    },
  },
  overrides: {
    MuiSvgIcon: {
      root: {
        fontSize: 20,
      },
    },
    MuiAppBar: {
      root: {
        boxShadow: 'none'
      }
    },
    MuiButton: {
      root: {
        borderRadius: 0
      },
      contained: {
        boxShadow: 'none'
      }
    },
    MuiToggleButtonGroup: {
      root: {
        borderRadius: 0,
      },
      groupedHorizontal: {
        borderRadius: 0
      },
    },
  },
  palette: {
    primary: {
      light: '#aaa7dc',
      main: '#302a96',
    },
    secondary: {
      main: '#3d4040',
    },
    background: {
      default: '#fff',
    },
    accent: {
      main: '#fc4c01'
    },
    grey: {
      light: grey[200],
      main: grey[500],
      dark: grey[700]
    }
  }
});

export function ThemeProvider({ children }) {
  return (
    <Provider theme={theme} children={children} />
  );
}
export default ThemeProvider;
