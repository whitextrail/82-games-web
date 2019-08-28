import React, { memo } from 'react';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import {
  Header,
  Body,
  Footer,
} from './layout';
import { Navigation } from './header';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#E24E42',
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
    MuiTypography: {
      colorPrimary: {
        color: '#FFF'
      },
      colorSecondary: {
        color: '#333'
      },
    },
  },
});

const App = memo(() => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header>
        <Navigation />
      </Header>
      <Body />
      <Footer />
    </ThemeProvider>
  </BrowserRouter>
));

export default App;
