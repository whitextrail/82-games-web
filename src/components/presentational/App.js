import React, { memo, Fragment } from 'react';
import { CssBaseline } from '@material-ui/core';
import {
  Header,
  Body,
  Footer,
} from './layout';
import Nav from '../container/Nav';
import Games from '../container/Games';

const App = memo(() => (
  <Fragment>
    <CssBaseline />
    <Header>
      <Nav />
    </Header>
    <Body>
      <Games />
    </Body>
    <Footer />
  </Fragment>
));

export default App;
