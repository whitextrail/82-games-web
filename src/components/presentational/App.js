import React, { memo, Fragment } from 'react';
import { CssBaseline } from '@material-ui/core';
import {
  Header,
  Body,
  Footer,
} from './layout';
import { Navigation } from './header';
import Games from '../container/Games';

const App = memo(() => (
  <Fragment>
    <CssBaseline />
    <Header>
      <Navigation />
    </Header>
    <Body>
      <Games />
    </Body>
    <Footer />
  </Fragment>
));

export default App;
