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
      },
    },
    MuiIcon: {

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
