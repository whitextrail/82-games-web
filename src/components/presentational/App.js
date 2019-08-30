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
import Games from '../container/Games';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FF3B3F',
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
    MuiButton: {
      root: {
        textTransform: 'none',
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
      <Body>
        <Games />
      </Body>
      <Footer />
    </ThemeProvider>
  </BrowserRouter>
));

export default App;
