import { createMuiTheme } from '@material-ui/core/styles';

const primaryColor = '#FF3B3F'; // watermelon
const secondaryColor = '#EFEFEF'; // light gray
const primaryTextColor = '#333'; // dark gray
const secondaryTextColor = '#FFF'; // white

const theme = createMuiTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryTextColor,
    },
  },
  typography: {
    h6: {
      fontFamily: ['Cabin', 'sans-serif'],
      fontSize: 18,
      fontWeight: 600,
    },
    body1: {
      fontFamily: ['Raleway', 'sans-serif'],
      fontSize: 16,
    },
    body2: {
      fontFamily: ['Raleway', 'sans-serif'],
      fontSize: 14,
    }
  },
  overrides: {
    MuiGrid: {
      root: {
        height: '100%',
      },
      container: {
        flexWrap: 'nowrap',
      }
    },
    MuiButton: {
      root: {
        textTransform: 'none',
        fontFamily: ['Cabin', 'sans-serif'],
        fontSize: 14,
      },
      textPrimary: {
        color: '#FFF',
        fontWeight: 'bold',
      },
      textSecondary: {
        color: '#333',
      },
      containedPrimary: {
        backgroundColor: primaryColor,
      },
      containedSecondary: {
        backgroundColor: secondaryColor,
      }
    },
    MuiTypography: {
      h6: {
        fontFamily: ['Cabin', 'sans-serif'],
        fontSize: 20,
        fontWeight: 600,
      },
      body1: {
        fontFamily: ['Raleway', 'sans-serif'],
        fontSize: 18,
      },
      body2: {
        fontFamily: ['Raleway', 'sans-serif'],
        fontSize: 14,
      },
      colorPrimary: {
        color: '#333'
      },
      colorSecondary: {
        color: '#FFF'
      },
    },
    MuiListSubheader: {
      root: {
        fontFamily: ['Raleway', 'sans-serif'],
        fontSize: 14,
        fontWeight: 'bold',
      },
    },
    MuiListItemText: {
      root: {
        fontFamily: ['Cabin', 'sans-serif'],
        fontSize: 14,
      },
    },
    MuiTab: {
      wrapper: {
        fontFamily: ['Cabin', 'sans-serif'],
        fontSize: 14,
        fontWeight: 'bold',
      }
    },
    MuiDivider: {
      root: {
        backgroundColor: 'rgba(0,0,0,0.54)',
      },
    },
  },
});

export {
  theme,
  primaryColor,
  primaryTextColor,
  secondaryColor,
  secondaryTextColor,
};
