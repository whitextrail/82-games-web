import { createMuiTheme } from '@material-ui/core/styles';
import teamColors from './teamColors';

const primaryColor = '#8E44AD'; // purple
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
      fontFamily: ['Red Hat Display', 'sans-serif'],
      fontSize: 18,
      fontWeight: 600,
    },
    body1: {
      fontFamily: ['Red Hat Display', 'sans-serif'],
      fontSize: 16,
    },
    body2: {
      fontFamily: ['Red Hat Display', 'sans-serif'],
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
        fontFamily: ['Red Hat Display', 'sans-serif'],
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
        fontFamily: ['Red Hat Display', 'sans-serif'],
        fontSize: 20,
        fontWeight: 600,
      },
      body1: {
        fontFamily: ['Red Hat Display', 'sans-serif'],
        fontSize: 18,
      },
      body2: {
        fontFamily: ['Red Hat Display', 'sans-serif'],
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
        fontFamily: ['Red Hat Display', 'sans-serif'],
        fontSize: 14,
        fontWeight: 'bold',
      },
    },
    MuiListItemText: {
      root: {
        fontFamily: ['Red Hat Display', 'sans-serif'],
        fontSize: 14,
      },
    },
    MuiTab: {
      wrapper: {
        fontFamily: ['Red Hat Display', 'sans-serif'],
        fontSize: 14,
        fontWeight: 'bold',
      }
    },
    MuiDivider: {
      root: {
        backgroundColor: 'rgba(0,0,0,0.54)',
      },
    },
    MuiOutlinedInput: {
      root: {
        '&$focused $notchedOutline': {
          borderColor: '#9B59B6',
          borderWidth: 1,
        },
      },
      notchedOutline: {
        borderColor: '#A9A9A9'
      }
    }
  },
});

export {
  theme,
  primaryColor,
  primaryTextColor,
  secondaryColor,
  secondaryTextColor,
  teamColors,
};
